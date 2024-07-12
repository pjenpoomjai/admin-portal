import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import get from 'lodash/get'
import { IService } from './interface'

export const mapMasterConfigService = (
	serviceData: ModelPagination.Pagination<ModelMasterConfig.MasterConfigService>,
): IService[] => {
	const data = get(
		serviceData,
		'data',
		[] as ModelMasterConfig.MasterConfigService[],
	)
	return data.map(({ config, timeStamp }, index) => {
		return {
			number: index + 1,
			serviceId: get(config, 'serviceId'),
			functionName: get(config, 'functionName'),
			systemName: get(config, 'systemName'),
			activeStatus: get(config, 'activeStatus'),
			createdDateTime: get(timeStamp, 'createdDateTime'),
			createdBy: get(timeStamp, 'createdBy'),
			updatedDateTime: get(timeStamp, 'updatedDateTime'),
			updatedBy: get(timeStamp, 'updatedBy'),
		}
	})
}
