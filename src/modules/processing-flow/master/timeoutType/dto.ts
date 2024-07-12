import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import get from 'lodash/get'
import { ITimeoutType } from './interface'

export const mapMasterConfigTimeoutType = (
	timeoutTypeData: ModelPagination.Pagination<ModelMasterConfig.MasterConfigTimeoutType>,
): ITimeoutType[] => {
	const data = get(
		timeoutTypeData,
		'data',
		[] as ModelMasterConfig.MasterConfigTimeoutType[],
	)
	return data.map(({ config, timeStamp }, index) => {
		return {
			number: index + 1,
			timeoutTypeId: get(config, 'timeoutTypeId'),
			timeoutType: get(config, 'timeoutType'),
			timeoutValue: get(config, 'timeoutValue'),
			minThreshold: get(config, 'minThreshold'),
			maxThreshold: get(config, 'maxThreshold'),
			latencyOffset: get(config, 'latencyOffset'),
			activeStatus: get(config, 'activeStatus'),
			createdDateTime: get(timeStamp, 'createdDateTime'),
			createdBy: get(timeStamp, 'createdBy'),
			updatedDateTime: get(timeStamp, 'updatedDateTime'),
			updatedBy: get(timeStamp, 'updatedBy'),
		}
	})
}
