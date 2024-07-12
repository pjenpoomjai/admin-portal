import { useContextSelector } from 'use-context-selector'
import { useCallback } from 'react'
import { Context } from './Context'
import {
	IPersistentStoreContext,
	IPersistentStoreContextValue,
} from './interface'

const getPersistentStoreContextValueSelector = (v: IPersistentStoreContext) =>
	v.value

export const useGetPersistentStoreSelector = () =>
	useContextSelector<IPersistentStoreContext, IPersistentStoreContextValue>(
		Context,
		useCallback(getPersistentStoreContextValueSelector, []),
	)

export const useUpsertPersistentStoreSelector = () =>
	useContextSelector<
		IPersistentStoreContext,
		(items: Record<string, string>) => void
	>(
		Context,
		useCallback(
			(v: IPersistentStoreContext) => v.action.upsertCookieByItemsState,
			[],
		),
	)
