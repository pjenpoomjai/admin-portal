import { ICommonDialogState } from 'contexts/commonDialog/interface'

export enum CommonDialogType {
	SESSION_EXPIRED = 'session-expired',
	SOMETHING_WENT_WRONG = 'something-went-wrong',
	NO_PERMISSION = 'no-permission',
	CUSTOM_VIEW = 'custom-view',
	WARNING = 'warning',
	CONCURRENT = 'concurrent',
}

export interface IDefaultCommonDialogBuilder
	extends Omit<ICommonDialogState, 'open'> {
	primaryButtonLabel?: string
	primaryButtonOnClick?: () => void
	secondaryButtonLabel?: string
	secondaryButtonOnClick?: () => void
	size?: 'small' | 'medium' | 'large' | 'extraLarge'
}

export type IDefaultCommonDialogBuilderExecutor = Pick<
	IDefaultCommonDialogBuilder,
	| 'primaryButtonOnClick'
	| 'primaryButtonLabel'
	| 'title'
	| 'desc'
	| 'showIcon'
	| 'size'
	| 'onClose'
	| 'classNames'
	| 'PaperProps'
>
