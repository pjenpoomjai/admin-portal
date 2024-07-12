import { get } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppContext } from 'x-core-modules/builder'

const useHeaderNavbar = () => {
	const [displayName, setDisplayName] = useState('')
	const { getProviderConsumer, getContextConsumer } = useAppContext()
	const { useAccountSelector } = getProviderConsumer<any>('msal')
	const { useGetPersistentStoreSelector } =
		getContextConsumer<any>('persistentStore')
	const persistentStore = useGetPersistentStoreSelector()
	const account = useAccountSelector()

	const userInfo: any = useMemo(() => {
		const userInfo = get(persistentStore, 'cookies.userInfo', '')
		try {
			return JSON.parse(userInfo)
		} catch (e) {
			return {}
		}
	}, [persistentStore])

	const lastLogon = useMemo(() => {
		return get(userInfo, 'lastLogon') ?? ''
	}, [userInfo])

	useEffect(() => {
		setDisplayName(account?.name || '')
	}, [account?.name])

	return {
		lastLogon,
		displayName,
	}
}

const useHeaderController = () => {
	const { displayName, lastLogon } = useHeaderNavbar()
	const onLogoutHandler = useCallback(() => {
		window.location.replace(`/pre-logout`)
	}, [])

	return {
		lastLogon,
		onLogoutHandler,
		displayName,
	}
}

export default useHeaderController
