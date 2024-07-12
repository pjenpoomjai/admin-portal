import isNumber from 'lodash/isNumber'
import { formatNumberFixed } from './formatNumberDisplay'

export const convertNumberToDisplay = (value: number | null): string => {
	return isNumber(value) ? formatNumberFixed(value, 2) : ''
}
