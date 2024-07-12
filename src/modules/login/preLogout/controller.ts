import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const useLogoutAzure = (props) => {
	const { getProviderConsumer } = props
	const { useLogoutSelector, useIsAuthenticatedSelector } =
		getProviderConsumer('msal')
	const logout = useLogoutSelector()
	const { push } = useRouter()
	const isAuthen = useIsAuthenticatedSelector()
	const onLogoutHandler = useCallback(() => {
		if (!isAuthen) {
			push('/logout')
		} else {
			logout({
				postLogoutRedirectUri: `https://${window.location.hostname}/logout`,
			})
		}
	}, [logout, isAuthen, push])

	return {
		onLogoutHandler,
	}
}

const usePreLogout = (props) => {
	const { onLogoutHandler } = useLogoutAzure(props)

	useEffect(() => {
		onLogoutHandler()
	}, [onLogoutHandler])

	return null
}

export default usePreLogout
