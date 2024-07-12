import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getEnv } from 'src/servers/getEnvironment'
import { sanitizeUrl } from 'utils/sanitizeUrl'
import { useAppContext } from 'x-core-modules/builder'

const usePreLogin = () => {
	const searchParams = useSearchParams()
	const returnUrl = searchParams.get('returnUrl')
	const [env, setEnv] = useState<Record<string, string>>(null)
	const { getProviderConsumer } = useAppContext()
	const { useLoginRedirectSelector, useAuthenticationResultSelector } =
		getProviderConsumer<any>('msal')

	const login = useLoginRedirectSelector()

	const loginResponse = useAuthenticationResultSelector()

	useEffect(() => {
		getEnv().then((value: any) => {
			setEnv(value)
		})
	}, [])

	useEffect(() => {
		if (!loginResponse?.accessToken && env?.MSAL_REDIRECT_URI) {
			if (returnUrl) {
				const target = sanitizeUrl(encodeURIComponent(returnUrl))
				login({
					redirectUri: env.MSAL_REDIRECT_URI,
					redirectStartPage: `${env.MSAL_REDIRECT_URI}?returnUrl=${target}`,
					prompt: 'login',
				})
			} else {
				login({
					redirectUri: env.MSAL_REDIRECT_URI,
					redirectStartPage: env.MSAL_REDIRECT_URI,
					prompt: 'login',
				})
			}
		}
	}, [env?.MSAL_REDIRECT_URI, login, loginResponse?.accessToken, returnUrl])

	return null
}

export default usePreLogin
