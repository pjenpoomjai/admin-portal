import { useCallback } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Context as UserContext } from './Context'
import { IUserValue, TUserState } from './interface'

export const useUserValueSelector = () =>
	useContextSelector<TUserState, IUserValue>(
		UserContext,
		useCallback((state) => state[0], []),
	)

export const useUpdateUserValueSelector = () =>
	useContextSelector<TUserState, (params: IUserValue) => void>(
		UserContext,
		useCallback((state) => state[1].updateValue, []),
	)
