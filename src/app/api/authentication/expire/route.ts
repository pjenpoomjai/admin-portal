import { cookies } from 'next/headers'
import { PmtStatusCode } from 'adapters/error'
import { findKeyCookieChunk } from 'utils/cookie'

export async function POST() {
	try {
		const cookieData = cookies().getAll()
		const tokenKeys = findKeyCookieChunk('token', cookieData)
		tokenKeys?.keys?.forEach((key) => {
			cookies().delete(key)
		})
		cookies().delete('token')
		cookies().delete('permissions')
		cookies().delete('userInfo')

		return Response.json({
			status: {
				code: PmtStatusCode.PMT_1000,
				description: 'Success',
			},
			data: null,
		})
	} catch (e) {
		return new Response('internal server error.', {
			status: 500,
		})
	}
}
