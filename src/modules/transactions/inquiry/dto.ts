import { Transaction } from 'adapters/operators/models/transactions'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import { DateTime } from 'luxon'
import {
	ITransactionsInquiryRequest,
	SortDirection,
} from 'shared/adapters/interfaces/transactions/queries'
import { IFormData, ITransaction, ISortingPayload } from './interface'
import Decimal from 'decimal.js'
import { EnumSortBy } from 'types/base'
import { BILL_PAYMENT_LIST } from './constant'
import { isEmpty } from 'lodash'

export const mapTransactions = (
	transactions: Transaction[],
): ITransaction[] => {
	return transactions.map((transaction) => {
		const isBillPayment =
			BILL_PAYMENT_LIST.includes(transaction.information.service) ||
			isEmpty(transaction.information.service)

		return {
			transactionId: transaction.transactionId,
			service: transaction.information.service,
			transactionEndToEndId: transaction.information.transactionEndToEndId,
			transactionReference: transaction.information.transactionReference,
			transactionReceiptNumber:
				transaction.information.transactionReceiptNumber,
			classification: transaction.information.classification,
			creditPartyBankCode: transaction.transfer.creditPartyBankCode,
			debitPartyBankCode: transaction.transfer.debitPartyBankCode,
			amount: transaction.transfer.amount.toFixed(2),
			currencyCode: transaction.transfer.currencyCode,
			status: transaction.status,
			creationDateTime: transaction.creationDateTime
				? DateTime.fromISO(transaction.creationDateTime)
				: undefined,
			debitAccountNumber: transaction.transfer.debitAccountNumber,
			isWhiteList: transaction.isWhiteList,
			isBillPayment,
			creditAccountNumber: transaction.information.creditAccountNumber,
			billReference1: transaction.information.billReference1,
		}
	})
}

export const transformStateToRequestPayload = (
	form: IFormData,
	page: number,
	limit: number,
	sorting?: ISortingPayload,
): ITransactionsInquiryRequest => {
	const getTextField = (field: string) => {
		const value = get(form, field)
		if (!value) {
			return undefined
		}

		return value
	}

	const getDateTimeField = (field: string) => {
		const value = get(form, field)
		if (!value) {
			return undefined
		}

		return value.toFormat(`yyyy-MM-dd'T'HH:mm:ss'+07:00'`)
	}

	const getDoubleField = (field: string) => {
		const value = get(form, field)
		if (!value) {
			return undefined
		}

		return new Decimal(value)
	}

	const getBooleanField = (field: string) => {
		const value = get(form, field)
		if (isNil(value)) {
			return undefined
		}

		return value
	}

	const buildSortTransactions = (payload?: ISortingPayload) => {
		if (isNil(payload) || payload.key === '') {
			return {}
		}
		const { direction } = payload

		return {
			sortBy:
				direction === EnumSortBy.asc ? SortDirection.ASC : SortDirection.DESC,
		}
	}

	return {
		pageNumber: page,
		pageSize: limit,
		instructionID: getTextField('instructionId'),
		service: getTextField('service.value'),
		instructionReference: getTextField('instructionReference'),
		transactionReference: getTextField('transactionReference'),
		transactionEndToEndID: getTextField('transactionEndToEndId'),
		bankDepartment: getTextField('bankDepartment'),
		status: getTextField('status.value'),
		transactionDatetimeFrom: getDateTimeField('transactionDateFrom'),
		transactionDatetimeTo: getDateTimeField('transactionDateTo'),
		amountFrom: getDoubleField('amountFrom'),
		amountTo: getDoubleField('amountTo'),
		transactionType: getTextField('transactionTypes.value'),
		channel: getTextField('channel.value'),
		currency: getTextField('currency.value'),
		debitPartyAccount: getTextField('debitPartyAccount'),
		creditPartyAccount: getTextField('creditPartyAccount'),
		debitPartyBankCode: getTextField('debitPartyAccountCode'),
		creditPartyBankCode: getTextField('creditPartyAccountCode'),
		classification: getTextField('classification.value'),
		onUsFlag: getBooleanField('onUsFlag.value'),
		payerTEPACode: getTextField('payerTepaCode'),
		senderEWalletID: getTextField('senderEWalletId'),
		accountServiceReference: getTextField('accountServiceReference'),
		transactionReceiptNumber: getTextField('transactionReceiptNumber'),
		debitPartyID: getTextField('debitPartyId'),
		creditPartyID: getTextField('creditPartyId'),
		billReference1: getTextField('billReference1'),
		billReference2: getTextField('billReference2'),
		billReference3: getTextField('billReference3'),
		paymentMethod: getTextField('paymentMethod.value'),
		externalClearingSystem: getTextField('externalClearingSystem.value'),
		kymLimitCheck: getBooleanField('kymLimitCheck.value'),
		outboundInbound: getBooleanField('outboundInbound.value'),
		'20022Flag': getBooleanField('20022Flag.value'),
		...buildSortTransactions(sorting),
	}
}
