import {
	CookieKey,
	IPersistentStoreContextValue,
} from 'contexts/persistentStore/interface'
import { get } from 'lodash'
import { useCallback, useMemo } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { CommonDialogType, defaultDialogExecutors } from 'src/builders'

interface IUseSessionExpireHandler {
	closeCommonDialog(): void
	openCommonDialog(props: any): void
}

const useSessionExpireHandler = (props: IUseSessionExpireHandler) => {
	const { closeCommonDialog, openCommonDialog } = props

	const onLogoutHandler = useCallback(() => {
		openCommonDialog(
			defaultDialogExecutors(CommonDialogType.SESSION_EXPIRED, {
				primaryButtonOnClick: () => {
					closeCommonDialog()
					window.location.replace(`/pre-logout`)
				},
			}),
		)
	}, [closeCommonDialog, openCommonDialog])

	return {
		onLogoutHandler,
	}
}

interface IUseIdleTimerControlProps {
	onSessionIdle(): void
	idleTime: number
	token: string | undefined
}

const useIdleTimerControl = (props: IUseIdleTimerControlProps) => {
	const { idleTime, token, onSessionIdle } = props

	const idleTimeTls = useMemo(() => {
		return idleTime * 60 * 1000
	}, [idleTime])

	function onIdle() {
		onSessionIdle()
	}
	const isReadyToStartIdle = useMemo(() => {
		return !token
	}, [token])

	useIdleTimer({
		disabled: isReadyToStartIdle,
		onIdle,
		timeout: idleTimeTls,
		crossTab: true,
	})
}

const useIdleTimerController = (props, componentProps) => {
	const { idleTime } = componentProps
	const { getContextConsumer } = props
	const { useOpenCommonDialogSelector, useCloseCommonDialogSelector } =
		getContextConsumer('commonDialog')
	const { useGetPersistentStoreSelector } =
		getContextConsumer('persistentStore')
	const { cookies }: IPersistentStoreContextValue =
		useGetPersistentStoreSelector()
	const openCommonDialog = useOpenCommonDialogSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()
	const { onLogoutHandler } = useSessionExpireHandler({
		closeCommonDialog,
		openCommonDialog,
	})

	const token = useMemo(() => {
		return get(cookies, CookieKey.Token)
	}, [cookies])

	const handleOpenSessionExpireDialog = useCallback(() => {
		onLogoutHandler()
	}, [onLogoutHandler])

	useIdleTimerControl({
		onSessionIdle: handleOpenSessionExpireDialog,
		idleTime,
		token,
	})

	return {}
}

export default useIdleTimerController
