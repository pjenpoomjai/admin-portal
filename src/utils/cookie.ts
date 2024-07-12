export interface ICookieData {
	name: string
	value: string
}

export interface ICookieChunkResult {
	isChunk: boolean
	keys: string[]
}

export const cookieSpitting = (
	cookieKey: string,
	cookieStr: string,
	maximumSize: number = 4000,
): Record<string, string> => {
	const cookieByteSize = new Blob([cookieStr]).size
	const cookieObj = {}
	if (cookieByteSize > maximumSize) {
		let chunkSize = 0
		for (let i = 0, c = 0; i < cookieByteSize; i += maximumSize, c++) {
			const index = c + 1
			const offset = i + maximumSize
			cookieObj[`${cookieKey}-${index}`] = cookieStr.slice(i, offset)
			chunkSize++
		}
		return {
			...cookieObj,
			[cookieKey]: `chunk-size=${chunkSize},type=chunk`,
		}
	} else {
		return {
			...cookieObj,
			[cookieKey]: cookieStr,
		}
	}
}

export const parseCookieChunkValue = (key: string, value: string) => {
	const isChunk = /type=chunk/g.test(value)
	if (value && /type=chunk/g.test(value)) {
		const chunkSize = value.split(',').find((data: string) => {
			return data.includes('chunk-size=')
		})
		let size = 0
		let keys = []
		if (chunkSize) {
			size = parseInt(chunkSize.split('=')?.[1])
			keys = new Array(size).fill(0).map((_, i) => {
				const index = i + 1
				return `${key}-${index}`
			})
		}
		return {
			isChunk: isChunk,
			keys: keys,
		}
	}

	return {
		isChunk: isChunk,
		keys: [key],
	}
}

export const findKeyCookieChunk = (
	cookieKey: string,
	cookies: ICookieData[],
) => {
	const cookieDictionary = cookies.reduce(
		(accumulator: Record<string, string>, cookie: ICookieData) => {
			return {
				...accumulator,
				[cookie.name]: cookie.value,
			}
		},
		{},
	)

	const cookieValue = cookieDictionary[cookieKey]

	if (cookieValue) {
		return parseCookieChunkValue(cookieKey, cookieValue)
	}

	return null
}

export const getCookieValueWithKeys = (
	keys: string[],
	cookies: ICookieData[],
) => {
	const cookieDictionary = cookies.reduce(
		(accumulator: Record<string, string>, cookie: ICookieData) => {
			return {
				...accumulator,
				[cookie.name]: cookie.value,
			}
		},
		{},
	)

	return keys.reduce((cookieData: string, key) => {
		return cookieData.concat(cookieDictionary[key] || '')
	}, '')
}
