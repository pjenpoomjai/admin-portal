import { useCallback, useMemo, useState } from 'react'
import {
	IPersistentStoreContextProps,
	IPersistentStoreContext,
} from './interface'
import { defaultTo } from 'lodash'

export const usePersistentStoreController = (
	initialState: IPersistentStoreContextProps,
) => {
	const { cookies } = initialState
	const [cookiesState, setCookiesState] = useState<Record<string, string>>(
		() => {
			return defaultTo(cookies, []).reduce((accumulator, cookieData) => {
				const [_, data] = cookieData
				return Object.assign(accumulator, {
					[data.name]: data.value,
				})
			}, {})
		},
	)

	const updateCookieByKeyState = useCallback(
		(key: string, data: string) => {
			setCookiesState((cookies) => ({
				...cookies,
				[key]: data,
			}))
		},
		[setCookiesState],
	)

	const upsertCookieByItemsState = useCallback(
		(cookieData: Record<string, string>) => {
			setCookiesState((cookies) => ({
				...cookies,
				...cookieData,
			}))
		},
		[setCookiesState],
	)

	const contextApi = useMemo(() => {
		return { updateCookieByKeyState, upsertCookieByItemsState }
	}, [updateCookieByKeyState, upsertCookieByItemsState])

	const contextState = useMemo(() => {
		return { cookies: cookiesState }
	}, [cookiesState])

	const contextValue = useMemo(() => {
		return {
			value: contextState,
			action: contextApi,
		} as IPersistentStoreContext
	}, [contextApi, contextState])

	return contextValue
}
