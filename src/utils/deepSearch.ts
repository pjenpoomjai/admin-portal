export const deepSearch = (obj: any, key: any, value: any) => {
	if (
		// eslint-disable-next-line no-prototype-builtins
		obj?.hasOwnProperty(key) &&
		value.startsWith(obj[key])
	)
		return obj
	if (obj) {
		for (const k of Object.keys(obj)) {
			if (typeof obj[k] === 'object') {
				const o: any = deepSearchParent(obj[k], key, value)
				if (o !== null && typeof o !== 'undefined') return o
			}
		}
	}

	return null
}

export const deepSearchParent = (obj: any, key: any, value: any) => {
	if (Array.isArray(obj)) {
		for (const o of obj) {
			const result = deepSearchParent(o, key, value)
			if (result) return o
		}
	} else {
		return deepSearch(obj, key, value)
	}
}
