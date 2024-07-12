import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import get from 'lodash/get'
import { IChannel } from './interface'

export const mapMasterConfigChannel = (
	channelData: ModelPagination.Pagination<ModelMasterConfig.MasterConfigChannel>,
): IChannel[] => {
	const data = get(
		channelData,
		'data',
		[] as ModelMasterConfig.MasterConfigChannel[],
	)
	return data.map(({ config, timeStamp }, index) => {
		return {
			number: index + 1,
			channelId: get(config, 'channelId'),
			channelCode: get(config, 'channelCode'),
			channelName: get(config, 'channelName'),
			channelDescription: get(config, 'channelDescription'),
			activeStatus: get(config, 'activeStatus'),
			createdDateTime: get(timeStamp, 'createdDateTime'),
			createdBy: get(timeStamp, 'createdBy'),
			updatedDateTime: get(timeStamp, 'updatedDateTime'),
			updatedBy: get(timeStamp, 'updatedBy'),
		}
	})
}
