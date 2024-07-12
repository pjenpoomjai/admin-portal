import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import defaultTo from 'lodash/defaultTo'
import get from 'lodash/get'
import { IMasterConfigServiceDataResponse } from '../interface'
import { transformMasterConfigPagination } from './masterConfigPagination'
import { transformResponseMasterConfigTimeStampInquiry } from './masterConfigTimeStamp'

export const transformResponseMasterConfigServiceInquiry = (
	response: IMasterConfigServiceDataResponse,
): ModelPagination.Pagination<ModelMasterConfig.MasterConfigService> => {
	const { data: services } = response
	const transformDataToPagination = transformMasterConfigPagination(response)
	const data = defaultTo(services, []).map((service) => {
		const information = new ModelMasterConfig.ServiceInfo(
			get(service, 'serviceId'),
			get(service, 'functionName'),
			get(service, 'systemName'),
			get(service, 'activeStatus'),
		)

		const timestamp = transformResponseMasterConfigTimeStampInquiry(service)

		const id = get(service, 'serviceId')

		return new ModelMasterConfig.MasterConfigService(id, information, timestamp)
	})

	return transformDataToPagination(data)
}
