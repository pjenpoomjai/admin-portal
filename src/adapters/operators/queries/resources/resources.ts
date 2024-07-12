import { ApiError, ErrorType, Message, PmtStatusCode } from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { ModelResources } from 'adapters/operators/models'
import { EndpointKey } from 'shared/adapters/interfaces'
import {
	IRequestLookupDataRequest,
	IResourcesQuery,
} from 'shared/adapters/interfaces/resources/queries'
import { Query } from '../base'
import { transformResponseWithResourceModel } from './dto'

export class ResourcesQuery extends Query implements IResourcesQuery {
	public async lookupData(
		payload: IRequestLookupDataRequest,
	): Promise<ModelResources.Resources> {
		try {
			if (payload?.lookupType === 'masterConfig') {
				return transformResponseWithResourceModel({
					data: [
						{
							lookupType: 'masterConfig',
							lookupName: 'Channel',
							lookupValue: 'CHANNEL',
						},
						{
							lookupType: 'masterConfig',
							lookupName: 'Service',
							lookupValue: 'SERVICE',
						},
						{
							lookupType: 'masterConfig',
							lookupName: 'Instruction type',
							lookupValue: 'INSTRUCTION_TYPE',
						},
						{
							lookupType: 'masterConfig',
							lookupName: 'Timeout type',
							lookupValue: 'TIMEOUT_TYPE',
						},
					],
				})
			}

			const response: any = await this._api.post(
				EndpointKey.pymd,
				RoutePath.PymdLookup,
				'',
				payload,
			)
			return transformResponseWithResourceModel(response)
		} catch (err) {
			if (
				err instanceof ApiError &&
				err.message.message === PmtStatusCode.PMT_2009
			) {
				return new ModelResources.Resources('001', [])
			}

			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				err?.message?.message,
			)
		}
	}
}
