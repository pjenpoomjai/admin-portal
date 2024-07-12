import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import {
	EndpointKey,
	IHeader,
	IMutateProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { IAppContextProps } from 'shared/appContext/interfaces'
import BrowserPersistence from 'utils/browserPersistence'
import {
	ActionContextAdapter,
	IAdapterContextConsumer,
} from 'x-core-modules/context/adapter'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'

const store = new BrowserPersistence()

const useLogoutRequestHandler = (props: IAppContextProps) => {
	const { getContextConsumer, getProviderConsumer } = props
	const router = useRouter()
	const { useDispatchAdapterSelector } =
		getContextConsumer<IAdapterContextConsumer<EndpointKey, IHeader>>('adapter')
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const dispatchAdapter = useDispatchAdapterSelector()
	const adapter = useAdapterQuerySelector()
	const onReset = useCallback(() => {
		store.clearAll()
		dispatchAdapter({
			type: ActionContextAdapter.UpdateContext,
			payload: {
				token: undefined,
			},
		})

		router.replace('/login')
	}, [dispatchAdapter, router])
	const { trigger: triggerLogout } = adapter.mutation<
		IMutateProvider,
		QueryKey.Authen
	>({
		queryKey: QueryKey.Authen,
		queryFunc: async (query) => {
			return query.logout()
		},
		option: {
			onSuccess: () => {
				onReset()
			},
			onError: () => {
				onReset()
			},
		},
	})

	return {
		triggerLogout,
	}
}

const useLogout = (props: IAppContextProps) => {
	const { triggerLogout } = useLogoutRequestHandler(props)

	useEffect(() => {
		triggerLogout()
	}, [triggerLogout])

	return null
}

export default useLogout
