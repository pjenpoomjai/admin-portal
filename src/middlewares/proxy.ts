import { NextRequest, NextResponse } from 'next/server'
import { IMiddleware } from './interface'

export const rewriteMiddleware: IMiddleware = (
	req: NextRequest,
): NextResponse | undefined => {
	const { pathname } = req.nextUrl
	if (pathname.indexOf('/pymd') >= 0) {
		const destination = new URL(process.env.PYMD_ENDPOINT)
		const url = req.nextUrl.clone()
		url.host = destination.host
		url.port = destination.port
		url.protocol = destination.protocol
		url.pathname = pathname.replace('/pymd', '')

		return NextResponse.rewrite(url)
	}
}
