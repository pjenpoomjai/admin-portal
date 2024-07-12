import { ModelTermsAndConditions } from 'adapters/operators/models'

export interface ITermsAndConditionsRequest {
	lastVersionFlag?: boolean
}

export interface ITermsAndConditionsQuery {
	getTermsAndConditions: (
		payload: ITermsAndConditionsRequest,
	) => Promise<ModelTermsAndConditions.TermsAndConditions>
}
