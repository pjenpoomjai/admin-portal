import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import defaultTo from 'lodash/defaultTo'
import get from 'lodash/get'
import { IMasterConfigChannelDataResponse } from '../interface'
import { transformResponseMasterConfigTimeStampInquiry } from './masterConfigTimeStamp'
import { transformMasterConfigPagination } from './masterConfigPagination'

export const transformResponseMasterConfigChannelInquiry = (
	response: IMasterConfigChannelDataResponse,
): ModelPagination.Pagination<ModelMasterConfig.MasterConfigChannel> => {
	const { data: channels } = response
	const transformDataToPagination = transformMasterConfigPagination(response)
	const data = defaultTo(channels, []).map((channel) => {
		const information = new ModelMasterConfig.ChannelInfo(
			get(channel, 'channelId'),
			get(channel, 'channelCode'),
			get(channel, 'channelName'),
			get(channel, 'channelDescription', null),
			get(channel, 'activeStatus'),
		)

		const timestamp = transformResponseMasterConfigTimeStampInquiry(channel)

		const id = get(channel, 'channelId')

		return new ModelMasterConfig.MasterConfigChannel(id, information, timestamp)
	})

	return transformDataToPagination(data)
}
