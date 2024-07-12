import { DateTime } from 'luxon'

// For mapping zone alternative that not exist in IANA time zone information refer https://nodatime.org/TimeZones
enum NOT_IN_IANA {
	ICT = 'GMT+7',
}
const executors = [
	{
		match: NOT_IN_IANA.ICT,
		format: (dateString: string) => {
			return dateString.replace(NOT_IN_IANA.ICT, 'ICT')
		},
	},
]

export const convertDateWithZone = (
	date: DateTime,
	fmt = 'dd-MM-yyyy HH:mm:ss.SSS ZZZZ',
) => {
	const dateString = date.toFormat(fmt)
	const result = executors
		.find(({ match }) => dateString.includes(match))
		?.format(dateString)
	return result || dateString
}
