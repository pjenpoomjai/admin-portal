import { DateTime } from 'luxon'
import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { IAdapterProvider } from 'x-core-modules/provider/adapter'

export interface IUseResourceHandler {
	requestId: string
	instructionType: string
	adapter: IAdapterProvider<EndpointKey, IHeader>
}

export interface ITransactionInformation {
	transactionId: string
	transactionReference: string
	transactionEndToEndId: string
	instructionReference: string
	amount: string
	currencyCode: string
	transactionDate: DateTime
	classification: string
	service: string
	servicerTransactionId: string
	status: string
	activityDomain: string
	linkedTransaction: string[]
	latestSubmission: DateTime
	bank: string
	incomingBankingEntity: string
	outgoingBankingEntity: string
	importance: string
	iso20022Flag: boolean
}

export interface ITransactionDetailInOut {
	instructionId: string
	businessParticipant: string
	scheme: string
	service: string
}

export interface ITransactionDetailAddress {
	addressLine1: string
	addressLine2: string
	addressLine3: string
	city: string
	country: string
	postalCode: string
}

export interface ITransactionDetailParty extends ITransactionDetailAddress {
	id: string
	id2Type: string
	account: string
	name: string
}

export interface ITransactionDetailPartyAgent
	extends ITransactionDetailAddress {
	id: string
	idType: string
	account: string
	name: string
}

export interface ITransactionDetailDetails {
	incoming: ITransactionDetailInOut
	outgoing: ITransactionDetailInOut
	debitParty: ITransactionDetailParty
	creditParty: ITransactionDetailParty
	debitPartyAgent: ITransactionDetailPartyAgent
	creditPartyAgent: ITransactionDetailPartyAgent
	// intermediaryAgent: ITransactionDetailPartyAgent
}

export interface ITransactionDetailAdditionalDetailsPay {
	proxyCustomerType: string
	proxyAccountName: string
	availableBalance: string
	accountStatusCode: string
	accountStatusDescription: string
	emailAddress: string
	mobileNumber: string
	tepaCode: string
	fcdAmount: string
	fcdCurrency: string
	fcdEquivalentAmount: string
}

export interface ITransactionDetailAdditionalDetailsInformation {
	creationDateTime: DateTime
	onUs: boolean
	paymentMethod: string
	chargeAmount: string
	ibFee: string
	irFee: string
	expiryDateTime: DateTime
	postedDateTime: DateTime
	additionalNote: string
	status: string
	billerType: string
	billerCode: string
	billerName: string
	billerProfileId: string
	billerSubType: string
	dueDate: DateTime
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
	equivalentAmount: string
	equivalentCurrency: string
	exchangeRate: string
}

export interface ITransactionDetailAdditionalDetails {
	information: ITransactionDetailAdditionalDetailsInformation
	payee: ITransactionDetailAdditionalDetailsPay
	payer: ITransactionDetailAdditionalDetailsPay
}

export interface ITransactionDetailHistory {
	historyId: string
	date: DateTime
	event: string
	actor: string
	description: string
	attachment: string
}

export interface ITransaction {
	information: ITransactionInformation
	details: ITransactionDetailDetails
	additionalDetails: ITransactionDetailAdditionalDetails
	histories: ITransactionDetailHistory[]
}
