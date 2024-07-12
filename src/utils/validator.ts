import size from 'lodash/size'

export const numberOnly = (fieldVal: string): boolean => {
	return (fieldVal ?? '') === '' || /^\d*$/g.test(fieldVal ?? '')
}

const dateRegExp = /^(\d{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12]\d)T/
const timeRegExp = /(2[0-3]|[01]\d):?([0-5]\d):?([0-5]\d).(\d{3})/
const timezoneRegExp = /([+-]\d{2}):(\d{2})$/

export const isoDateRegExp = new RegExp(
	`${dateRegExp.source}${timeRegExp.source}${timezoneRegExp.source}|^$`,
)

export const max =
	(maximum: number) =>
	(val: string): boolean => {
		return size(val) <= maximum
	}

export const isJSON = (value: string) => {
	let isJSON
	try {
		JSON.parse(value)
		isJSON = true
	} catch (err) {
		isJSON = false
	}

	return isJSON
}
