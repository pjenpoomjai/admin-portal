import { Message } from 'adapters/error/error'
import { ModelAuthen } from 'adapters/operators/models'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import {
	EndpointKey,
	IHeader,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { MENU_OPTIONS } from 'shared/components/constants'
import { CommonDialogType, defaultDialogExecutors } from 'src/builders'
import { sanitizeUrl } from 'utils/sanitizeUrl'
import { validURL } from 'utils/validURL'
import {
	ActionContextAdapter,
	IAdapterContextConsumer,
} from 'x-core-modules/context/adapter'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'

const useLoginRequestHandler = (props: IAppContextProps) => {
	const { getContextConsumer, getProviderConsumer } = props
	const searchParams = useSearchParams()
	const { useOpenCommonDialogSelector, useCloseCommonDialogSelector }: any =
		getContextConsumer('commonDialog')
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const openCommonDialog = useOpenCommonDialogSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()
	const adapter = useAdapterQuerySelector()

	const getDefaultPage = useCallback((roleName: string) => {
		const defaultNavigate = '/transactions'
		const menu = MENU_OPTIONS.find((option) => {
			return option.roles.some((role) =>
				roleName?.toLocaleLowerCase().includes(role),
			)
		})
		if (!menu) {
			return defaultNavigate
		}
		if (menu.url) {
			return menu.url
		}
		if (!menu.url && menu.subMenu) {
			return menu.subMenu[0].url
		}
		return defaultNavigate
	}, [])

	const { trigger: triggerAuthen } = adapter.lazyQuery<
		IQueryProvider,
		QueryKey.Authen
	>({
		queryKey: QueryKey.Authen,
		queryFunc: async (query, arg) => {
			const { payload, params } = arg
			return query.authenWithAzure(payload, params)
		},
		option: {
			onSuccess: ({ roleName }: ModelAuthen.Authen) => {
				const defaultPage = getDefaultPage(roleName)
				const returnUrl = searchParams.get('returnUrl') || defaultPage
				if (validURL(returnUrl)) {
					const compareURL = new URL(returnUrl)
					if (compareURL.origin.includes(window.location.origin)) {
						window.location.href = sanitizeUrl(returnUrl)
					} else {
						window.location.href = sanitizeUrl(defaultPage)
					}
				} else {
					window.location.href = sanitizeUrl(returnUrl)
				}
			},
			onError: (error: Message) => {
				openCommonDialog(
					defaultDialogExecutors(
						CommonDialogType.NO_PERMISSION,
						{
							primaryButtonOnClick: () => {
								closeCommonDialog()
							},
						},
						error.rawCode,
					),
				)
			},
		},
	})

	return {
		triggerAuthen,
	}
}

const useLogIn = (props: IAppContextProps) => {
	const searchParams = useSearchParams()
	const returnUrl = searchParams.get('returnUrl')
	const { getProviderConsumer, getContextConsumer } = props
	const { useDispatchAdapterSelector } =
		getContextConsumer<IAdapterContextConsumer<EndpointKey, IHeader>>('adapter')
	const dispatchAdapter = useDispatchAdapterSelector()
	const { triggerAuthen } = useLoginRequestHandler(props)
	const { useHandleRedirectPromiseSelector, useAuthenticationResultSelector } =
		getProviderConsumer<any>('msal')
	const { useUpsertPersistentStoreSelector } =
		getContextConsumer<any>('persistentStore')
	const upsertCookies = useUpsertPersistentStoreSelector()

	const handleRedirectPromise = useHandleRedirectPromiseSelector()

	const loginResponse = useAuthenticationResultSelector()

	useEffect(() => {
		if (!loginResponse?.accessToken) {
			handleRedirectPromise()
		}
	}, [handleRedirectPromise, loginResponse?.accessToken])

	useEffect(() => {
		if (loginResponse?.accessToken) {
			dispatchAdapter({
				type: ActionContextAdapter.UpdateContext,
				payload: {
					token: loginResponse.accessToken,
				},
			})
			upsertCookies({
				token: loginResponse.accessToken,
				expires: loginResponse.expiresOn,
			})
			triggerAuthen({
				payload: {
					token: loginResponse.accessToken,
				},
				params: {
					expires: loginResponse.expiresOn,
				},
			})
		}
	}, [loginResponse, triggerAuthen, dispatchAdapter, upsertCookies])

	const onSubmit = useCallback(async () => {
		if (returnUrl) {
			window.location.href = `/pre-login?returnUrl=${sanitizeUrl(
				encodeURIComponent(returnUrl),
			)}`
		} else {
			window.location.href = '/pre-login'
		}
	}, [returnUrl])

	return {
		onSubmit,
	}
}

export default useLogIn
