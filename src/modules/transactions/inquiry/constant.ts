import { IFormData, IOption } from './interface'

export enum EmptyTextTransaction {
	GENERIC = 'No results found.',
	DEFAULT = 'Missing Information: No data found and whitelist check incomplete. Include Credit Party ID/Credit Party Account to proceed.',
	WHITELIST = 'No data found: Biller whitelisted, but search criteria mismatch. Refine search or check BVA.',
	NOT_WHITELIST = 'No data found: The biller you searched for is not currently whitelisted. Please check the authorized whitelist or searching in BVA.',
}

export enum ErrorMessage {
	DateRangeExceeded = 'Date range cannot exceed 7 days. Please select a shorter duration.',
	DateGatherThan = "'Transaction Date/Time From' cannot be later than 'Transaction Date/Time To'. Please select a valid date range.",
	DateRequired = '(Missing Date from or date to) Please enter both start and end dates for your search.',
	AmountGatherThan = "Please provide both amounts for your search. Additionally, 'Amount From' must be less than or equal to 'Amount To'.",
	DateRequiredBoth = 'Please enter both start and end dates for your search.',
	NormalRequired = 'Please specify at least one mandatory field.',
	DateFromRequired = 'Please specify Transaction Date/Time From',
	DateToRequired = 'Please specify Transaction Date/Time To',
}

export const NOT_FULL_SEARCH_FIELDS = [
	'amountFrom',
	'amountTo',
	'debitPartyAccount',
	'creditPartyAccount',
]

export const FULL_SEARCH_FIELDS = [
	'instructionId',
	'instructionReference',
	'transactionEndToEndId',
	'transactionReference',
]

export const BILL_PAYMENT_LIST = [
	'NORMAL_BILL_PAYMENT',
	'CROSS_BANK_BILL_PAYMENT',
	'QR_PAYMENT',
	'B_SCAN_C_20022',
	'C_SCAN_B_20022',
]

export const SERVICE_CONSTANT = {
	id: 'allBillPayment',
	label: 'All Bill Payment',
	value: null,
}

export const DEFAULT_VALUES: IFormData = {
	transactionId: '',
	transactionDateFrom: null,
	transactionDateTo: null,
	instructionId: '',
	amountFrom: '',
	amountTo: '',
	service: SERVICE_CONSTANT as unknown as IOption,
	transactionTypes: null,
	channel: null,
	instructionReference: '',
	currency: null,
	transactionEndToEndId: '',
	debitPartyAccount: '',
	debitPartyAccountCode: '',
	transactionReference: '',
	creditPartyAccount: '',
	creditPartyAccountCode: '',
	bankDepartment: '',
	classification: null,
	onUsFlag: null,
	debitPartyId: '',
	payerTepaCode: '',
	creditPartyId: '',
	senderEWalletId: '',
	billReference1: '',
	paymentMethod: null,
	accountServiceReference: '',
	externalClearingSystem: null,
	transactionReceiptNumber: '',
	kymLimitCheck: null,
	status: null,
	outboundInbound: null,
	'20022Flag': null,
}
