import { useCallback, useMemo, useState } from 'react'
import { IResourceModel, IResourcesState, IResourcesValue } from './interface'
import { initialState } from './constant'

export const useResourcesController = () => {
	const [state, setState] = useState<IResourcesValue>(initialState[0])

	const updateResource = useCallback((resources: IResourceModel) => {
		setState((prev) => ({
			...prev,
			resources: resources
		}))
	}, [])

	const updateState = useCallback((state: IResourcesValue) => {
		setState(state)
	}, [])

	const contextApi = useMemo(() => {
		return { updateResource, updateState }
	}, [updateResource, updateState])

	const contextState = useMemo(() => {
		return { resources: state.resources }
	}, [state])

	const contextValue = useMemo(() => {
		return [contextState, contextApi] as IResourcesState
	}, [contextApi, contextState,])

	return contextValue
}
