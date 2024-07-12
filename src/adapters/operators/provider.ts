import { EndpointKey, IHeader, QueryKey } from 'shared/adapters/interfaces'
import { IMultiLink } from 'x-core-modules/adapter/link'
import { AuthenMutate } from './mutates'
import {
	AuthenQuery,
	ConfigurationQuery,
	MasterConfigQuery,
	ResourcesQuery,
	TermsAndConditionsQuery,
	TransactionsQuery,
} from './queries'

export const queryProvider = (api: IMultiLink<EndpointKey, IHeader>) => {
	return {
		[QueryKey.transactions]:
			new TransactionsQuery.Transactions.TransactionsQuery(api),
		[QueryKey.Authen]: new AuthenQuery.Authen.AuthenQuery(api),
		[QueryKey.Resources]: new ResourcesQuery.Resources.ResourcesQuery(api),
		[QueryKey.Config]: new ConfigurationQuery.Configuration.ConfigurationQuery(
			api,
		),
		[QueryKey.TermsAndConditions]:
			new TermsAndConditionsQuery.TermAndConditions.TermsAndConditionsQuery(
				api,
			),
		[QueryKey.MasterConfig]:
			new MasterConfigQuery.MasterConfig.MasterConfigQuery(api),
	}
}

export const mutateProvider = (api: IMultiLink<EndpointKey, IHeader>) => {
	return {
		[QueryKey.Authen]: new AuthenMutate.Authen.AuthenMutate(api),
	}
}
