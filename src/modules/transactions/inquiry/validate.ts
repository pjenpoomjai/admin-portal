import { get, isEmpty } from 'lodash'
import { DateTime } from 'luxon'
import * as yup from 'yup'
import {
	ErrorMessage,
	FULL_SEARCH_FIELDS,
	NOT_FULL_SEARCH_FIELDS,
} from './constant'
import { IFormData } from './interface'

type CompareType = 'date' | 'number' | 'string'

const dateNotExceedDays = (
	formData: IFormData,
	sourceField: string,
	compareField: string,
	days: number,
) => {
	const sourceVal = get(formData, sourceField)
	const compareVal = get(formData, compareField)
	const isSkipValidate = isEmpty(sourceVal) || isEmpty(compareVal)
	return (
		isSkipValidate ||
		(compareVal as DateTime)
			.set({ minute: 0, hour: 0, second: 0, millisecond: 0 })
			.diff(
				(sourceVal as DateTime).set({
					minute: 0,
					hour: 0,
					second: 0,
					millisecond: 0,
				}),
				['years', 'months', 'days'],
			)
			.toMillis() <=
			(days - 1) * 24 * 60 * 60 * 1000
	)
}

const checkMoreThanCondition = (
	formData: IFormData,
	sourceField: string,
	compareField: string,
	type: CompareType,
) => {
	const checkDiff = (sourceVal: unknown, compareVal: unknown): boolean => {
		if (type === 'date') {
			return (sourceVal as DateTime) <= (compareVal as DateTime)
		} else if (type === 'number') {
			return parseFloat(sourceVal as string) <= parseFloat(compareVal as string)
		}
	}

	const sourceVal = get(formData, sourceField)
	const compareVal = get(formData, compareField)
	const isSkipValidate = !sourceVal || !compareVal

	return isSkipValidate || checkDiff(sourceVal, compareVal)
}

const checkAtLeastMandatory = (
	isSkip: boolean,
	isAtLeastMandatory: boolean,
	dateFrom: DateTime,
	dateTo: DateTime,
) => {
	if (isSkip) return true
	if (dateFrom?.isValid || dateTo?.isValid) return isAtLeastMandatory
	return true
}

const dateValidationRequired = (isSkip: boolean, type: 'from' | 'to') =>
	yup
		.mixed()
		.nullable()
		.transform((value: DateTime) => {
			return !isEmpty(value) && value?.isValid ? value.toISODate() : null
		})
		.when(
			['amountFrom', 'amountTo', 'debitPartyAccount', 'creditPartyAccount'],
			{
				is: (
					amountFrom: string,
					amountTo: string,
					debitPartyAccount: string,
					creditPartyAccount: string,
				) => {
					if (isSkip) return false
					return (
						!isEmpty(amountFrom) ||
						!isEmpty(amountTo) ||
						!isEmpty(debitPartyAccount) ||
						!isEmpty(creditPartyAccount)
					)
				},
				then: (val) =>
					val.required(
						type === 'from'
							? ErrorMessage.DateFromRequired
							: ErrorMessage.DateToRequired,
					),
			},
		)

export const validateSchema = () => {
	return yup.lazy((formData: IFormData) => {
		const isAtLeastMandatory = NOT_FULL_SEARCH_FIELDS.some(
			(field) => !isEmpty(get(formData, field)),
		)
		const isFullSearch = FULL_SEARCH_FIELDS.some(
			(field) => !isEmpty(get(formData, field)),
		)

		return yup.object({
			transactionDateFrom: yup.lazy((_) =>
				dateValidationRequired(isFullSearch, 'from')
					.when('transactionDateTo', {
						is: (transactionDateTo) => !isEmpty(transactionDateTo),
						then: (val) => val.required(ErrorMessage.DateFromRequired),
					})
					.test('validate', ErrorMessage.DateGatherThan, () =>
						checkMoreThanCondition(
							formData,
							'transactionDateFrom',
							'transactionDateTo',
							'date',
						),
					)
					.test('validate', ErrorMessage.DateRangeExceeded, () =>
						dateNotExceedDays(
							formData,
							'transactionDateFrom',
							'transactionDateTo',
							7,
						),
					),
			),
			transactionDateTo: yup.lazy((_) =>
				dateValidationRequired(isFullSearch, 'to')
					.when('transactionDateFrom', {
						is: (transactionDateFrom: DateTime) =>
							!isEmpty(transactionDateFrom),
						then: (val) => val.required(ErrorMessage.DateToRequired),
					})
					.test('validate', ErrorMessage.DateGatherThan, () =>
						checkMoreThanCondition(
							formData,
							'transactionDateFrom',
							'transactionDateTo',
							'date',
						),
					)
					.test('validate', ErrorMessage.DateRangeExceeded, () =>
						dateNotExceedDays(
							formData,
							'transactionDateFrom',
							'transactionDateTo',
							7,
						),
					),
			),
			amountFrom: yup.lazy((_) =>
				yup
					.string()
					.when('amountTo', {
						is: (amountTo) => !isEmpty(amountTo),
						then: (val) => val.required(ErrorMessage.AmountGatherThan),
					})
					.test('validate', ErrorMessage.NormalRequired, () => {
						return checkAtLeastMandatory(
							isFullSearch,
							isAtLeastMandatory,
							formData.transactionDateFrom,
							formData.transactionDateTo,
						)
					})
					.test('validate', ErrorMessage.AmountGatherThan, () =>
						checkMoreThanCondition(
							formData,
							'amountFrom',
							'amountTo',
							'number',
						),
					),
			),
			amountTo: yup.lazy((_) =>
				yup
					.string()
					.when('amountFrom', {
						is: (amountFrom) => !isEmpty(amountFrom),
						then: (val) => val.required(ErrorMessage.AmountGatherThan),
					})
					.test('validate', ErrorMessage.NormalRequired, () => {
						return checkAtLeastMandatory(
							isFullSearch,
							isAtLeastMandatory,
							formData.transactionDateFrom,
							formData.transactionDateTo,
						)
					})
					.test('validate', ErrorMessage.AmountGatherThan, () =>
						checkMoreThanCondition(
							formData,
							'amountFrom',
							'amountTo',
							'number',
						),
					),
			),
			debitPartyAccount: yup.lazy((_) =>
				yup.string().test('validate', ErrorMessage.NormalRequired, () => {
					return checkAtLeastMandatory(
						isFullSearch,
						isAtLeastMandatory,
						formData.transactionDateFrom,
						formData.transactionDateTo,
					)
				}),
			),
			creditPartyAccount: yup.lazy((_) =>
				yup.string().test('validate', ErrorMessage.NormalRequired, () => {
					return checkAtLeastMandatory(
						isFullSearch,
						isAtLeastMandatory,
						formData.transactionDateFrom,
						formData.transactionDateTo,
					)
				}),
			),
		})
	})
}
