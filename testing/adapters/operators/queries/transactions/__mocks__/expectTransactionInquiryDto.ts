import { ModelPagination } from 'adapters/operators/models'
import {
	TransactionTransfer,
	TransactionsInformation,
} from 'adapters/operators/models/transactions'
import { Transaction } from 'adapters/operators/models/transactions/transactions'
import transactionInquiryResponse from './transactionInquiryResponse.json'

export const expectTransactionInquiryDto = new ModelPagination.Pagination(
	[
		new Transaction(
			transactionInquiryResponse.data[0].id,
			transactionInquiryResponse.data[0].id,
			new TransactionsInformation(
				transactionInquiryResponse.data[0].service,
				transactionInquiryResponse.data[0].transactionEndToEndId,
				transactionInquiryResponse.data[0].transactionReference,
				transactionInquiryResponse.data[0].transactionReceiptNumber,
				transactionInquiryResponse.data[0].classification,
				transactionInquiryResponse.data[0].creditAccountNumber,
				transactionInquiryResponse.data[0].billReference1,
			),
			new TransactionTransfer(
				transactionInquiryResponse.data[0].creditPartyBankCode,
				transactionInquiryResponse.data[0].debitPartyBankCode,
				transactionInquiryResponse.data[0].amount,
				transactionInquiryResponse.data[0].currencyCode,
				transactionInquiryResponse.data[0].debitAccountNumber,
			),
			transactionInquiryResponse.data[0].status,
			transactionInquiryResponse.data[0].creationDateTime,
			transactionInquiryResponse.data[0].isWhiteList,
		),
	],
	transactionInquiryResponse.pageNo,
	transactionInquiryResponse.pageLimit,
	transactionInquiryResponse.totalRow,
)

export const expectTransactionInquiryDtoEmpty = new ModelPagination.Pagination(
	[],
	transactionInquiryResponse.pageNo,
	transactionInquiryResponse.pageLimit,
	transactionInquiryResponse.totalRow,
)
