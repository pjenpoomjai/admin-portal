import { isNil, trim } from 'lodash'

export const transformTrim = (input: string): string => {
	return trim(input)
}

export const transformToJsonString = (value: any) => {
	if (typeof value == 'object' && !isNil(value)) {
		return JSON.stringify(value)
	}

	return value ? value.toString() : ''
}
