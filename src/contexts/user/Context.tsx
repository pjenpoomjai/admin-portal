'use client'
import { createContext, useContext } from 'use-context-selector'
import { contextBuilder } from 'x-core-modules/builder'
import { initialState } from './constant'
import { useUserController } from './controller'
import { TUserState } from './interface'
import { useUpdateUserValueSelector, useUserValueSelector } from './selectors'

export const Context = createContext<TUserState>(initialState)

export const useUserContext = () => useContext(Context)

const UserContext = contextBuilder({
	Context,
	name: 'user',
	useController: useUserController,
	selector: {
		useUserValueSelector,
		useUpdateUserValueSelector,
	},
})

export default UserContext
