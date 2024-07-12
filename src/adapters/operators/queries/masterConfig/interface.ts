export interface IMasterConfigPagination {
	pageNo: number
	pageLimit: number
	totalPage: number
	totalRow: number
}

export interface IMasterConfigTimestamp {
	createdDateTime: string
	createdBy: string
	updatedDateTime: string
	updatedBy: string
}

export interface IMasterConfigChannelResponse extends IMasterConfigTimestamp {
	channelId: string
	channelCode: string
	channelName: string
	channelDescription: string | null
	activeStatus: boolean
}

export interface IMasterConfigChannelDataResponse
	extends IMasterConfigPagination {
	data: IMasterConfigChannelResponse[]
}

export interface IMasterConfigServiceResponse extends IMasterConfigTimestamp {
	serviceId: string
	functionName: string
	systemName: string
	activeStatus: boolean
}

export interface IMasterConfigServiceDataResponse
	extends IMasterConfigPagination {
	data: IMasterConfigServiceResponse[]
}

export interface IMasterConfigInstructionTypeResponse
	extends IMasterConfigTimestamp {
	instructionTypeId: string
	instructionType: string
	activeStatus: boolean
}

export interface IMasterConfigInstructionTypeDataResponse
	extends IMasterConfigPagination {
	data: IMasterConfigInstructionTypeResponse[]
}

export interface IMasterConfigTimeoutTypeResponse
	extends IMasterConfigTimestamp {
	timeoutTypeId: string
	timeoutType: string
	timeoutValue: number
	minThreshold?: number
	maxThreshold?: number
	latencyOffset?: number
	activeStatus: boolean
}

export interface IMasterConfigTimeoutTypeDataResponse
	extends IMasterConfigPagination {
	data: IMasterConfigTimeoutTypeResponse[]
}
