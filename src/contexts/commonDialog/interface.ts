import { IConfirmDialog } from 'components/common/Dialog/Dialog'

export interface ICommonDialogState extends IConfirmDialog {}

export interface ICommonDialogAction {
	openCommonDialog: (params: Omit<ICommonDialogState, 'open'>) => void
	closeCommonDialog: () => void
}

export type TCommonDialogState = [
	ICommonDialogState | undefined,
	ICommonDialogAction,
]
