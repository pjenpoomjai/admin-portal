import { DateTime } from 'luxon'
import {
	DEFAULT_VALUES,
	ErrorMessage,
	FULL_SEARCH_FIELDS,
} from 'modules/transactions/inquiry/constant'
import { validateSchema } from 'modules/transactions/inquiry/validate'

describe('Transaction information : validateSchema', () => {
	it('validates correctly for full search', () => {
		const schema = validateSchema()
		const validDataFullSearch0 = {
			...DEFAULT_VALUES,
			[FULL_SEARCH_FIELDS[0]]: '123',
		}
		const validDataFullSearch1 = {
			...DEFAULT_VALUES,
			[FULL_SEARCH_FIELDS[1]]: '123',
		}
		const validDataFullSearch2 = {
			...DEFAULT_VALUES,
			[FULL_SEARCH_FIELDS[2]]: '123',
		}
		const validDataFullSearch3 = {
			...DEFAULT_VALUES,
			[FULL_SEARCH_FIELDS[3]]: '123',
		}
		expect(schema.isValidSync(validDataFullSearch0)).toBe(true)
		expect(schema.isValidSync(validDataFullSearch1)).toBe(true)
		expect(schema.isValidSync(validDataFullSearch2)).toBe(true)
		expect(schema.isValidSync(validDataFullSearch3)).toBe(true)
	})

	it('validates correctly for not full search (date)', () => {
		const schema = validateSchema()
		const invalidDateTo = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
		}
		const invalidDateFrom = {
			...DEFAULT_VALUES,
			transactionDateTo: DateTime.now(),
		}
		const invalidDate = {
			...DEFAULT_VALUES,
			debitPartyAccount: '123',
		}
		const invalidDateRangeExceeded = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 10 }),
			transactionDateTo: DateTime.now(),
		}
		const invalidDateGatherThan = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now(),
			transactionDateTo: DateTime.now().minus({ day: 1 }),
		}

		try {
			schema.validateSyncAt('transactionDateTo', invalidDateTo)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.DateToRequired)
		}
		try {
			schema.validateSyncAt('transactionDateFrom', invalidDateFrom)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.DateFromRequired)
		}
		try {
			schema.validateSyncAt('transactionDateFrom', invalidDate)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.DateFromRequired)
		}
		try {
			schema.validateSyncAt('transactionDateFrom', invalidDateRangeExceeded)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.DateRangeExceeded)
		}
		try {
			schema.validateSyncAt('transactionDateFrom', invalidDateGatherThan)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.DateGatherThan)
		}
	})

	it('validates correctly for not full search (amount)', () => {
		const schema = validateSchema()
		const validAmount = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
			transactionDateTo: DateTime.now(),
			amountFrom: '100',
			amountTo: '1000',
		}
		const invalidAmount = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
			transactionDateTo: DateTime.now(),
		}
		const invalidAmountTo = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
			transactionDateTo: DateTime.now(),
			amountFrom: '100',
		}
		const invalidAmountFrom = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
			transactionDateTo: DateTime.now(),
			amountFrom: '100',
			amountTo: '10',
		}

		expect(schema.isValidSync(validAmount)).toBe(true)
		try {
			schema.validateSyncAt('amountFrom', invalidAmount)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.NormalRequired)
		}
		try {
			schema.validateSyncAt('amountTo', invalidAmount)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.NormalRequired)
		}
		try {
			schema.validateSyncAt('amountTo', invalidAmountTo)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.AmountGatherThan)
		}
		try {
			schema.validateSyncAt('amountFrom', invalidAmountFrom)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.AmountGatherThan)
		}
	})

	it('validates correctly for not full search (debitPartyAccount)', () => {
		const schema = validateSchema()
		const validDebitPartyAccount = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
			transactionDateTo: DateTime.now(),
			debitPartyAccount: '123',
		}
		const invalidDebitPartyAccount = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
			transactionDateTo: DateTime.now(),
		}

		expect(schema.isValidSync(validDebitPartyAccount)).toBe(true)
		try {
			schema.validateSyncAt('debitPartyAccount', invalidDebitPartyAccount)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.NormalRequired)
		}
	})

	it('validates correctly for not full search (creditPartyAccount)', () => {
		const schema = validateSchema()
		const validCreditPartyAccount = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
			transactionDateTo: DateTime.now(),
			creditPartyAccount: '123',
		}
		const invalidCreditPartyAccount = {
			...DEFAULT_VALUES,
			transactionDateFrom: DateTime.now().minus({ day: 1 }),
			transactionDateTo: DateTime.now(),
		}

		expect(schema.isValidSync(validCreditPartyAccount)).toBe(true)
		try {
			schema.validateSyncAt('creditPartyAccount', invalidCreditPartyAccount)
		} catch (error) {
			expect(error.message).toBe(ErrorMessage.NormalRequired)
		}
	})
})
