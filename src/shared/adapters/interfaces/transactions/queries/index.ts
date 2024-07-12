import {
	ModelTransactions,
	ModelPagination,
	ModelHistories,
} from 'adapters/operators/models'
import Decimal from 'decimal.js'

// transaction
export interface ITransactionsQuery {
	inquiry: (
		payload: ITransactionsInquiryRequest,
	) => Promise<ModelPagination.Pagination<ModelTransactions.Transaction>>
	downloadInquiry: (payload: ITransactionsDownloadRequest) => Promise<any>
	getDetail: (
		payload: ITransactionsDetailInquiryRequest,
	) => Promise<ModelTransactions.TransactionDetail>
	listHistories: (
		payload: ITransactionsHistoryInquiryRequest,
	) => Promise<ModelHistories.History>
}

export enum SortDirection {
	ASC = 'ASC',
	DESC = 'DESC',
}

export interface Pagination {
	pageSize: number
	pageNumber: number
	orderBy?: string
	sortBy?: SortDirection
}

export type ITransactionsDownloadRequest = Omit<
	ITransactionsInquiryRequest,
	'pageSize' | 'pageNumber'
>

export interface ITransactionsInquiryRequest extends Pagination {
	instructionID?: string
	service?: string
	instructionReference?: string
	transactionReference?: number
	transactionEndToEndID?: string
	bankDepartment?: string
	status?: string
	transactionDatetimeFrom?: string
	transactionDatetimeTo?: string
	amountFrom?: Decimal
	amountTo?: Decimal
	transactionType?: string
	channel?: string
	currency?: string
	debitPartyAccount?: string
	creditPartyAccount?: string
	debitPartyBankCode?: string
	creditPartyBankCode?: string
	classification?: boolean
	advanceSearch?: string
	onUsFlag?: boolean
	payerTEPACode?: string
	senderEWalletID?: string
	accountServiceReference?: string
	transactionReceiptNumber?: string
	debitPartyID?: string
	creditPartyID?: string
	billReference1?: string
	billReference2?: string
	billReference3?: string
	paymentMethod?: string
	externalClearingSystem?: string
	outboundInbound?: string
	'20022Flag'?: boolean
	kymLimitCheck?: boolean
}

export interface ITransactionsDetailInquiryRequest {
	requestId: string
	instructionType: string
}

export enum LogType {
	Transfer = 'TRANSFER',
	BillPayment = 'BILL_PAYMENT',
}

export interface ITransactionsHistoryInquiryRequest {
	requestId: string
	logType: LogType
}
