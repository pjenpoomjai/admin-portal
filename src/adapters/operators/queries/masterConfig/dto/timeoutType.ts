import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import defaultTo from 'lodash/defaultTo'
import get from 'lodash/get'
import { IMasterConfigTimeoutTypeDataResponse } from '../interface'
import { transformMasterConfigPagination } from './masterConfigPagination'
import { transformResponseMasterConfigTimeStampInquiry } from './masterConfigTimeStamp'

export const transformResponseMasterConfigTimeoutTypeInquiry = (
	response: IMasterConfigTimeoutTypeDataResponse,
): ModelPagination.Pagination<ModelMasterConfig.MasterConfigTimeoutType> => {
	const { data: timeoutTypes } = response
	const transformDataToPagination = transformMasterConfigPagination(response)
	const data = defaultTo(timeoutTypes, []).map((timeoutType) => {
		const information = new ModelMasterConfig.TimeoutTypeInfo(
			get(timeoutType, 'timeoutTypeId'),
			get(timeoutType, 'timeoutType'),
			get(timeoutType, 'timeoutValue'),
			get(timeoutType, 'minThreshold', null),
			get(timeoutType, 'maxThreshold', null),
			get(timeoutType, 'latencyOffset', null),
			get(timeoutType, 'activeStatus'),
		)

		const timestamp = transformResponseMasterConfigTimeStampInquiry(timeoutType)

		const id = get(timeoutType, 'instructionTypeId')

		return new ModelMasterConfig.MasterConfigTimeoutType(
			id,
			information,
			timestamp,
		)
	})

	return transformDataToPagination(data)
}
