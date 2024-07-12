export interface ITransactionResponse {
	id: string
	service: string
	transactionEndtoEndId: string
	transactionReference: string
	transactionReceiptNumber: string
	classification: string
	creditPartyBankCode: string
	debitPartyBankCode: string
	amount: number
	currencyCode: string
	status: string
	creationDateTime: string
	debitAccountNumber: string
	isWhiteList: boolean
}

export interface ITransactionDataResponse {
	data: ITransactionResponse[]
	pageNo: number
	pageLimit: number
	totalPage: number
	totalRow: number
}

export interface ITransactionDetailPayerPayeeResponse {
	proxyCustomerType: string
	proxyAccountName: string
	availableBalance: number
	accountStatusCode: string
	accountStatusDescription: string
	emailAddress: string
	mobileNumber: string
	tepaCode: string
	fcdAmount: number
	fcdCurrency: string
	fcdEquivalentAmount: number
}

export interface ITransactionHistoryDetailResponse {
	from: string
	to: string
	event: string
	logDatetime: string
	resource?: string
	externalCode?: string
	externalDescription?: any
}

export interface ITransactionHistoryResponse {
	id: string
	referenceId: string
	logType: 'TRANSFER' | 'BILLPAYMENT'
	flow: 'REVIEW' | 'CONFIRM'
	logDetail: ITransactionHistoryDetailResponse[]
}

export interface ITransactionDetailAdditionalDetailResponse {
	creationDateTime: string
	onUs: boolean
	paymentMethod: string
	chargeAmount: number
	ibFee: number
	irFee: number
	expiryDateTime: string
	postedDateTime: string
	additionalNote: string
	status: string
	billerType: string
	billerCode: string
	billerName: string
	billerProfileId: string
	billerSubType: string
	dueDate: string
	billReference1: string
	billReference2: string
	billReference3: string
	remittanceInfo: string
	thaiQrTag: string
	paymentType: string
	senderName: string
	senderId: string
	senderMobile: string
	senderEmail: string
	transactionType: string
	annotation: string
	accountServiceReference: string
	transactionReceiptNumber: string
	equivalentAmount: number
	equivalentCurrency: string
	exchangeRate: number
	payer: ITransactionDetailPayerPayeeResponse
	payee: ITransactionDetailPayerPayeeResponse
}

export interface ITransactionDetailAddressResponse {
	addressLine1: string
	addressLine2: string
	addressLine3: string
	city: string
	country: string
	postalCode: string
}

export interface ITransactionDetailDebitCreditPartyResponse
	extends ITransactionDetailAddressResponse {
	Id: string
	id2Type: string
	account: string
	name: string
}

export interface ITransactionDetailDebitCreditPartyAgentResponse
	extends Omit<ITransactionDetailDebitCreditPartyResponse, 'id2Type'> {
	baseOn20022: string
	idType: string
}

export interface ITransactionDetailIncomingOutgoingResponse {
	instructionId: string
	businessParticipant: string
	scheme: string
}

export interface ITransactionDetailResponse {
	transactionId: string
	instructionIdentification: string
	instructionReference: string
	service: string
	transactionEndToEndId: string
	transactionReference: string
	transactionReceiptNumber: string
	classification: string
	amount: number
	currencyCode: string
	transactionDate: string
	status: string
	activityDomain: string
	linkedTransaction: string[]
	lastedSubmission: string
	servicerTransactionId: string
	bank: string
	incomingBankEntity: string
	outgoingBankEntity: string
	importance: string
	debitAccountNumber: string
	iso20022Flag: boolean
	incoming: ITransactionDetailIncomingOutgoingResponse
	outgoing: ITransactionDetailIncomingOutgoingResponse
	debitParty: ITransactionDetailDebitCreditPartyResponse
	creditParty: ITransactionDetailDebitCreditPartyResponse
	debitPartyAgent: ITransactionDetailDebitCreditPartyAgentResponse
	creditPartyAgent: ITransactionDetailDebitCreditPartyAgentResponse
	// intermediaryAgent: ITransactionDetailDebitCreditPartyAgentResponse
	additionalDetail: ITransactionDetailAdditionalDetailResponse
}
