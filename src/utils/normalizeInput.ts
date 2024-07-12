import { size } from 'lodash'
import { Normalization } from 'shared/components/utils'

export const max =
	(maximum: number) =>
	(val: string): boolean => {
		return size(val) <= maximum
	}

export const onlyDouble = (val: string): boolean => {
	return val === '' || /^(\d*|(\d)+([.]\d{0,2}))$/g.test(val)
}

export const validateDecimal =
	(digits: number, decimal: number) => (number: string) => {
		const regex = new RegExp(`^\\d{0,${digits}}(\\.\\d{0,${decimal}})?$`)
		return regex.test(number)
	}

export const onlyNumber = (val: string): boolean => {
	return val === '' || /^(\d*)$/g.test(val)
}

export const excludeChar =
	(excludes: string[]) =>
	(val: string): boolean => {
		const regexPattern = new RegExp(`[${excludes.join('')}]`, 'g')
		return !regexPattern.test(val)
	}

export const onlyNormalCharacterAndNumber = (val: string): boolean => {
	return /^[a-zA-Z0-9]+$/g.test(val)
}

export const onlyEnglishCharacterAndNumberAndSpace = (val: string): boolean => {
	return /^[a-zA-Z0-9 ]+$/g.test(val)
}

export const onlyEnglishCharacterAndNumberAndSpaceAndDashAndUnderScoreAndComma =
	(val: string): boolean => {
		return /^[a-zA-Z0-9 \-\_,]+$/g.test(val)
	}

export const acceptCharacterInput = (val: string): boolean => {
	return /^[ก-๙\w *'"#&()/.,+!@$=:;>?-]+$/g.test(val)
}

export const acceptCharacterEmailInput = (val: string) => {
	const re = new RegExp(/^[\w@.-]+$/)
	return re.test(val)
}

export const validateNormalize = (
	normalizes: Normalization[],
	value: string,
) => {
	const isValid = normalizes.every((normalize) => {
		return normalize(value)
	})

	return isValid
}
