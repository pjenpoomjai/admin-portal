import { ReactNode } from 'react'
import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { IAdapterProvider } from 'x-core-modules/provider/adapter'

export interface IUseResourceHandler {
	openCommonDialog: any
	closeCommonDialog: any
	adapter: IAdapterProvider<EndpointKey, IHeader>
	renderTermsAndConditions: (terms: ITermsAndConditions[]) => ReactNode
}

export interface ITermsAndConditions {
	version: number
	language: string
	title: string
	content: string
}

export interface IUseFooterAuth {
	renderTermsAndConditions: (terms: ITermsAndConditions[]) => ReactNode
}
