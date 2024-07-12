import axios from 'axios'
import { FILTER_HEADER_PROXY } from 'config/constants'
import split from 'lodash/split'
import { cookies, headers } from 'next/headers'
import { NextRequest } from 'next/server'
import { convertHeader } from 'utils/common/convertNextHeader'
import { TargetType, validateBaseUrl } from 'utils/common/validateBaseUrl'
import { cookieSpitting } from 'utils/cookie'

export async function POST(request: NextRequest) {
	const requestHeaders = headers()
	const body = await request.json()
	const expiredAt = body.expires
	const authorizationHeader = requestHeaders.get('authorization')
	try {
		const { headers, data, status } = await axios.post(
			'/v1/authentication/refresh',
			{},
			{
				headers: convertHeader(requestHeaders, FILTER_HEADER_PROXY),
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
