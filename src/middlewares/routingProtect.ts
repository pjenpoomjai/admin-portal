import { NextRequest, NextResponse } from 'next/server'
import { IMiddleware } from './interface'
import { sanitizeUrl } from 'utils/sanitizeUrl'
import { validURL } from 'utils/validURL'

export const EXCLUDE_LIST_CHECK_HEADER = ['/login', '/pre-login']
export const BYPASS_LIST = ['/logout']
export const ERROR_PATH = ['/unauthorized']

export const redirectReturnUrl = (
	req: NextRequest,
	returnUrl: string,
): NextResponse => {
	if (returnUrl) {
		const url = req.nextUrl.clone()
		if (validURL(returnUrl)) {
			const targetURL = new URL(sanitizeUrl(returnUrl))
			if (targetURL.origin.includes(url.origin)) {
				url.pathname = targetURL.pathname
				url.search = targetURL.search
			} else {
				url.pathname = '/transactions'
				url.search = ''
			}
		} else {
			const targetReturn = new URL(sanitizeUrl(`${url.origin}${returnUrl}`))
			url.pathname = targetReturn.pathname
			url.search = targetReturn.search
		}
		return NextResponse.redirect(url)
	} else {
		const url = req.nextUrl.clone()
		url.pathname = '/transactions'
		url.search = ''
		return NextResponse.redirect(url)
	}
}

export const routingProtectMiddleware: IMiddleware = (
	req: NextRequest,
): NextResponse | undefined => {
	const { pathname, searchParams } = req.nextUrl

	if (BYPASS_LIST.includes(pathname)) {
		return undefined
	} else if (
		!EXCLUDE_LIST_CHECK_HEADER.includes(pathname) &&
		!req.cookies.has('token')
	) {
		const url = req.nextUrl.clone()
		const returnUrl = url.href
		url.pathname = '/login'
		if (!ERROR_PATH.includes(pathname)) {
			url.search = `?returnUrl=${encodeURIComponent(returnUrl)}`
		}
		return NextResponse.redirect(url)
	} else if (
		EXCLUDE_LIST_CHECK_HEADER.includes(pathname) &&
		req.cookies.has('token')
	) {
		const returnUrl = searchParams.get('returnUrl')
		return redirectReturnUrl(req, returnUrl)
	}
}
