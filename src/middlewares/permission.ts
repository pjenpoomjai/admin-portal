import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { IMiddleware } from './interface'
import { escapeRegExp } from 'lodash'

export const EXCLUDE_LIST_CHECK_HEADER = [
	'/login',
	'/pre-login',
	'/logout',
	'/unauthorized',
	'/pre-logout',
]

export const permissionMiddleware: IMiddleware = (
	req: NextRequest,
): NextResponse | undefined => {
	const { pathname } = req.nextUrl
	const sessionCookies = cookies()
	const permissions = sessionCookies.get('permissions')
	if (
		sessionCookies.get('token') &&
		permissions &&
		!EXCLUDE_LIST_CHECK_HEADER.includes(pathname)
	) {
		const permissionObj = JSON.parse(permissions.value)
		const functionPermissions = permissionObj?.functions || []
		const checkPermissionWithConfig = (permissionConfigs: any[]) => {
			return permissionConfigs.some((config: any) => {
				const paths = config?.replace(/ /g, '')?.split(',') || []
				const regexs = paths.map((path) => {
					const subPaths = path
						.split('/')
						.map((subPath) => {
							if (['xxx', '*'].includes(subPath)) {
								return '.+'
							}
							return escapeRegExp(subPath)
						})
						.join('/')
					return new RegExp(`^${subPaths}$`)
				})
				return regexs.some((regex) => {
					return regex.test(pathname)
				})
			})
		}
		const resultOfPermission = checkPermissionWithConfig(functionPermissions)

		if (!resultOfPermission) {
			const url = req.nextUrl.clone()
			url.pathname = '/unauthorized'
			return NextResponse.redirect(url)
		}
	}
}
