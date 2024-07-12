import { ModelTermsAndConditions } from 'adapters/operators/models'
import { ITermsAndConditionsResponse } from './interface'

export const transformResponseTermsAndConditions = (
	response: ITermsAndConditionsResponse,
): ModelTermsAndConditions.TermsAndConditions => {
	const { termsOfUse } = response

	return new ModelTermsAndConditions.TermsAndConditions(
		termsOfUse.map(({ content, language, title, version }) => {
			return new ModelTermsAndConditions.TermsOfUse(
				version,
				language,
				title,
				content,
			)
		}),
	)
}
