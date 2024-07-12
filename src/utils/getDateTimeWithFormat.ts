/**
 * @param datetime string ex. 2020-2-12
 * @param format date format default dd LLL yyyy(E.g. 12 Feb 2020)
 * for additional token https://moment.github.io/luxon/#/formatting?id=table-of-tokens
 * @returns date time with formar : 12 Feb 2020
 */

import { DateTime } from 'luxon'

export interface IParseDatetime {
	isIso: boolean
	sourceFormat: string
}

const getDateTimeWithFormat = (
	datetime: string,
	format = 'dd LLL yyyy',
	option: IParseDatetime = { isIso: true, sourceFormat: 'yyyy-MM-dd HH:mm:ss' },
) => {
	const { isIso, sourceFormat } = option
	if (isIso) {
		return DateTime.fromISO(datetime).toFormat(format)
	}
	return DateTime.fromFormat(datetime, sourceFormat).toFormat(format)
}

export default getDateTimeWithFormat
