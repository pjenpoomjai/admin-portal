import { TermsAndConditions } from 'adapters/operators/models/termsAndConditions'
import { ITermsAndConditions } from './interface'

export const mapTermsAndConditions = (
	termsAndConditions: TermsAndConditions,
): ITermsAndConditions[] => {
	return termsAndConditions.termsOfUse.map(
		({ content, language, title, version }) => {
			return {
				content,
				language,
				title,
				version,
			}
		},
	)
}
