import { ModelAuthen } from 'adapters/operators/models'
// authen

export interface IBaseAzureRequest {
	token?: string
}

export interface IBaseAzureRequestParams {
	expires?: string
}

export interface IAuthenWithAzureRequest extends IBaseAzureRequest {}

export interface IRefreshWithAzureRequest extends IBaseAzureRequest {}

export interface IAuthenWithAzureRequestParams
	extends IBaseAzureRequestParams {}

export interface IRefreshWithAzureRequestParams
	extends IBaseAzureRequestParams {}

export interface IAuthenQuery {
	authenWithAzure: (
		payload: IAuthenWithAzureRequest,
		params: IAuthenWithAzureRequestParams,
	) => Promise<ModelAuthen.Authen>
	refreshToken(
		payload: IRefreshWithAzureRequest,
		params: IRefreshWithAzureRequestParams,
	): Promise<ModelAuthen.Authen>
}
