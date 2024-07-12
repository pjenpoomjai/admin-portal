'use client'
import { createContext, useContext } from 'use-context-selector'
import { contextBuilder } from 'x-core-modules/builder'
import { initialState } from './constant'
import { useCommonDialogController } from './controller'
import { TCommonDialogState } from './interface'
import {
	useCloseCommonDialogSelector,
	useCommonDialogValueSelector,
	useOpenCommonDialogSelector,
} from './selectors'

export const Context = createContext<TCommonDialogState>(initialState)

export const useUserContext = () => useContext(Context)

const CommonDialogContext = contextBuilder({
	Context,
	name: 'commonDialog',
	useController: useCommonDialogController,
	selector: {
		useCommonDialogValueSelector,
		useOpenCommonDialogSelector,
		useCloseCommonDialogSelector,
	},
})

export default CommonDialogContext
