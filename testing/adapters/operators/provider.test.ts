import { AuthenMutate } from 'adapters/operators/mutates/authen/authen'
import { mutateProvider, queryProvider } from 'adapters/operators/provider'
import { AuthenQuery } from 'adapters/operators/queries/authen/authen'
import { ResourcesQuery } from 'adapters/operators/queries/resources/resources'
import { ConfigurationQuery } from 'adapters/operators/queries/configuration/configuration'
import { TransactionsQuery } from 'adapters/operators/queries/transactions/transactions'
import { MasterConfigQuery } from 'adapters/operators/queries/masterConfig/masterConfig'
import { QueryKey } from 'shared/adapters/interfaces'
import { buildLink, buildMultiLink, endpointPymd } from './__mocks__/mockConfig'

const testVariables = {}

describe('adapter: provider', () => {
	beforeAll(() => {
		const mockMultiLink = buildMultiLink(
			{ endpoints: [endpointPymd], context: { token: 'token' } },
			buildLink({}),
		)
		testVariables['mockMultiLink'] = mockMultiLink
		testVariables['mockResultQuery'] = {
			[QueryKey.transactions]: new TransactionsQuery(mockMultiLink),
			[QueryKey.Authen]: new AuthenQuery(mockMultiLink),
			[QueryKey.Resources]: new ResourcesQuery(mockMultiLink),
			[QueryKey.Config]: new ConfigurationQuery(mockMultiLink),
			[QueryKey.TermsAndConditions]: new ResourcesQuery(mockMultiLink),
			[QueryKey.MasterConfig]: new ResourcesQuery(mockMultiLink),
		}
		testVariables['mockResultMutate'] = {
			[QueryKey.Authen]: new AuthenMutate(mockMultiLink),
		}
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	test('correct link queryProvider', () => {
		const queries = queryProvider(testVariables['mockMultiLink'])
		expect(queries).toEqual(testVariables['mockResultQuery'])
	})

	test('correct link mutateProvider', () => {
		const queryMock = mutateProvider(testVariables['mockMultiLink'])
		expect(queryMock).toEqual(testVariables['mockResultMutate'])
	})
})
