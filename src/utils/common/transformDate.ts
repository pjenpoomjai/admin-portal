import { DateTime } from 'luxon'
import { first } from 'lodash'
import { isoDateRegExp } from 'utils/validator'

const DATE_TIME_SECONDS =
	/^(\d{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12]\d) (2[0-3]|[01]\d):?([0-5]\d):?([0-5]\d).(\d{0,3})$/ // Example: 2022-04-12 15:30:45.123
const DATE_TIME =
	/^(\d{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12]\d) (2[0-3]|[01]\d):?([0-5]\d):?([0-5]\d)$/ // Example:  2022-04-12 15:30:45
const DATE = /^(\d{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12]\d)$/ // Example:  2022-04-12
const DATE_TIME_WITH_TIMEZONE =
	/^(\d{4})-?(1[0-2]|0[1-9])-?([0-2]\d|3[01])T(2[0-3]|[01]\d):?([0-5]\d):?([0-5]\d)([+-]\d{2}):(\d{2})$/ // Example: 2023-02-01T00:00:00+07:00
const DATE_TIME_WITH_TIMEZONE_MILLISECONDS =
	/^(\d{4})-?(1[0-2]|0[1-9])-?([0-2]\d|3[01])T(2[0-3]|[01]\d):?([0-5]\d):?([0-5]\d)(\.\d{3})([+-]\d{2}):(\d{2})$/ // Example: 2023-02-01T00:00:00.000+07:00
const DATE_TIME_WITHOUT_TIMEZONE =
	/^(\d{4})-?(1[0-2]|0[1-9])-?([0-2]\d|3[01])T(2[0-3]|[01]\d):?([0-5]\d):?([0-5]\d)(\.\d{3})?Z$/ // Example: 2023-02-01T00:00:00.000Z
const matchDateTimeSecondRange = () => {
	return `yyyy-MM-dd HH:mm:ss.S`
}
const DATE_WITH_ABBR_MONTH =
	/^(0[1-9]|[12]\d|3[01])\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/ //Example: 01 Jan 2022

export const executors = [
	{
		match: DATE_TIME_SECONDS,
		convert: (value: string): string => {
			return DateTime.fromFormat(value, matchDateTimeSecondRange()).toISO()
		},
	},
	{
		match: DATE_TIME,
		convert: (value: string): string => {
			return DateTime.fromFormat(value, 'yyyy-MM-dd HH:mm:ss').toISO()
		},
	},
	{
		match: DATE,
		convert: (value: string): string => {
			return DateTime.fromFormat(value, 'yyyy-MM-dd').toISO()
		},
	},
	{
		match: DATE_TIME_WITH_TIMEZONE,
		convert: (value: string): string => {
			return DateTime.fromISO(value).toISO()
		},
	},
	{
		match: DATE_TIME_WITH_TIMEZONE_MILLISECONDS,
		convert: (value: string): string => {
			return DateTime.fromISO(value).toISO()
		},
	},
	{
		match: DATE_TIME_WITHOUT_TIMEZONE,
		convert: (value: string): string => {
			return DateTime.fromISO(value).toISO()
		},
	},
	{
		match: isoDateRegExp,
		convert: (value: string): string => {
			return value
		},
	},
	{
		match: DATE_WITH_ABBR_MONTH,
		convert: (value: string): string => {
			return DateTime.fromFormat(value, 'dd MMM yyyy').toISO()
		},
	},
]

export const transformDateToISO = (dateTime: string): string => {
	const executorResult: string[] = executors
		.filter(({ match }) => match.test(dateTime))
		.map(({ convert }) => convert(dateTime))
	return first(executorResult) ?? ''
}
