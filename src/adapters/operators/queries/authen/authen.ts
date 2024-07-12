import { ErrorType, Message } from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { ModelAuthen } from 'adapters/operators/models'
import { EndpointKey } from 'shared/adapters/interfaces'
import {
	IAuthenQuery,
	IAuthenWithAzureRequest,
	IAuthenWithAzureRequestParams,
	IRefreshWithAzureRequest,
	IRefreshWithAzureRequestParams,
} from 'shared/adapters/interfaces/authen/queries'
import { Query } from '../base'
import { transformResponseWithAzureModel } from './dto'

export class AuthenQuery extends Query implements IAuthenQuery {
	public async authenWithAzure(
		payload: IAuthenWithAzureRequest,
		params: IAuthenWithAzureRequestParams,
	): Promise<ModelAuthen.Authen> {
		try {
			const response = await this._api.post(
				EndpointKey.portal,
				RoutePath.PymdLogin,
				'',
				{ expires: params.expires },
				{
					headers: {
						authorization: `Bearer ${payload.token}`,
					},
				},
			)
			return transformResponseWithAzureModel(response)
		} catch (err) {
			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				err?.message?.message,
			)
		}
	}

	public async refreshToken(
		payload: IRefreshWithAzureRequest,
		params: IRefreshWithAzureRequestParams,
	): Promise<ModelAuthen.Authen> {
		try {
			const response = await this._api.post(
				EndpointKey.portal,
				RoutePath.PymdRefresh,
				'',
				{ expires: params.expires },
				{
					headers: {
						authorization: `Bearer ${payload.token}`,
					},
				},
			)
			return transformResponseWithAzureModel(response)
		} catch (err) {
			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				err?.message?.message,
			)
		}
	}
}
