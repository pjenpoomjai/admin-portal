import { ModelResources } from 'adapters/operators/models'

export interface IRequestLookupDataRequest {
	lookupType?: string
}

export interface IResourcesQuery {
	lookupData: (
		payload: IRequestLookupDataRequest,
	) => Promise<ModelResources.Resources>
}
