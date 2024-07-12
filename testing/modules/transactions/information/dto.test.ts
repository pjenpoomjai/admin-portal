import { DateTime } from 'luxon'
import { mapTransactionDetail } from 'modules/transactions/information/dto'
import {
	expectTransactionDetailDto,
	expectTransactionDetailDtoOnlyDetail,
	expectTransactionDetailDtoOnlyDetailEmptyAdditional,
} from 'testing/adapters/operators/queries/transactions/__mocks__/expectTransactionDetailDto'
import transactionDetailResponse from 'testing/adapters/operators/queries/transactions/__mocks__/transactionDetailResponse.json'

const transactionDetailData = transactionDetailResponse.data
const additionalDetailData = transactionDetailData.additionalDetail
export const mockInformation = {
	transactionId: transactionDetailData.transactionId,
	transactionReference: transactionDetailData.transactionReference,
	instructionReference: transactionDetailData.instructionReference,
	transactionEndToEndId: transactionDetailData.transactionEndToEndId,
	amount: transactionDetailData.amount.toFixed(2),
	currencyCode: transactionDetailData.currencyCode,
	transactionDate: DateTime.fromISO(transactionDetailData.transactionDate),
	classification: transactionDetailData.classification,
	service: transactionDetailData.service,
	servicerTransactionId: transactionDetailData.servicerTransactionId,
	status: transactionDetailData.status,
	activityDomain: transactionDetailData.activityDomain,
	linkedTransaction: transactionDetailData.linkedTransaction,
	latestSubmission: DateTime.fromISO(transactionDetailData.lastedSubmission),
	bank: transactionDetailData.bank,
	incomingBankingEntity: transactionDetailData.incomingBankEntity,
	outgoingBankingEntity: transactionDetailData.outgoingBankEntity,
	importance: transactionDetailData.importance,
	iso20022Flag: transactionDetailData.iso20022Flag,
}
export const mockDetail = {
	incoming: {
		businessParticipant: transactionDetailData.incoming.businessParticipant,
		instructionId: transactionDetailData.incoming.instructionId,
		scheme: transactionDetailData.incoming.scheme,
		service: transactionDetailData.service,
	},
	outgoing: {
		businessParticipant: transactionDetailData.outgoing.businessParticipant,
		instructionId: transactionDetailData.outgoing.instructionId,
		scheme: transactionDetailData.outgoing.scheme,
		service: transactionDetailData.outgoing.service,
	},
	creditParty: {
		id: transactionDetailData.creditParty.Id,
		id2Type: transactionDetailData.creditParty.id2Type,
		name: transactionDetailData.creditParty.name,
		account: transactionDetailData.creditParty.account,
		addressLine1: transactionDetailData.creditParty.addressLine1,
		addressLine2: transactionDetailData.creditParty.addressLine2,
		addressLine3: transactionDetailData.creditParty.addressLine3,
		city: transactionDetailData.creditParty.city,
		country: transactionDetailData.creditParty.country,
		postalCode: transactionDetailData.creditParty.postalCode,
	},
	creditPartyAgent: {
		id: transactionDetailData.creditPartyAgent.Id,
		idType: transactionDetailData.creditPartyAgent.idType,
		name: transactionDetailData.creditPartyAgent.name,
		account: transactionDetailData.creditPartyAgent.account,
		addressLine1: transactionDetailData.creditPartyAgent.addressLine1,
		addressLine2: transactionDetailData.creditPartyAgent.addressLine2,
		addressLine3: transactionDetailData.creditPartyAgent.addressLine3,
		city: transactionDetailData.creditPartyAgent.city,
		country: transactionDetailData.creditPartyAgent.country,
		postalCode: transactionDetailData.creditPartyAgent.postalCode,
	},
	debitParty: {
		id: transactionDetailData.debitParty.Id,
		id2Type: transactionDetailData.debitParty.id2Type,
		name: transactionDetailData.debitParty.name,
		account: transactionDetailData.debitParty.account,
		addressLine1: transactionDetailData.debitParty.addressLine1,
		addressLine2: transactionDetailData.debitParty.addressLine2,
		addressLine3: transactionDetailData.debitParty.addressLine3,
		city: transactionDetailData.debitParty.city,
		country: transactionDetailData.debitParty.country,
		postalCode: transactionDetailData.debitParty.postalCode,
	},
	debitPartyAgent: {
		id: transactionDetailData.debitPartyAgent.Id,
		idType: transactionDetailData.debitPartyAgent.idType,
		name: transactionDetailData.debitPartyAgent.name,
		account: transactionDetailData.debitPartyAgent.account,
		addressLine1: transactionDetailData.debitPartyAgent.addressLine1,
		addressLine2: transactionDetailData.debitPartyAgent.addressLine2,
		addressLine3: transactionDetailData.debitPartyAgent.addressLine3,
		city: transactionDetailData.debitPartyAgent.city,
		country: transactionDetailData.debitPartyAgent.country,
		postalCode: transactionDetailData.debitPartyAgent.postalCode,
	},
}
export const mockAdditional = {
	information: {
		accountServiceReference: additionalDetailData.accountServiceReference,
		additionalNote: additionalDetailData.additionalNote,
		annotation: additionalDetailData.annotation,
		billReference1: additionalDetailData.billReference1,
		billReference2: additionalDetailData.billReference2,
		billReference3: additionalDetailData.billReference3,
		billerCode: additionalDetailData.billerCode,
		billerName: additionalDetailData.billerName,
		billerProfileId: additionalDetailData.billerProfileId,
		billerSubType: additionalDetailData.billerSubType,
		billerType: additionalDetailData.billerType,
		chargeAmount: additionalDetailData.chargeAmount.toFixed(2),
		creationDateTime: DateTime.fromISO(additionalDetailData.creationDateTime),
		dueDate: DateTime.fromISO(additionalDetailData.dueDate),
		equivalentAmount: additionalDetailData.equivalentAmount.toFixed(2),
		equivalentCurrency: additionalDetailData.equivalentCurrency,
		exchangeRate: additionalDetailData.exchangeRate.toFixed(2),
		expiryDateTime: DateTime.fromISO(additionalDetailData.expiryDateTime),
		ibFee: additionalDetailData.ibFee.toFixed(2),
		irFee: additionalDetailData.irFee.toFixed(2),
		onUs: additionalDetailData.onUs,
		paymentMethod: additionalDetailData.paymentMethod,
		paymentType: additionalDetailData.paymentType,
		postedDateTime: DateTime.fromISO(additionalDetailData.postedDateTime),
		remittanceInfo: additionalDetailData.remittanceInfo,
		senderEmail: additionalDetailData.senderEmail,
		senderId: additionalDetailData.senderId,
		senderMobile: additionalDetailData.senderMobile,
		senderName: additionalDetailData.senderName,
		status: additionalDetailData.status,
		thaiQrTag: additionalDetailData.thaiQrTag,
		transactionReceiptNumber: additionalDetailData.transactionReceiptNumber,
		transactionType: additionalDetailData.transactionType,
	},
	payee: {
		accountStatusCode:
			transactionDetailData.additionalDetail.payee.accountStatusCode,
		accountStatusDescription:
			transactionDetailData.additionalDetail.payee.accountStatusDescription,
		availableBalance:
			transactionDetailData.additionalDetail.payee.availableBalance.toFixed(2),
		emailAddress: transactionDetailData.additionalDetail.payee.emailAddress,
		fcdAmount:
			transactionDetailData.additionalDetail.payee.fcdAmount.toFixed(2),
		fcdCurrency: transactionDetailData.additionalDetail.payee.fcdCurrency,
		fcdEquivalentAmount:
			transactionDetailData.additionalDetail.payee.fcdEquivalentAmount.toFixed(
				2,
			),
		mobileNumber: transactionDetailData.additionalDetail.payee.mobileNumber,
		proxyAccountName:
			transactionDetailData.additionalDetail.payee.proxyAccountName,
		proxyCustomerType:
			transactionDetailData.additionalDetail.payee.proxyCustomerType,
		tepaCode: transactionDetailData.additionalDetail.payee.tepaCode,
	},
	payer: {
		accountStatusCode:
			transactionDetailData.additionalDetail.payer.accountStatusCode,
		accountStatusDescription:
			transactionDetailData.additionalDetail.payer.accountStatusDescription,
		availableBalance:
			transactionDetailData.additionalDetail.payer.availableBalance.toFixed(2),
		emailAddress: transactionDetailData.additionalDetail.payer.emailAddress,
		fcdAmount:
			transactionDetailData.additionalDetail.payer.fcdAmount.toFixed(2),
		fcdCurrency: transactionDetailData.additionalDetail.payer.fcdCurrency,
		fcdEquivalentAmount:
			transactionDetailData.additionalDetail.payer.fcdEquivalentAmount.toFixed(
				2,
			),
		mobileNumber: transactionDetailData.additionalDetail.payer.mobileNumber,
		proxyAccountName:
			transactionDetailData.additionalDetail.payer.proxyAccountName,
		proxyCustomerType:
			transactionDetailData.additionalDetail.payer.proxyCustomerType,
		tepaCode: transactionDetailData.additionalDetail.payer.tepaCode,
	},
}

describe('Transactions information : dto', () => {
	it('Should map transactionDetail correctly', () => {
		const { information, additionalDetails, details } = mapTransactionDetail(
			expectTransactionDetailDto,
		)
		const {
			information: additionalInformation,
			payee,
			payer,
		} = additionalDetails
		expect(information).toEqual(mockInformation)
		expect(details).toEqual(mockDetail)
		expect(additionalInformation).toEqual(mockAdditional.information)
		expect(payee).toEqual(mockAdditional.payee)
		expect(payer).toEqual(mockAdditional.payer)
	})

	it('Should map details and additional fields as null', () => {
		const { information, additionalDetails, details } = mapTransactionDetail(
			expectTransactionDetailDtoOnlyDetailEmptyAdditional,
		)
		const {
			incoming,
			outgoing,
			creditParty,
			debitParty,
			creditPartyAgent,
			debitPartyAgent,
		} = details
		const {
			information: additionalInformation,
			payee,
			payer,
		} = additionalDetails
		expect(information).toBeTruthy()
		expect(incoming).toBeNull()
		expect(outgoing).toBeNull()
		expect(creditParty).toBeNull()
		expect(debitParty).toBeNull()
		expect(creditPartyAgent).toBeNull()
		expect(debitPartyAgent).toBeNull()
		expect(additionalInformation).toBeNull()
		expect(payee).toBeNull()
		expect(payer).toBeNull()
	})

	it('Should map additional as null', () => {
		const { additionalDetails } = mapTransactionDetail(
			expectTransactionDetailDtoOnlyDetail,
		)
		expect(additionalDetails).toBeNull()
	})
})
