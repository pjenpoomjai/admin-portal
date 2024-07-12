'use client'
import { mutateProvider, queryProvider } from 'adapters/operators/provider'
import { linkConfig } from 'config/endpoints'
import { exceptionResponse } from 'config/exceptionResponse'
import { parseResponseBody } from 'config/parseResponse'
import {
	CommonDialogContext,
	PersistentContext,
	ResourcesContext,
	UserContext,
} from 'contexts'
import ConsumeIntervalRefreshTokenCheckerContainer from 'contexts/persistentStore/consume/IntervalRefreshTokenChecker'
import {
	CommonDialogProvider,
	LoaderProvider,
	MsalProvider,
	ThemeProvider,
} from 'providers'
import { FC, useMemo } from 'react'
import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { AppConfiguration } from 'x-core-modules/module'
import { IAppConfig } from './interface'
import { findKeyCookieChunk, getCookieValueWithKeys } from 'utils/cookie'
import { CookieKey } from 'contexts/persistentStore/interface'

const AppConfig: FC<IAppConfig> = ({ children, cookies }) => {
	const PersistentContextCache = useMemo(() => {
		return PersistentContext(cookies)
	}, [cookies])

	const token: string = useMemo(() => {
		const cookiesParser = cookies.map(([_, data]) => {
			return data
		})
		const tokenKeys =
			findKeyCookieChunk(CookieKey.Token, cookiesParser)?.keys || []

		return getCookieValueWithKeys(tokenKeys, cookiesParser) || ''
	}, [cookies])

	return (
		<AppConfiguration<EndpointKey, IHeader>
			contexts={[
				UserContext,
				PersistentContextCache,
				ResourcesContext,
				CommonDialogContext,
			]}
			providers={[
				ThemeProvider,
				MsalProvider,
				LoaderProvider,
				CommonDialogProvider,
			]}
			adapter={{
				common: {
					exceptionCallback: exceptionResponse,
					responseCallback: parseResponseBody,
					context: {
						token: token,
					},
					endpoints: linkConfig,
					mutateFactory: mutateProvider,
					queryFactory: queryProvider,
				},
			}}
		>
			<ConsumeIntervalRefreshTokenCheckerContainer />
			{children}
		</AppConfiguration>
	)
}

export default AppConfig
