import {
	Transaction,
	TransactionTransfer,
	TransactionsInformation,
} from 'adapters/operators/models/transactions'
import { DateTime } from 'luxon'
import { mapTransactions } from 'modules/transactions/inquiry/dto'

export const mockTransaction = new Transaction(
	'PA000099',
	'PA000099',
	new TransactionsInformation(
		'B_SCAN_C_20022',
		'5224774683',
		'5833524598',
		'2962576966',
		'ConfirmCustomerCreditTransfer',
		'4680876231',
		'4830999800356108',
	),
	new TransactionTransfer('017', '014', 76.13, 'THB', '227564'),
	'PROCESSED',
	'2023-01-21T18:10:02.000Z',
	false,
)

export const mockTransactionSomeFieldInvalid = new Transaction(
	'PA000099',
	'PA000099',
	new TransactionsInformation(
		'B_SCAN_C_20022_',
		'5224774683',
		'5833524598',
		'2962576966',
		'ConfirmCustomerCreditTransfer',
		'4680',
		'4830999800356108',
	),
	new TransactionTransfer('017', '014', 76.13, 'THB', '227'),
	'PROCESSED',
	null,
	false,
)

export const expectTransactionResult = {
	transactionId: mockTransaction.transactionId,
	service: mockTransaction.information.service,
	transactionEndToEndId: mockTransaction.information.transactionEndToEndId,
	transactionReference: mockTransaction.information.transactionReference,
	transactionReceiptNumber:
		mockTransaction.information.transactionReceiptNumber,
	classification: mockTransaction.information.classification,
	creditPartyBankCode: mockTransaction.transfer.creditPartyBankCode,
	debitPartyBankCode: mockTransaction.transfer.debitPartyBankCode,
	amount: mockTransaction.transfer.amount.toFixed(2),
	currencyCode: mockTransaction.transfer.currencyCode,
	status: mockTransaction.status,
	creationDateTime: DateTime.fromISO(mockTransaction.creationDateTime),
	debitAccountNumber: mockTransaction.transfer.debitAccountNumber,
	isWhiteList: mockTransaction.isWhiteList,
	isBillPayment: true,
	creditAccountNumber: mockTransaction.information.creditAccountNumber,
	billReference1: mockTransaction.information.billReference1,
}

export const expectTransactionSomeFieldResult = {
	transactionId: mockTransactionSomeFieldInvalid.transactionId,
	service: mockTransactionSomeFieldInvalid.information.service,
	transactionEndToEndId:
		mockTransactionSomeFieldInvalid.information.transactionEndToEndId,
	transactionReference:
		mockTransactionSomeFieldInvalid.information.transactionReference,
	transactionReceiptNumber:
		mockTransactionSomeFieldInvalid.information.transactionReceiptNumber,
	classification: mockTransactionSomeFieldInvalid.information.classification,
	creditPartyBankCode:
		mockTransactionSomeFieldInvalid.transfer.creditPartyBankCode,
	debitPartyBankCode:
		mockTransactionSomeFieldInvalid.transfer.debitPartyBankCode,
	amount: mockTransactionSomeFieldInvalid.transfer.amount.toFixed(2),
	currencyCode: mockTransaction.transfer.currencyCode,
	status: mockTransactionSomeFieldInvalid.status,
	creationDateTime: undefined,
	debitAccountNumber:
		mockTransactionSomeFieldInvalid.transfer.debitAccountNumber,
	isWhiteList: mockTransactionSomeFieldInvalid.isWhiteList,
	isBillPayment: false,
	creditAccountNumber:
		mockTransactionSomeFieldInvalid.information.creditAccountNumber,
	billReference1: mockTransactionSomeFieldInvalid.information.billReference1,
}

describe('Transactions inquiry : dto', () => {
	it('Should map transactionInquiryResult correctly', () => {
		const result = mapTransactions([
			mockTransaction,
			mockTransactionSomeFieldInvalid,
		])
		expect(result).toEqual([
			expectTransactionResult,
			expectTransactionSomeFieldResult,
		])
	})
})
