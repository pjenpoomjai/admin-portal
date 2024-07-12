import {
	ModelHistories,
	ModelPagination,
	ModelTransactions,
} from 'adapters/operators/models'
import defaultTo from 'lodash/defaultTo'
import get from 'lodash/get'
import { transformDateToISO } from 'utils/common/transformDate'
import {
	ITransactionDataResponse,
	ITransactionDetailAdditionalDetailResponse,
	ITransactionDetailAddressResponse,
	ITransactionDetailDebitCreditPartyAgentResponse,
	ITransactionDetailDebitCreditPartyResponse,
	ITransactionDetailIncomingOutgoingResponse,
	ITransactionDetailPayerPayeeResponse,
	ITransactionDetailResponse,
	ITransactionHistoryResponse,
} from './interfaces'
import { transformToJsonString } from 'utils/transforms'

export const transformResponseTransactionsInquiry = (
	response: ITransactionDataResponse,
): ModelPagination.Pagination<ModelTransactions.Transaction> => {
	const { data: transactions = [] } = response
	const data = defaultTo(transactions, []).map((transaction) => {
		const information = new ModelTransactions.TransactionsInformation(
			get(transaction, 'service'),
			get(transaction, 'transactionEndToEndId'),
			get(transaction, 'transactionReference'),
			get(transaction, 'transactionReceiptNumber'),
			get(transaction, 'classification'),
			get(transaction, 'creditAccountNumber'),
			get(transaction, 'billReference1'),
		)

		const transfer = new ModelTransactions.TransactionTransfer(
			get(transaction, 'creditPartyBankCode'),
			get(transaction, 'debitPartyBankCode'),
			get(transaction, 'amount'),
			get(transaction, 'currencyCode'),
			get(transaction, 'debitAccountNumber'),
		)

		const id = get(transaction, 'id')

		return new ModelTransactions.Transaction(
			id,
			id,
			information,
			transfer,
			get(transaction, 'status'),
			transformDateToISO(get(transaction, 'creationDateTime')),
			get(transaction, 'isWhiteList'),
		)
	})

	return new ModelPagination.Pagination(
		data,
		get(response, 'pageNo'),
		get(response, 'pageLimit'),
		get(response, 'totalRow'),
	)
}

export const transformResponseTransactionDetail = (
	schema: ITransactionDetailResponse,
): ModelTransactions.TransactionDetail => {
	const {
		additionalDetail,
		creditParty,
		creditPartyAgent,
		debitParty,
		debitPartyAgent,
		incoming,
		// intermediaryAgent,
		outgoing,
		...details
	} = schema
	return new ModelTransactions.TransactionDetail(
		transformResponseTransactionDetailDetail(details),
		transformResponseTransactionDetailInOut(
			{ incoming, outgoing },
			get(details, 'service'),
		),
		transformResponseTransactionDetailParty({ creditParty, debitParty }),
		transformResponseTransactionDetailAgent({
			creditPartyAgent,
			debitPartyAgent,
			// intermediaryAgent,
		}),
		transformResponseTransactionAdditionalDetail(additionalDetail),
	)
}

const transformResponseTransactionDetailDetail = (
	schema: Omit<
		ITransactionDetailResponse,
		| 'incoming'
		| 'outgoing'
		| 'debitParty'
		| 'creditParty'
		| 'debitPartyAgent'
		| 'creditPartyAgent'
		// | 'intermediaryAgent'
		| 'additionalDetail'
	>,
): ModelTransactions.TransactionDetailDetail => {
	return new ModelTransactions.TransactionDetailDetail(
		get(schema, 'transactionId', ''),
		new ModelTransactions.TransactionDetailDetailInstruction(
			get(schema, 'instructionIdentification', ''),
			get(schema, 'instructionReference', ''),
			get(schema, 'activityDomain', ''),
		),
		new ModelTransactions.TransactionDetailDetailInformation(
			get(schema, 'service', ''),
			get(schema, 'transactionEndToEndId', ''),
			get(schema, 'transactionReference', ''),
			get(schema, 'transactionReceiptNumber', ''),
			get(schema, 'classification', ''),
			get(schema, 'status', ''),
			get(schema, 'iso20022Flag'),
		),
		new ModelTransactions.TransactionDetailDetailBankEntities(
			get(schema, 'bank', ''),
			get(schema, 'importance', ''),
			get(schema, 'incomingBankEntity', ''),
			get(schema, 'outgoingBankEntity', ''),
		),
		new ModelTransactions.TransactionDetailDetailTransaction(
			get(schema, 'amount'),
			get(schema, 'currencyCode', ''),
			get(schema, 'debitAccountNumber', ''),
			get(schema, 'linkedTransaction', []),
			get(schema, 'lastedSubmission', ''),
			get(schema, 'servicerTransactionId', ''),
			get(schema, 'transactionDate', ''),
		),
	)
}

const transformResponseTransactionDetailInOut = (
	schema: Pick<ITransactionDetailResponse, 'incoming' | 'outgoing'>,
	incomingService: string,
): ModelTransactions.TransactionDetailInOut => {
	return new ModelTransactions.TransactionDetailInOut(
		transformResponseTransactionDetailIncomingOutgoing(
			get(schema, 'incoming'),
			incomingService,
		),
		transformResponseTransactionDetailIncomingOutgoing(get(schema, 'outgoing')),
	)
}

const transformResponseTransactionDetailIncomingOutgoing = (
	schema?: ITransactionDetailIncomingOutgoingResponse,
	incomingService?: string,
): ModelTransactions.TransactionDetailIncomingOutgoing | undefined => {
	if (schema) {
		return new ModelTransactions.TransactionDetailIncomingOutgoing(
			get(schema, 'instructionId', ''),
			get(schema, 'businessParticipant', ''),
			get(schema, 'scheme', ''),
			incomingService || get(schema, 'service', ''),
		)
	}
	return undefined
}

const transformResponseTransactionDetailParty = (
	schema: Pick<ITransactionDetailResponse, 'debitParty' | 'creditParty'>,
): ModelTransactions.TransactionDetailParty => {
	return new ModelTransactions.TransactionDetailParty(
		transformResponseTransactionDetailDebitCreditParty(
			get(schema, 'debitParty'),
		),
		transformResponseTransactionDetailDebitCreditParty(
			get(schema, 'creditParty'),
		),
	)
}

const transformResponseTransactionDetailDebitCreditParty = (
	schema?: ITransactionDetailDebitCreditPartyResponse,
): ModelTransactions.TransactionDetailDebitCreditParty | undefined => {
	if (schema) {
		const { Id, id2Type, account, name, ...address } = schema
		return new ModelTransactions.TransactionDetailDebitCreditParty(
			Id,
			id2Type,
			account,
			name,
			transformResponseTransactionDetailAddress(address),
		)
	}
	return undefined
}

const transformResponseTransactionDetailAddress = (
	schema: ITransactionDetailAddressResponse,
): ModelTransactions.TransactionDetailAddress => {
	return new ModelTransactions.TransactionDetailAddress(
		get(schema, 'addressLine1', ''),
		get(schema, 'addressLine2', ''),
		get(schema, 'addressLine3', ''),
		get(schema, 'city', ''),
		get(schema, 'country', ''),
		get(schema, 'postalCode', ''),
	)
}

const transformResponseTransactionDetailAgent = (
	schema: Pick<
		ITransactionDetailResponse,
		'debitPartyAgent' | 'creditPartyAgent'
	>,
): ModelTransactions.TransactionDetailAgent => {
	return new ModelTransactions.TransactionDetailAgent(
		transformResponseTransactionDetailDebitCreditPartyAgent(
			get(schema, 'debitPartyAgent'),
		),
		transformResponseTransactionDetailDebitCreditPartyAgent(
			get(schema, 'creditPartyAgent'),
		),
		// transformResponseTransactionDetailDebitCreditPartyAgent(
		// 	schema.intermediaryAgent,
		// ),
	)
}

const transformResponseTransactionDetailDebitCreditPartyAgent = (
	schema?: ITransactionDetailDebitCreditPartyAgentResponse,
): ModelTransactions.TransactionDetailDebitCreditPartyAgent | undefined => {
	if (schema) {
		const { Id, idType, account, name, ...address } = schema
		return new ModelTransactions.TransactionDetailDebitCreditPartyAgent(
			Id,
			idType,
			account,
			name,
			transformResponseTransactionDetailAddress(address),
		)
	}
	return undefined
}

const transformResponseTransactionAdditionalDetail = (
	schema?: ITransactionDetailAdditionalDetailResponse,
): ModelTransactions.TransactionAdditionDetails | undefined => {
	if (schema) {
		const { payee, payer, ...information } = schema
		return new ModelTransactions.TransactionAdditionDetails(
			transformResponseTransactionAdditionalDetailInformation(information),
			transformResponseTransactionAdditionDetailsPay(payee),
			transformResponseTransactionAdditionDetailsPay(payer),
		)
	}
	return undefined
}

const transformResponseTransactionAdditionalDetailInformation = (
	schema: Omit<ITransactionDetailAdditionalDetailResponse, 'payer' | 'payee'>,
): ModelTransactions.TransactionAdditionDetailsInformation => {
	return new ModelTransactions.TransactionAdditionDetailsInformation(
		new ModelTransactions.TransactionAdditionDetailsInformationTransaction(
			get(schema, 'creationDateTime', ''),
			get(schema, 'expiryDateTime', ''),
			get(schema, 'postedDateTime', ''),
			get(schema, 'dueDate', ''),
			get(schema, 'transactionReceiptNumber', ''),
			get(schema, 'transactionType', ''),
			get(schema, 'status', ''),
		),
		new ModelTransactions.TransactionAdditionDetailsInformationPayment(
			get(schema, 'onUs'),
			get(schema, 'paymentMethod', ''),
			get(schema, 'chargeAmount'),
			get(schema, 'ibFee'),
			get(schema, 'irFee'),
			get(schema, 'equivalentAmount'),
			get(schema, 'equivalentCurrency', ''),
		),
		new ModelTransactions.TransactionAdditionDetailsInformationBiller(
			get(schema, 'billerType', ''),
			get(schema, 'billerCode', ''),
			get(schema, 'billerName', ''),
			get(schema, 'billerProfileId', ''),
			get(schema, 'billerSubType', ''),
			new ModelTransactions.TransactionAdditionDetailsInformationBillerReference(
				get(schema, 'billReference1', ''),
				get(schema, 'billReference2', ''),
				get(schema, 'billReference3', ''),
			),
		),
		new ModelTransactions.TransactionAdditionDetailsInformationSender(
			get(schema, 'senderName', ''),
			get(schema, 'senderId', ''),
			get(schema, 'senderMobile', ''),
			get(schema, 'senderEmail', ''),
			get(schema, 'remittanceInfo', ''),
			get(schema, 'thaiQrTag', ''),
			get(schema, 'annotation', ''),
		),
		new ModelTransactions.TransactionAdditionDetailsInformationAddition(
			get(schema, 'accountServiceReference'),
			get(schema, 'exchangeRate'),
			get(schema, 'paymentType', ''),
			get(schema, 'additionalNote', ''),
		),
	)
}

const transformResponseTransactionAdditionDetailsPay = (
	schema?: ITransactionDetailPayerPayeeResponse,
): ModelTransactions.TransactionAdditionDetailsPay | undefined => {
	if (schema) {
		return new ModelTransactions.TransactionAdditionDetailsPay(
			get(schema, 'proxyCustomerType', ''),
			get(schema, 'proxyAccountName', ''),
			get(schema, 'availableBalance'),
			new ModelTransactions.TransactionAdditionDetailsInformationAccount(
				get(schema, 'accountStatusCode', ''),
				get(schema, 'accountStatusDescription', ''),
			),
			new ModelTransactions.TransactionAdditionDetailsInformationContact(
				get(schema, 'emailAddress', ''),
				get(schema, 'mobileNumber', ''),
			),
			new ModelTransactions.TransactionAdditionDetailsInformationFinancial(
				get(schema, 'tepaCode', ''),
				get(schema, 'fcdAmount'),
				get(schema, 'fcdCurrency', ''),
				get(schema, 'fcdEquivalentAmount'),
			),
		)
	}
	return undefined
}

export const transformResponseTransactionHistory = (
	payload: ITransactionHistoryResponse,
) => {
	const {
		id = '',
		referenceId = '',
		logType = '',
		flow = '',
		logDetail = [],
	} = payload
	const model = new ModelHistories.History(id, referenceId)
	model.flow = flow
	model.type = logType
	const modelLogs = logDetail.map((log) => {
		const {
			logDatetime,
			from,
			to,
			event,
			resource,
			externalCode,
			externalDescription,
		} = log
		const modelInformation = new ModelHistories.LogInformation.LogInformation(
			from,
			to,
			event,
			resource,
		)
		return new ModelHistories.LogDetail.LogDetail(
			transformDateToISO(logDatetime),
			modelInformation,
			externalCode,
			transformToJsonString(externalDescription),
		)
	})
	model.logDetails = modelLogs
	return model
}
