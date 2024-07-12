import { useCallback, useMemo, useState } from 'react'
import { IUserValue, TUserState } from './interface'
import { initialState } from './constant'

export const useUserController = () => {
	const [state, setState] = useState<IUserValue>(initialState[0])

	const updateValue = useCallback((params: any) => {
		setState((prev) => ({
			...prev,
			...params,
		}))
	}, [])

	const contextApi = useMemo(() => {
		return { updateValue }
	}, [updateValue])

	const contextValue = useMemo(() => {
		return [state, contextApi] as TUserState
	}, [contextApi, state])

	return contextValue
}
