import { useCallback } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Context as UserContext } from './Context'
import { ICommonDialogState, TCommonDialogState } from './interface'

export const useCommonDialogValueSelector = () =>
	useContextSelector<TCommonDialogState, ICommonDialogState>(
		UserContext,
		useCallback((state) => state[0], []),
	)

export const useOpenCommonDialogSelector = () =>
	useContextSelector<
		TCommonDialogState,
		(params: Omit<ICommonDialogState, 'open'>) => void
	>(
		UserContext,
		useCallback((state) => state[1].openCommonDialog, []),
	)

export const useCloseCommonDialogSelector = () =>
	useContextSelector<TCommonDialogState, () => void>(
		UserContext,
		useCallback((state) => state[1].closeCommonDialog, []),
	)
