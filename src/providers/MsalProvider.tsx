import { msalConfig } from 'config/msal'
import { useEffect, useState } from 'react'
import {
	useAccountSelector,
	useIsAuthenticatedSelector,
	useLogoutSelector,
	useRefreshTokenSelector,
	useAuthenticationResultSelector,
	useLoginRedirectSelector,
	useHandleRedirectPromiseSelector,
} from 'react-sso-azure/contexts'
import { MsalProvider as ReactSsoProviderAzure } from 'react-sso-azure/providers'
import { IContextBuilderResult } from 'x-core-modules/builder'
import { getEnv } from './../servers/getEnvironment'

const MsalProvider: IContextBuilderResult = {
	name: 'msal',
	Provider: ({ children }) => {
		const [env, setEnv] = useState<Record<string, string>>(null)
		useEffect(() => {
			getEnv().then((value: any) => {
				setEnv(value)
			})
		}, [])
		if (!env) {
			return null
		}
		return (
			<ReactSsoProviderAzure
				clientId={env?.MSAL_CLIENT_ID}
				authority={msalConfig.auth.authority(env?.MSAL_TENANT_ID)}
				redirectUri={env?.MSAL_REDIRECT_URI}
				options={{
					cache: msalConfig.cache,
				}}
			>
				{children}
			</ReactSsoProviderAzure>
		)
	},
	selector: {
		useLoginRedirectSelector: useLoginRedirectSelector,
		useHandleRedirectPromiseSelector: useHandleRedirectPromiseSelector,
		useRefreshTokenSelector: useRefreshTokenSelector,
		useLogoutSelector: useLogoutSelector,
		useIsAuthenticatedSelector: useIsAuthenticatedSelector,
		useAccountSelector: useAccountSelector,
		useAuthenticationResultSelector: useAuthenticationResultSelector,
	},
}

export default MsalProvider
