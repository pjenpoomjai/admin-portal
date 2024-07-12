import { IAuthenMutated } from './authen/mutates'
import { IAuthenQuery } from './authen/queries'
import { IConfigurationQuery } from './config/queries'
import { IMasterConfigQuery } from './masterConfig/queries'
import { IResourcesQuery } from './resources/queries'
import { ITermsAndConditionsQuery } from './termsAndConditions/queries'
import { ITransactionsQuery } from './transactions/queries'

export enum QueryKey {
	transactions = 'transactions',
	Authen = 'authen',
	Resources = 'resources',
	Config = 'config',
	MasterConfig = 'masterConfig',
	TermsAndConditions = 'termsAndConditions',
}

export enum EndpointKey {
	portal = 'portal',
	pymd = 'pymd',
}

export interface IHeader {
	token?: string
}

export interface IQueryProvider {
	[QueryKey.transactions]: ITransactionsQuery
	[QueryKey.Authen]: IAuthenQuery
	[QueryKey.Resources]: IResourcesQuery
	[QueryKey.Config]: IConfigurationQuery
	[QueryKey.MasterConfig]: IMasterConfigQuery
	[QueryKey.TermsAndConditions]: ITermsAndConditionsQuery
}

export interface IMutateProvider {
	[QueryKey.Authen]: IAuthenMutated
}
