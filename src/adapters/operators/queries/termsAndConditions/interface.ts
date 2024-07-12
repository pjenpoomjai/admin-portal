export interface ITermsOfUseResponse {
	version: number
	language: string
	title: string
	content: string
}

export interface ITermsAndConditionsResponse {
	termsOfUse: ITermsOfUseResponse[]
}
