import { NextRequest, NextResponse } from 'next/server'
import {
	proxyMiddleware,
	IMiddleware,
	routingProtectMiddleware,
	permissionMiddleware,
} from './middlewares'

const middlewareBuilder =
	(middlewares: IMiddleware[]) =>
	(req: NextRequest): null | NextResponse => {
		return middlewares.reduce(
			(acc: null | NextResponse, middleware: IMiddleware) => {
				const validResponse = middleware(req)
				if (validResponse && !acc) {
					return validResponse
				}
				return acc
			},
			null,
		)
	}

const middlewareCompose = middlewareBuilder([
	proxyMiddleware.rewriteMiddleware,
	routingProtectMiddleware.routingProtectMiddleware,
	permissionMiddleware.permissionMiddleware,
])

export default function middleware(req: NextRequest) {
	const response = NextResponse.next()

	const middlewareInterceptor = middlewareCompose(req)
	if (middlewareInterceptor) {
		return middlewareInterceptor
	}

	return response
}

export const config = {
	matcher: [
		'/transactions/:path*',
		'/configuration/:path*',
		'/processing-flow/:path*',
		'/pre-logout',
		'/login',
		'/pre-login',
		'/pymd/:path*',
		'/logout',
		'/unauthorized',
	],
	unstable_allowDynamic: [
		'**/node_modules/lodash/_root.js', // use a glob to allow anything in the function-bind 3rd party module
	],
}
