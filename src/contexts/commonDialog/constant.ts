import noop from 'lodash/noop'
import { TCommonDialogState } from './interface'

export const initialState: TCommonDialogState = [
	{ open: false, id: '' },
	{ openCommonDialog: noop as any, closeCommonDialog: noop as any },
]
