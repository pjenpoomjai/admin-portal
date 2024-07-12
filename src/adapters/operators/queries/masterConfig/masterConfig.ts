import { ApiError, ErrorType, Message, PmtStatusCode } from 'adapters/error'
import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import {
	IGetMasterConfigChannelRequest,
	IGetMasterConfigInstructionTypeRequest,
	IGetMasterConfigServiceRequest,
	IGetMasterConfigTimeoutTypeRequest,
	IMasterConfigQuery,
} from 'shared/adapters/interfaces/masterConfig/queries'
import { Query } from '../base'
import {
	transformResponseMasterConfigChannelInquiry,
	transformResponseMasterConfigInstructionTypeInquiry,
	transformResponseMasterConfigServiceInquiry,
	transformResponseMasterConfigTimeoutTypeInquiry,
} from './dto'
import channelResponse from './mock/channelResponse.json'
import instructionTypeResponse from './mock/instructionTypeResponse.json'
import serviceResponse from './mock/serviceResponse.json'
import timeoutTypeResponse from './mock/timeoutTypeResponse.json'

export class MasterConfigQuery extends Query implements IMasterConfigQuery {
	public async getMasterConfigChannel(
		_payload: IGetMasterConfigChannelRequest,
	): Promise<
		ModelPagination.Pagination<ModelMasterConfig.MasterConfigChannel>
	> {
		try {
			// const response: any = await this._api.post(
			// 	EndpointKey.pymd,
			// 	RoutePath.PymdMasterConfigChannel,
			// 	'',
			// 	payload,
			// )
			const response = channelResponse

			return transformResponseMasterConfigChannelInquiry(response)
		} catch (e) {
			if (
				e instanceof ApiError &&
				PmtStatusCode.PMT_2009 === e.message.message
			) {
				return ModelPagination.Pagination.empty(ErrorType.DATA_NOT_FOUND)
			}

			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}

	public async getMasterConfigService(
		_payload: IGetMasterConfigServiceRequest,
	): Promise<
		ModelPagination.Pagination<ModelMasterConfig.MasterConfigService>
	> {
		try {
			// const response: any = await this._api.post(
			// 	EndpointKey.pymd,
			// 	RoutePath.PymdMasterConfigService,
			// 	'',
			// 	payload,
			// )
			const response = serviceResponse

			return transformResponseMasterConfigServiceInquiry(response)
		} catch (e) {
			if (
				e instanceof ApiError &&
				PmtStatusCode.PMT_2009 === e.message.message
			) {
				return ModelPagination.Pagination.empty(ErrorType.DATA_NOT_FOUND)
			}

			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}

	public async getMasterConfigInstructionType(
		_payload: IGetMasterConfigInstructionTypeRequest,
	): Promise<
		ModelPagination.Pagination<ModelMasterConfig.MasterConfigInstructionType>
	> {
		try {
			// const response: any = await this._api.post(
			// 	EndpointKey.pymd,
			// 	RoutePath.PymdMasterConfigInstructionType,
			// 	'',
			// 	payload,
			// )
			const response = instructionTypeResponse

			return transformResponseMasterConfigInstructionTypeInquiry(response)
		} catch (e) {
			if (
				e instanceof ApiError &&
				PmtStatusCode.PMT_2009 === e.message.message
			) {
				return ModelPagination.Pagination.empty(ErrorType.DATA_NOT_FOUND)
			}

			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}

	public async getMasterConfigTimeoutType(
		_payload: IGetMasterConfigTimeoutTypeRequest,
	): Promise<
		ModelPagination.Pagination<ModelMasterConfig.MasterConfigTimeoutType>
	> {
		try {
			// const response: any = await this._api.post(
			// 	EndpointKey.pymd,
			// 	RoutePath.PymdMasterConfigTimeoutType,
			// 	'',
			// 	payload,
			// )
			const response = timeoutTypeResponse

			return transformResponseMasterConfigTimeoutTypeInquiry(response)
		} catch (e) {
			if (
				e instanceof ApiError &&
				PmtStatusCode.PMT_2009 === e.message.message
			) {
				return ModelPagination.Pagination.empty(ErrorType.DATA_NOT_FOUND)
			}

			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}
}
