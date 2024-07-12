import {
	TransactionAdditionDetails,
	TransactionAdditionDetailsInformation,
	TransactionAdditionDetailsInformationAccount,
	TransactionAdditionDetailsInformationAddition,
	TransactionAdditionDetailsInformationBiller,
	TransactionAdditionDetailsInformationBillerReference,
	TransactionAdditionDetailsInformationContact,
	TransactionAdditionDetailsInformationFinancial,
	TransactionAdditionDetailsInformationPayment,
	TransactionAdditionDetailsInformationSender,
	TransactionAdditionDetailsInformationTransaction,
	TransactionAdditionDetailsPay,
	TransactionDetail,
	TransactionDetailAddress,
	TransactionDetailAgent,
	TransactionDetailDebitCreditParty,
	TransactionDetailDebitCreditPartyAgent,
	TransactionDetailDetail,
	TransactionDetailDetailBankEntities,
	TransactionDetailDetailInformation,
	TransactionDetailDetailInstruction,
	TransactionDetailDetailTransaction,
	TransactionDetailInOut,
	TransactionDetailIncomingOutgoing,
	TransactionDetailParty,
} from 'adapters/operators/models/transactions'
import transactionDetailResponse from './transactionDetailResponse.json'

const transactionDetailResponseData = transactionDetailResponse.data

export const expectTransactionDetailDtoDetail = new TransactionDetailDetail(
	transactionDetailResponseData.transactionId,
	new TransactionDetailDetailInstruction(
		transactionDetailResponseData.instructionIdentification,
		transactionDetailResponseData.instructionReference,
		transactionDetailResponseData.activityDomain,
	),
	new TransactionDetailDetailInformation(
		transactionDetailResponseData.service,
		transactionDetailResponseData.transactionEndToEndId,
		transactionDetailResponseData.transactionReference,
		transactionDetailResponseData.transactionReceiptNumber,
		transactionDetailResponseData.classification,
		transactionDetailResponseData.status,
		transactionDetailResponseData.iso20022Flag,
	),
	new TransactionDetailDetailBankEntities(
		transactionDetailResponseData.bank,
		transactionDetailResponseData.importance,
		transactionDetailResponseData.incomingBankEntity,
		transactionDetailResponseData.outgoingBankEntity,
	),
	new TransactionDetailDetailTransaction(
		transactionDetailResponseData.amount,
		transactionDetailResponseData.currencyCode,
		transactionDetailResponseData.debitAccountNumber,
		transactionDetailResponseData.linkedTransaction,
		transactionDetailResponseData.lastedSubmission,
		transactionDetailResponseData.servicerTransactionId,
		transactionDetailResponseData.transactionDate,
	),
)

export const expectTransactionDetailDtoAdditionalInformation =
	new TransactionAdditionDetailsInformation(
		new TransactionAdditionDetailsInformationTransaction(
			transactionDetailResponseData.additionalDetail.creationDateTime,
			transactionDetailResponseData.additionalDetail.expiryDateTime,
			transactionDetailResponseData.additionalDetail.postedDateTime,
			transactionDetailResponseData.additionalDetail.dueDate,
			transactionDetailResponseData.additionalDetail.transactionReceiptNumber,
			transactionDetailResponseData.additionalDetail.transactionType,
			transactionDetailResponseData.additionalDetail.status,
		),
		new TransactionAdditionDetailsInformationPayment(
			transactionDetailResponseData.additionalDetail.onUs,
			transactionDetailResponseData.additionalDetail.paymentMethod,
			transactionDetailResponseData.additionalDetail.chargeAmount,
			transactionDetailResponseData.additionalDetail.ibFee,
			transactionDetailResponseData.additionalDetail.irFee,
			transactionDetailResponseData.additionalDetail.equivalentAmount,
			transactionDetailResponseData.additionalDetail.equivalentCurrency,
		),
		new TransactionAdditionDetailsInformationBiller(
			transactionDetailResponseData.additionalDetail.billerType,
			transactionDetailResponseData.additionalDetail.billerCode,
			transactionDetailResponseData.additionalDetail.billerName,
			transactionDetailResponseData.additionalDetail.billerProfileId,
			transactionDetailResponseData.additionalDetail.billerSubType,
			new TransactionAdditionDetailsInformationBillerReference(
				transactionDetailResponseData.additionalDetail.billReference1,
				transactionDetailResponseData.additionalDetail.billReference2,
				transactionDetailResponseData.additionalDetail.billReference3,
			),
		),
		new TransactionAdditionDetailsInformationSender(
			transactionDetailResponseData.additionalDetail.senderName,
			transactionDetailResponseData.additionalDetail.senderId,
			transactionDetailResponseData.additionalDetail.senderMobile,
			transactionDetailResponseData.additionalDetail.senderEmail,
			transactionDetailResponseData.additionalDetail.remittanceInfo,
			transactionDetailResponseData.additionalDetail.thaiQrTag,
			transactionDetailResponseData.additionalDetail.annotation,
		),
		new TransactionAdditionDetailsInformationAddition(
			transactionDetailResponseData.additionalDetail.accountServiceReference,
			transactionDetailResponseData.additionalDetail.exchangeRate,
			transactionDetailResponseData.additionalDetail.paymentType,
			transactionDetailResponseData.additionalDetail.additionalNote,
		),
	)

export const expectTransactionDetailInOut = new TransactionDetailInOut(
	new TransactionDetailIncomingOutgoing(
		transactionDetailResponseData.incoming.instructionId,
		transactionDetailResponseData.incoming.businessParticipant,
		transactionDetailResponseData.incoming.scheme,
		transactionDetailResponseData.service,
	),
	new TransactionDetailIncomingOutgoing(
		transactionDetailResponseData.outgoing.instructionId,
		transactionDetailResponseData.outgoing.businessParticipant,
		transactionDetailResponseData.outgoing.scheme,
		transactionDetailResponseData.outgoing.service,
	),
)

const expectTransactionDetailParty = new TransactionDetailParty(
	new TransactionDetailDebitCreditParty(
		transactionDetailResponseData.debitParty.Id,
		transactionDetailResponseData.debitParty.id2Type,
		transactionDetailResponseData.debitParty.account,
		transactionDetailResponseData.debitParty.name,
		new TransactionDetailAddress(
			transactionDetailResponseData.debitParty.addressLine1,
			transactionDetailResponseData.debitParty.addressLine2,
			transactionDetailResponseData.debitParty.addressLine3,
			transactionDetailResponseData.debitParty.city,
			transactionDetailResponseData.debitParty.country,
			transactionDetailResponseData.debitParty.postalCode,
		),
	),
	new TransactionDetailDebitCreditParty(
		transactionDetailResponseData.creditParty.Id,
		transactionDetailResponseData.creditParty.id2Type,
		transactionDetailResponseData.creditParty.account,
		transactionDetailResponseData.creditParty.name,
		new TransactionDetailAddress(
			transactionDetailResponseData.creditParty.addressLine1,
			transactionDetailResponseData.creditParty.addressLine2,
			transactionDetailResponseData.creditParty.addressLine3,
			transactionDetailResponseData.creditParty.city,
			transactionDetailResponseData.creditParty.country,
			transactionDetailResponseData.creditParty.postalCode,
		),
	),
)

export const expectTransactionDetailAgent = new TransactionDetailAgent(
	new TransactionDetailDebitCreditPartyAgent(
		transactionDetailResponseData.debitPartyAgent.Id,
		transactionDetailResponseData.debitPartyAgent.idType,
		transactionDetailResponseData.debitPartyAgent.account,
		transactionDetailResponseData.debitPartyAgent.name,
		new TransactionDetailAddress(
			transactionDetailResponseData.debitPartyAgent.addressLine1,
			transactionDetailResponseData.debitPartyAgent.addressLine2,
			transactionDetailResponseData.debitPartyAgent.addressLine3,
			transactionDetailResponseData.debitPartyAgent.city,
			transactionDetailResponseData.debitPartyAgent.country,
			transactionDetailResponseData.debitPartyAgent.postalCode,
		),
	),
	new TransactionDetailDebitCreditPartyAgent(
		transactionDetailResponseData.creditPartyAgent.Id,
		transactionDetailResponseData.creditPartyAgent.idType,
		transactionDetailResponseData.creditPartyAgent.account,
		transactionDetailResponseData.creditPartyAgent.name,
		new TransactionDetailAddress(
			transactionDetailResponseData.creditPartyAgent.addressLine1,
			transactionDetailResponseData.creditPartyAgent.addressLine2,
			transactionDetailResponseData.creditPartyAgent.addressLine3,
			transactionDetailResponseData.creditPartyAgent.city,
			transactionDetailResponseData.creditPartyAgent.country,
			transactionDetailResponseData.creditPartyAgent.postalCode,
		),
	),
)

export const expectTransactionDetailDtoAdditional =
	new TransactionAdditionDetails(
		expectTransactionDetailDtoAdditionalInformation,
		new TransactionAdditionDetailsPay(
			transactionDetailResponseData.additionalDetail.payee.proxyCustomerType,
			transactionDetailResponseData.additionalDetail.payee.proxyAccountName,
			transactionDetailResponseData.additionalDetail.payee.availableBalance,
			new TransactionAdditionDetailsInformationAccount(
				transactionDetailResponseData.additionalDetail.payee.accountStatusCode,
				transactionDetailResponseData.additionalDetail.payee.accountStatusDescription,
			),
			new TransactionAdditionDetailsInformationContact(
				transactionDetailResponseData.additionalDetail.payee.emailAddress,
				transactionDetailResponseData.additionalDetail.payee.mobileNumber,
			),
			new TransactionAdditionDetailsInformationFinancial(
				transactionDetailResponseData.additionalDetail.payee.tepaCode,
				transactionDetailResponseData.additionalDetail.payee.fcdAmount,
				transactionDetailResponseData.additionalDetail.payee.fcdCurrency,
				transactionDetailResponseData.additionalDetail.payee.fcdEquivalentAmount,
			),
		),
		new TransactionAdditionDetailsPay(
			transactionDetailResponseData.additionalDetail.payer.proxyCustomerType,
			transactionDetailResponseData.additionalDetail.payer.proxyAccountName,
			transactionDetailResponseData.additionalDetail.payer.availableBalance,
			new TransactionAdditionDetailsInformationAccount(
				transactionDetailResponseData.additionalDetail.payer.accountStatusCode,
				transactionDetailResponseData.additionalDetail.payer.accountStatusDescription,
			),
			new TransactionAdditionDetailsInformationContact(
				transactionDetailResponseData.additionalDetail.payer.emailAddress,
				transactionDetailResponseData.additionalDetail.payer.mobileNumber,
			),
			new TransactionAdditionDetailsInformationFinancial(
				transactionDetailResponseData.additionalDetail.payer.tepaCode,
				transactionDetailResponseData.additionalDetail.payer.fcdAmount,
				transactionDetailResponseData.additionalDetail.payer.fcdCurrency,
				transactionDetailResponseData.additionalDetail.payer.fcdEquivalentAmount,
			),
		),
	)

export const expectTransactionDetailDto = new TransactionDetail(
	expectTransactionDetailDtoDetail,
	expectTransactionDetailInOut,
	expectTransactionDetailParty,
	expectTransactionDetailAgent,
	expectTransactionDetailDtoAdditional,
)

export const expectTransactionDetailDtoOnlyDetail = new TransactionDetail(
	expectTransactionDetailDtoDetail,
	new TransactionDetailInOut(undefined, undefined),
	new TransactionDetailParty(undefined, undefined),
	new TransactionDetailAgent(undefined, undefined),
	undefined,
)

export const expectTransactionDetailDtoWithoutPayeePayer =
	new TransactionDetail(
		expectTransactionDetailDtoDetail,
		new TransactionDetailInOut(undefined, undefined),
		new TransactionDetailParty(undefined, undefined),
		new TransactionDetailAgent(undefined, undefined),
		new TransactionAdditionDetails(
			expectTransactionDetailDtoAdditionalInformation,
			undefined,
			undefined,
		),
	)

export const expectTransactionDetailDtoOnlyDetailEmptyAdditional =
	new TransactionDetail(
		expectTransactionDetailDtoDetail,
		new TransactionDetailInOut(undefined, undefined),
		new TransactionDetailParty(undefined, undefined),
		new TransactionDetailAgent(undefined, undefined),
		new TransactionAdditionDetails(undefined, undefined, undefined),
	)
