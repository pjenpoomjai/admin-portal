'use client'
import { createContext, useContext } from 'use-context-selector'
import { contextBuilder } from 'x-core-modules/builder'
import { initialState } from './constant'
import { useResourcesController } from './controller'
import { IResourcesState } from './interface'
import {
	useGetResourceModelSelector,
	useUpdateResourceModelSelector,
	useUpdateResourceStateSelector,
} from './selectors'

export const Context = createContext<IResourcesState>(initialState)

export const useUserContext = () => useContext(Context)

const ResourcesContext = contextBuilder({
	Context,
	name: 'resources',
	useController: useResourcesController,
	selector: {
		useUpdateResourceModelSelector,
		useGetResourceModelSelector,
		useUpdateResourceStateSelector,
	},
})

export default ResourcesContext
