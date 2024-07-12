import { useCallback, useMemo, useState } from 'react'
import { initialState } from './constant'
import { ICommonDialogState, TCommonDialogState } from './interface'

export const useCommonDialogController = () => {
	const [state, setState] = useState<ICommonDialogState | undefined>(
		initialState[0],
	)

	const openCommonDialog = useCallback(
		(params: Omit<ICommonDialogState, 'open'>) => {
			setState({
				...params,
				open: true,
			})
		},
		[],
	)

	const closeCommonDialog = useCallback(() => {
		setState({ open: false, id: '' })
	}, [])

	const contextApi = useMemo(() => {
		return { openCommonDialog, closeCommonDialog }
	}, [closeCommonDialog, openCommonDialog])

	const contextValue = useMemo(() => {
		return [state, contextApi] as TCommonDialogState
	}, [contextApi, state])

	return contextValue
}
