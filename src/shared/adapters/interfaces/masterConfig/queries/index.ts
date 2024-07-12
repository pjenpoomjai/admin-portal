import { Pagination } from '../../transactions/queries'
import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'

export interface IMasterConfigQuery {
	getMasterConfigChannel: (
		payload: IGetMasterConfigChannelRequest,
	) => Promise<
		ModelPagination.Pagination<ModelMasterConfig.MasterConfigChannel>
	>
	getMasterConfigService: (
		payload: IGetMasterConfigServiceRequest,
	) => Promise<
		ModelPagination.Pagination<ModelMasterConfig.MasterConfigService>
	>
	getMasterConfigInstructionType: (
		payload: IGetMasterConfigInstructionTypeRequest,
	) => Promise<
		ModelPagination.Pagination<ModelMasterConfig.MasterConfigInstructionType>
	>
	getMasterConfigTimeoutType: (
		payload: IGetMasterConfigTimeoutTypeRequest,
	) => Promise<
		ModelPagination.Pagination<ModelMasterConfig.MasterConfigTimeoutType>
	>
}

export interface IGetMasterConfigChannelSearch {
	channelId?: string
	channelCode?: string
	channelName?: string
	channelDescription?: string
	activeStatus?: boolean
}

export interface IGetMasterConfigChannelRequest extends Pagination {
	search?: IGetMasterConfigChannelSearch
}

export interface IGetMasterConfigServiceSearch {
	serviceId?: string
	functionName?: string
	systemName?: string
	activeStatus?: boolean
}

export interface IGetMasterConfigServiceRequest extends Pagination {
	search?: IGetMasterConfigServiceSearch
}

export interface IGetMasterConfigInstructionTypeSearch {
	instructionTypeId?: string
	instructionType?: string
	activeStatus?: boolean
}

export interface IGetMasterConfigInstructionTypeRequest extends Pagination {
	search?: IGetMasterConfigInstructionTypeSearch
}

export interface IGetMasterConfigTimeoutTypeSearch {
	timeoutTypeId?: string
	timeoutType?: string
	timeoutValue?: number
	minThreshold?: number
	maxThreshold?: number
	latencyOffset?: number
	activeStatus?: boolean
}

export interface IGetMasterConfigTimeoutTypeRequest extends Pagination {
	search?: IGetMasterConfigTimeoutTypeSearch
}
