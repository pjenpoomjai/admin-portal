import { renderHook } from '@testing-library/react'
import { SWRConfig } from 'swr'

type TRenderHookClearSwrCache = typeof renderHook

export const renderHookClearSwrCache: TRenderHookClearSwrCache = (
	render,
	options,
) => {
	return renderHook(render, {
		wrapper: ({ children }) => (
			<SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
		),
		...options,
	})
}
