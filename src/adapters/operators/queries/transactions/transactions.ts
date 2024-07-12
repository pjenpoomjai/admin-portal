import { ApiError, ErrorType, Message, PmtStatusCode } from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { ModelPagination, ModelTransactions } from 'adapters/operators/models'
import { EndpointKey } from 'shared/adapters/interfaces'
import {
	ITransactionsDetailInquiryRequest,
	ITransactionsDownloadRequest,
	ITransactionsInquiryRequest,
	ITransactionsQuery,
	ITransactionsHistoryInquiryRequest,
} from 'shared/adapters/interfaces/transactions/queries'
import { Query } from '../base'
import {
	transformResponseTransactionDetail,
	transformResponseTransactionsInquiry,
	transformResponseTransactionHistory,
} from './dto'

export class TransactionsQuery extends Query implements ITransactionsQuery {
	public async inquiry(
		payload: ITransactionsInquiryRequest,
	): Promise<ModelPagination.Pagination<ModelTransactions.Transaction>> {
		try {
			const response: any = await this._api.post(
				EndpointKey.pymd,
				RoutePath.PymdSearchTransaction,
				'',
				payload,
			)

			return transformResponseTransactionsInquiry(response)
		} catch (e) {
			if (
				e instanceof ApiError &&
				[
					PmtStatusCode.PMT_2009,
					PmtStatusCode.PMT_2014,
					PmtStatusCode.PMT_2015,
				].includes(e.message.message as PmtStatusCode)
			) {
				let emptyState = ErrorType.DATA_NOT_FOUND
				if (e.message.message === PmtStatusCode.PMT_2014)
					emptyState = ErrorType.DATA_NOT_FOUND_NOT_IN_WHITELIST
				else if (e.message.message === PmtStatusCode.PMT_2015)
					emptyState = ErrorType.DATA_NOT_FOUND_IN_WHITELIST
				return ModelPagination.Pagination.empty(emptyState)
			}

			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}

	public async downloadInquiry(
		payload: ITransactionsDownloadRequest,
	): Promise<any> {
		try {
			const response: any = await this._api.post(
				EndpointKey.pymd,
				RoutePath.PymdDownloadTransaction,
				'',
				payload,
			)

			return { name: response.name, file: response.file }
		} catch (e) {
			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}

	public async getDetail(
		payload: ITransactionsDetailInquiryRequest,
	): Promise<ModelTransactions.TransactionDetail> {
		try {
			const response: any = await this._api.post(
				EndpointKey.pymd,
				RoutePath.PymdTransactionDetail,
				'',
				payload,
			)

			return transformResponseTransactionDetail(response.data)
		} catch (e) {
			if (
				e instanceof ApiError &&
				e.message.message === PmtStatusCode.PMT_2009
			) {
				throw new Message('Data Not Found', ErrorType.DATA_NOT_FOUND)
			}

			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}

	public async listHistories(payload: ITransactionsHistoryInquiryRequest) {
		try {
			const response: any = await this._api.post(
				EndpointKey.pymd,
				RoutePath.PymdTransactionHistories,
				'',
				payload,
			)

			return transformResponseTransactionHistory(response.data)
		} catch (e) {
			if (
				e instanceof ApiError &&
				e.message.message === PmtStatusCode.PMT_2009
			) {
				throw new Message('Data Not Found', ErrorType.DATA_NOT_FOUND)
			}
			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}
}
