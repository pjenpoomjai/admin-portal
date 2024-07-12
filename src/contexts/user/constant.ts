import noop from 'lodash/noop'
import { TUserState } from './interface'

export const initialState: TUserState = [
	{ isAuthenticated: false },
	{ updateValue: noop as any },
]
