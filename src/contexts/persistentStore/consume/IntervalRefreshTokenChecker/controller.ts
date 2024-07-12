import { Message } from 'adapters/error/error'
import {
	CookieKey,
	IPersistentStoreContextValue,
} from 'contexts/persistentStore/interface'
import * as jose from 'jose'
import { get } from 'lodash'
import { useCallback, useEffect, useMemo } from 'react'
import { IMsalContextConsumer } from 'react-sso-azure/contexts'
import {
	EndpointKey,
	IHeader,
	IMutateProvider,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { CommonDialogType, defaultDialogExecutors } from 'src/builders'
import { findKeyCookieChunk, getCookieValueWithKeys } from 'utils/cookie'
import { diffNowWithTimestamp } from 'utils/dateTime'
import { sanitizeUrl } from 'utils/sanitizeUrl'
import {
	ActionContextAdapter,
	IAdapterContextConsumer,
} from 'x-core-modules/context/adapter'
import {
	IAdapterProvider,
	IAdapterProviderConsumer,
} from 'x-core-modules/provider/adapter'

interface IClearSessionProp {
	closeCommonDialog(): void
	adapter: IAdapterProvider<EndpointKey, IHeader>
}

const useClearSessionRequestHandler = (props: IClearSessionProp) => {
	const { adapter, closeCommonDialog } = props
	const returnUrl = sanitizeUrl(
		encodeURIComponent(
			'' + window.location.pathname + '' + window.location.search + '',
		),
	)

	const onSuccessClearSession = useCallback(() => {
		closeCommonDialog()
		window.location.href = `/login?returnUrl=${returnUrl}`
	}, [closeCommonDialog, returnUrl])

	const { trigger: triggerClearSession } = adapter.mutation<
		IMutateProvider,
		QueryKey.Authen
	>({
		queryKey: QueryKey.Authen,
		queryFunc: async (query) => {
			return query.clearSession()
		},
		option: {
			onSuccess: () => onSuccessClearSession(),
		},
	})

	return {
		triggerClearSession,
	}
}

const useRequest = (props: {
	handleOpenSessionExpireDialog: (error?: Message) => void
	adapter: IAdapterProvider<EndpointKey, IHeader>
}) => {
	const { adapter, handleOpenSessionExpireDialog } = props
	const { trigger: triggerRefreshToken } = adapter.lazyQuery<
		IQueryProvider,
		QueryKey.Authen
	>({
		queryKey: QueryKey.Authen,
		queryFunc: async (query, arg) => {
			const { payload, params } = arg
			return query.refreshToken(payload, params)
		},
		option: {
			onError: (error: Message) => {
				handleOpenSessionExpireDialog(error)
			},
		},
	})

	return {
		triggerRefreshToken,
	}
}

export const useConsumeIntervalRefreshTokenCheckerController = (
	props: IAppContextProps,
) => {
	const { getProviderConsumer, getContextConsumer } = props
	const { useRefreshTokenSelector } =
		getProviderConsumer<IMsalContextConsumer>('msal')
	const { useOpenCommonDialogSelector, useCloseCommonDialogSelector } =
		getContextConsumer<any>('commonDialog')
	const { useGetPersistentStoreSelector, useUpsertPersistentStoreSelector } =
		getContextConsumer<any>('persistentStore')
	const { cookies }: IPersistentStoreContextValue =
		useGetPersistentStoreSelector()
	const { useDispatchAdapterSelector } =
		getContextConsumer<IAdapterContextConsumer<EndpointKey, IHeader>>('adapter')
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const refreshToken = useRefreshTokenSelector()
	const upsertCookies = useUpsertPersistentStoreSelector()
	const openCommonDialog = useOpenCommonDialogSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()
	const dispatchAdapter = useDispatchAdapterSelector()
	const adapter = useAdapterQuerySelector()
	const { triggerClearSession } = useClearSessionRequestHandler({
		closeCommonDialog,
		adapter,
	})
	const handleOpenSessionExpireDialog = useCallback(
		(error?: Message) => {
			openCommonDialog(
				defaultDialogExecutors(
					CommonDialogType.SESSION_EXPIRED,
					{
						primaryButtonOnClick: () => {
							triggerClearSession()
						},
					},
					error?.rawCode,
				),
			)
		},
		[openCommonDialog, triggerClearSession],
	)
	const { triggerRefreshToken } = useRequest({
		adapter,
		handleOpenSessionExpireDialog,
	})

	const cookieData = useMemo(() => {
		return Object.entries(cookies || {}).map(([key, value]) => {
			return {
				name: key,
				value: value,
			}
		})
	}, [cookies])

	useEffect(() => {
		let intervalCheck
		const keys = findKeyCookieChunk(CookieKey.Token, cookieData)?.keys || []
		const token = getCookieValueWithKeys(keys, cookieData)

		if (token) {
			let payloadJWT
			try {
				payloadJWT = jose.decodeJwt(token)
			} catch (e) {
				payloadJWT = ''
			}
			const expireTime = get(payloadJWT, 'exp')
			const nextTriggerTimer = diffNowWithTimestamp(expireTime) + 1
			dispatchAdapter({
				type: ActionContextAdapter.UpdateContext,
				payload: {
					token: token,
				},
			})

			intervalCheck = setTimeout(() => {
				refreshToken()
					.then((response) => {
						upsertCookies({
							token: response.accessToken,
							expires: response.expiresOn,
						})
						dispatchAdapter({
							type: ActionContextAdapter.UpdateContext,
							payload: {
								token: response.accessToken,
							},
						})
						triggerRefreshToken({
							payload: {
								token: response.accessToken,
							},
							params: {
								expires: response.expiresOn,
							},
						})
					})
					.catch(() => {
						handleOpenSessionExpireDialog()
					})
			}, nextTriggerTimer * 1000)
		}

		return () => {
			if (token) {
				clearTimeout(intervalCheck)
			}
		}
	}, [
		cookieData,
		refreshToken,
		upsertCookies,
		dispatchAdapter,
		triggerRefreshToken,
		handleOpenSessionExpireDialog,
	])
	return {}
}
