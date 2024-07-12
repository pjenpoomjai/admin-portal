import {
	TransactionAdditionDetails,
	TransactionAdditionDetailsInformation,
	TransactionAdditionDetailsPay,
	TransactionDetail,
	TransactionDetailAddress,
	TransactionDetailAgent,
	TransactionDetailDebitCreditParty,
	TransactionDetailDebitCreditPartyAgent,
	TransactionDetailDetail,
	TransactionDetailInOut,
	TransactionDetailIncomingOutgoing,
	TransactionDetailParty,
} from 'adapters/operators/models/transactions'
import { DateTime } from 'luxon'
import { convertNumberToDisplay } from 'utils/convertNumberToDisplay'
import {
	ITransaction,
	ITransactionDetailAdditionalDetails,
	ITransactionDetailAdditionalDetailsInformation,
	ITransactionDetailAdditionalDetailsPay,
	ITransactionDetailAddress,
	ITransactionDetailDetails,
	ITransactionDetailInOut,
	ITransactionDetailParty,
	ITransactionDetailPartyAgent,
	ITransactionInformation,
} from './interface'

export const mapTransactionDetail = (
	transactionDetail: TransactionDetail,
): ITransaction => {
	return {
		information: mapTransactionDetailInformation(transactionDetail.detail),
		details: mapTransactionDetailDetails(
			transactionDetail.inOut,
			transactionDetail.party,
			transactionDetail.agent,
		),
		additionalDetails: mapTransactionDetailAdditionalDetails(
			transactionDetail.additionalDetails,
		),
		histories: [],
	}
}

export const mapTransactionDetailInformation = (
	transactionInformation: TransactionDetailDetail,
): ITransactionInformation => {
	const instruction = transactionInformation.instruction
	const information = transactionInformation.information
	const bankEntities = transactionInformation.bankEntities
	const transaction = transactionInformation.transaction
	return {
		transactionId: transactionInformation.transactionId,
		transactionReference: information.transactionReference,
		instructionReference: instruction.instructionReference,
		transactionEndToEndId: information.transactionEndToEndId,
		amount: convertNumberToDisplay(transaction.amount),
		currencyCode: transaction.currencyCode,
		transactionDate: DateTime.fromISO(transaction.transactionDate),
		classification: information.classification,
		service: information.service,
		servicerTransactionId: transaction.servicerTransactionId,
		status: information.status,
		activityDomain: instruction.activityDomain,
		linkedTransaction: transaction.linkedTransaction,
		latestSubmission: DateTime.fromISO(transaction.lastedSubmission),
		bank: bankEntities.bank,
		incomingBankingEntity: bankEntities.incomingBankEntity,
		outgoingBankingEntity: bankEntities.outgoingBankEntity,
		importance: bankEntities.importance,
		iso20022Flag: information.iso20022Flag,
	}
}

export const mapTransactionDetailDetails = (
	inOut: TransactionDetailInOut,
	party: TransactionDetailParty,
	agent: TransactionDetailAgent,
): ITransactionDetailDetails => {
	return {
		incoming: mapTransactionDetailDetailsIncomeOutgo(inOut.incoming),
		outgoing: mapTransactionDetailDetailsIncomeOutgo(inOut.outgoing),
		creditParty: mapTransactionDetailDetailsParty(party.creditParty),
		debitParty: mapTransactionDetailDetailsParty(party.debitParty),
		creditPartyAgent: mapTransactionDetailDetailsPartyAgent(
			agent.creditPartyAgent,
		),
		debitPartyAgent: mapTransactionDetailDetailsPartyAgent(
			agent.debitPartyAgent,
		),
		// intermediaryAgent: mapTransactionDetailDetailsPartyAgent(
		// 	agent.intermediaryAgent,
		// ),
	}
}

export const mapTransactionDetailDetailsIncomeOutgo = (
	inOut: TransactionDetailIncomingOutgoing | null,
): ITransactionDetailInOut => {
	if (inOut) {
		return {
			instructionId: inOut.instructionId,
			businessParticipant: inOut.businessParticipant,
			scheme: inOut.scheme,
			service: inOut.service,
		}
	}
	return null
}

export const mapTransactionDetailAddress = (
	address: TransactionDetailAddress,
): ITransactionDetailAddress => {
	return {
		addressLine1: address.addressLine1,
		addressLine2: address.addressLine2,
		addressLine3: address.addressLine3,
		city: address.city,
		country: address.country,
		postalCode: address.postalCode,
	}
}

export const mapTransactionDetailDetailsParty = (
	party: TransactionDetailDebitCreditParty | null,
): ITransactionDetailParty | null => {
	if (party) {
		return {
			id: party.id,
			id2Type: party.id2Type,
			account: party.account,
			name: party.name,
			...mapTransactionDetailAddress(party.address),
		}
	}
	return null
}

export const mapTransactionDetailDetailsPartyAgent = (
	agent: TransactionDetailDebitCreditPartyAgent | null,
): ITransactionDetailPartyAgent | null => {
	if (agent) {
		return {
			id: agent.id,
			idType: agent.idType,
			account: agent.account,
			name: agent.name,
			...mapTransactionDetailAddress(agent.address),
		}
	}
	return null
}

export const mapTransactionDetailAdditionalDetails = (
	scheme: TransactionAdditionDetails | null,
): ITransactionDetailAdditionalDetails | null => {
	if (scheme) {
		return {
			information: mapTransactionDetailAdditionalDetailsInformation(
				scheme.information,
			),
			payee: mapTransactionDetailAdditionalDetailsPay(scheme.payee),
			payer: mapTransactionDetailAdditionalDetailsPay(scheme.payer),
		}
	}
	return null
}

export const mapTransactionDetailAdditionalDetailsInformation = (
	schema: TransactionAdditionDetailsInformation,
): ITransactionDetailAdditionalDetailsInformation | null => {
	if (schema) {
		return {
			creationDateTime: DateTime.fromISO(schema.transaction.creationDateTime),
			onUs: schema.payment.onUs,
			paymentMethod: schema.payment.paymentMethod,
			chargeAmount: convertNumberToDisplay(schema.payment.chargeAmount),
			ibFee: convertNumberToDisplay(schema.payment.ibFee),
			irFee: convertNumberToDisplay(schema.payment.irFee),
			expiryDateTime: DateTime.fromISO(schema.transaction.expiryDateTime),
			postedDateTime: DateTime.fromISO(schema.transaction.postedDateTime),
			additionalNote: schema.additional.additionalNote,
			status: schema.transaction.status,
			billerType: schema.biller.billerType,
			billerCode: schema.biller.billerCode,
			billerName: schema.biller.billerName,
			billerProfileId: schema.biller.billerProfileId,
			billerSubType: schema.biller.billerSubType,
			dueDate: DateTime.fromISO(schema.transaction.dueDate),
			billReference1: schema.biller.billReference.billReference1,
			billReference2: schema.biller.billReference.billReference2,
			billReference3: schema.biller.billReference.billReference3,
			remittanceInfo: schema.sender.remittanceInfo,
			thaiQrTag: schema.sender.thaiQrTag,
			paymentType: schema.additional.paymentType,
			senderName: schema.sender.senderName,
			senderId: schema.sender.senderId,
			accountServiceReference: schema.additional.accountServiceReference,
			annotation: schema.sender.annotation,
			equivalentAmount: convertNumberToDisplay(schema.payment.equivalentAmount),
			equivalentCurrency: schema.payment.equivalentCurrency,
			exchangeRate: convertNumberToDisplay(schema.additional.exchangeRate),
			senderEmail: schema.sender.senderEmail,
			senderMobile: schema.sender.senderMobile,
			transactionReceiptNumber: schema.transaction.transactionReceiptNumber,
			transactionType: schema.transaction.transactionType,
		}
	}
	return null
}

export const mapTransactionDetailAdditionalDetailsPay = (
	schema: TransactionAdditionDetailsPay | null,
): ITransactionDetailAdditionalDetailsPay | null => {
	if (schema) {
		return {
			proxyCustomerType: schema.proxyCustomerType,
			proxyAccountName: schema.proxyAccountName,
			availableBalance: convertNumberToDisplay(schema.availableBalance),
			accountStatusCode: schema.account.accountStatusCode,
			accountStatusDescription: schema.account.accountStatusDescription,
			emailAddress: schema.contact.emailAddress,
			mobileNumber: schema.contact.mobileNumber,
			tepaCode: schema.financial.tepaCode,
			fcdAmount: convertNumberToDisplay(schema.financial.fcdAmount),
			fcdCurrency: schema.financial.fcdCurrency,
			fcdEquivalentAmount: convertNumberToDisplay(
				schema.financial.fcdEquivalentAmount,
			),
		}
	}
	return null
}
