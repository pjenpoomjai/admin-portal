import axios from 'axios'
import { FILTER_HEADER_PROXY } from 'config/constants'
import defaultTo from 'lodash/defaultTo'
import get from 'lodash/get'
import split from 'lodash/split'
import { cookies, headers } from 'next/headers'
import { NextRequest } from 'next/server'
import { convertHeader } from 'utils/common/convertNextHeader'
import { TargetType, validateBaseUrl } from 'utils/common/validateBaseUrl'
import { cookieSpitting } from 'utils/cookie'
import { extractXForwardedFor } from 'utils/extractXForwardedFor'

const transformResponseCookie = (data: Record<string, any>) => {
	const functions = get(data, 'function', []).reduce(
		(accumulator: string[], func: any) => {
			return get(func, 'subFunction', []).reduce(
				(innerAccumulator: string[], subFunc: any) => {
					return innerAccumulator.concat([get(subFunc, 'subFunctionPath')])
				},
				accumulator,
			)
		},
		[],
	)
	return {
		roleName: get(data, 'roleName'),
		functions: functions,
	}
}

export async function POST(request: NextRequest) {
	const requestHeaders = headers()
	const { ip: clientIp } = extractXForwardedFor(
		defaultTo(requestHeaders.get('x-forwarded-for'), ''),
	)
	const body = await request.json()
	const expiredAt = body.expires

	const authorizationHeader = requestHeaders.get('authorization')
	try {
		const { headers, data, status } = await axios.post(
			'/v1/authentication/login',
			{},
			{
				headers: convertHeader(requestHeaders, FILTER_HEADER_PROXY, {
					'x-real-IP': process.env.ADMIN_PORTAL_PRIMARY_SERVICE_HOST,
					'x-forwarded-for': clientIp,
				}),
				baseURL: validateBaseUrl(
					process.env.AUTH_ENDPOINT_PROXY,
					TargetType.AUTH_ENDPOINT_PROXY,
				),
			},
		)

		if (status === 200) {
			headers['Content-Type'] = 'application/json'
			const cookieTokenObject = cookieSpitting(
				'token',
				split(authorizationHeader, ' ')[1],
			)
			Object.entries(cookieTokenObject).forEach(([key, value]) => {
				cookies().set({
					name: key,
					value: value,
					path: '/',
					httpOnly: true,
					secure: true,
					sameSite: 'lax',
					expires: expiredAt ? Date.parse(expiredAt) : undefined,
				})
			})

			cookies().set({
				name: 'permissions',
				value: JSON.stringify(transformResponseCookie(get(data, 'data'))),
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
			})

			cookies().set({
				name: 'userInfo',
				value: JSON.stringify({
					roleName: get(data, 'data.roleName'),
					lastLogon: get(data, 'data.lastLogin'),
				}),
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
			})
		}

		return Response.json(data, {
			status,
		})
	} catch (e) {
		if (e.response?.status) {
			return Response.json(e.response?.data, {
				status: e.response?.status,
			})
		}
		return new Response('internal server error.', {
			status: 500,
		})
	}
}
