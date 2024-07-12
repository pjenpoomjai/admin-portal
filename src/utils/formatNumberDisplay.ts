export const formatNumberFixed = (number: number, fractionDigits: number) => {
	if (number === 0) {
		return '0'
	}
	return number.toFixed(fractionDigits)
}
