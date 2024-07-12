import axios from 'axios'
import { FILTER_HEADER_PROXY } from 'config/constants'
import defaultTo from 'lodash/defaultTo'
import { cookies, headers } from 'next/headers'
import { convertHeader } from 'utils/common/convertNextHeader'
import { TargetType, validateBaseUrl } from 'utils/common/validateBaseUrl'
import { findKeyCookieChunk } from 'utils/cookie'
import { extractXForwardedFor } from 'utils/extractXForwardedFor'

export async function POST() {
	const requestHeaders = headers()
	const { ip: clientIp } = extractXForwardedFor(
		defaultTo(requestHeaders.get('x-forwarded-for'), ''),
	)

	const removeCookie = () => {
		const cookieData = cookies().getAll()
		const tokenKeys = findKeyCookieChunk('token', cookieData)
		tokenKeys?.keys?.forEach((key) => {
			cookies().delete(key)
		})
		cookies().delete('token')
		cookies().delete('permissions')
		cookies().delete('userInfo')
	}
	try {
		const { headers, data, status } = await axios.post(
			'/v1/authentication/logout',
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
			removeCookie()
		}

		return Response.json(data, {
			status,
		})
	} catch (e) {
		removeCookie()
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
