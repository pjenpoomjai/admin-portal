import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

export const convertHeader = (
	headers: ReadonlyHeaders,
	filters: string[] = [],
	additionalHeaders: Record<string, string> = {},
) => {
	const originHeaders = Array.from(headers.entries()).reduce(
		(headers: Record<string, string>, [key, value]: [string, string]) => {
			return {
				...headers,
				[key]: value,
			}
		},
		additionalHeaders,
	)
	return Array.from(Object.keys(originHeaders))
		.filter((key) => {
			return filters.length > 0
				? filters.includes(key?.toLocaleLowerCase())
				: true
		})
		.reduce((accummulator, key) => {
			return Object.assign(accummulator, {
				[key]: originHeaders[key],
			})
		}, {})
}
