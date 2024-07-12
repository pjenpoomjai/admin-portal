import { DateTime } from 'luxon'
import { EnumSortBy } from 'types/base'

export interface IFormData {
	transactionId: string
	transactionDateFrom: DateTime | null
	transactionDateTo: DateTime | null
	instructionId: string
	amountFrom: string
	amountTo: string
	service: IOption | null
	transactionTypes: IOption | null
	channel: IOption | null
	instructionReference: string
	currency: IOption | null
	transactionEndToEndId: string
	debitPartyAccount: string
	debitPartyAccountCode: string
	transactionReference: string
	creditPartyAccount: string
	creditPartyAccountCode: string
	bankDepartment: string
	classification: IOption | null
	onUsFlag: IOption<boolean> | null
	debitPartyId: string
	payerTepaCode: string
	creditPartyId: string
	senderEWalletId: string
	billReference1: string
	paymentMethod: IOption | null
	accountServiceReference: string
	externalClearingSystem: IOption | null
	transactionReceiptNumber: string
	kymLimitCheck: IOption<boolean> | null
	status: IOption | null
	outboundInbound: IOption | null
	'20022Flag': IOption | null
}

export interface ISortingPayload {
	key: string
	direction: EnumSortBy
}

export interface IOption<T = string> {
	id?: string
	value: T
	label: string
}

export interface ITransaction {
	transactionId: string
	service: string
	transactionEndToEndId: string
	transactionReference: string
	transactionReceiptNumber: string
	classification: string
	creditPartyBankCode: string
	debitPartyBankCode: string
	amount: string
	currencyCode: string
	status: string
	creationDateTime: DateTime
	debitAccountNumber: string
	isWhiteList?: boolean
	isBillPayment: boolean
	creditAccountNumber: string
	billReference1: string
}

export interface IUseTransactionsDataTable {
	paginationResponse: {
		totalRows: number
		totalPages: number
	}
}
