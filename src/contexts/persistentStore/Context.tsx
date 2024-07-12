'use client'

import { createContext } from 'use-context-selector'
import { contextBuilder } from 'x-core-modules/builder'
import { usePersistentStoreController } from './controller'
import { CookieKey, IPersistentStoreContextValue } from './interface'
import {
	useGetPersistentStoreSelector,
	useUpsertPersistentStoreSelector,
} from './selector'

export const Context: any = createContext<IPersistentStoreContextValue>({
	cookies: {} as Record<CookieKey, string>,
})

const PersistentStoreContext = <I extends any[] = any>(initialState: I) =>
	contextBuilder({
		Context,
		name: 'persistentStore',
		useController: usePersistentStoreController,
		selector: {
			useGetPersistentStoreSelector,
			useUpsertPersistentStoreSelector,
		},
		initialValues: {
			cookies: initialState,
		},
	})

export default PersistentStoreContext
