'use client'
import noop from 'lodash/noop'
import {
	createContext,
	FC,
	ReactElement,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

interface ILoaderContextProvider {
	children: ReactElement
}

export enum EnumLoaderType {
	fullPageLoader = 'full-page-loader',
}

export interface ILoaderApi {
	openLoader: (type?: EnumLoaderType) => void
	closeLoader: () => void
}

interface ILoaderState {
	loaderQueue: EnumLoaderType[]
}

const initialState: ILoaderState = {
	loaderQueue: [],
}

const initialApi: ILoaderApi = {
	openLoader: noop,
	closeLoader: noop,
}

const LoaderContext = createContext<[ILoaderState, ILoaderApi]>([
	initialState,
	initialApi,
])

const removeFirstOccurrence = (
	queue: EnumLoaderType[],
	value: EnumLoaderType,
) => {
	const index = queue.indexOf(value)
	if (index !== -1) {
		queue.splice(index, 1)
	}
	return queue
}

export const LoaderContextProvider: FC<ILoaderContextProvider> = (props) => {
	const { children } = props
	const [loaderQueue, setLoaderQueue] = useState<EnumLoaderType[]>([])

	const openLoader = useCallback((type = EnumLoaderType.fullPageLoader) => {
		setLoaderQueue((prev) => {
			return [...prev, type]
		})
	}, [])

	const closeLoader = useCallback((type = EnumLoaderType.fullPageLoader) => {
		setLoaderQueue((prev) => {
			return [...removeFirstOccurrence(prev, type)]
		})
	}, [])

	const state = useMemo(() => {
		return { loaderQueue }
	}, [loaderQueue])

	const api = useMemo(() => {
		return { openLoader, closeLoader }
	}, [closeLoader, openLoader])

	const contextValue = useMemo(
		() => [state, api] as [ILoaderState, ILoaderApi],
		[api, state],
	)
	return (
		<LoaderContext.Provider value={contextValue}>
			{children}
		</LoaderContext.Provider>
	)
}

export const useLoaderContext = () => useContext(LoaderContext)
