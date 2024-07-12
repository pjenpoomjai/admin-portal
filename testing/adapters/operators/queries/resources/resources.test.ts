import { ErrorType, Message } from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { ModelResources } from 'adapters/operators/models'
import { LookupData } from 'adapters/operators/models/resources'
import { LookupDataType } from 'adapters/operators/models/resources/interface'
import { ResourcesQuery } from 'adapters/operators/queries/resources/resources'
import {
	buildLink,
	buildMultiLink,
	endpointPymd,
	mockCorrelationId,
} from '../../__mocks__/mockConfig'
import resourceResponseJson from './resourceResponse.json'

const mockPost = jest.fn()
const mockResponseCallback = jest.fn()
const testVariables = {}

describe('queries: resources', () => {
	beforeAll(() => {
		testVariables['resourcesQuery'] = new ResourcesQuery(
			buildMultiLink(
				{
					endpoints: [endpointPymd],
					context: { token: 'token' },
				},
				buildLink({ mockPost, mockResponseCallback }),
			),
		)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	test('Should return correct response if call lookupData successfully', async () => {
		mockResponseCallback.mockResolvedValue(resourceResponseJson)
		const response = await testVariables['resourcesQuery'].lookupData(undefined)
		expect(response).toEqual(
			new ModelResources.Resources(
				'01',
				resourceResponseJson.data.map(
					({ lookupType, lookupName, lookupValue }) =>
						new LookupData(
							lookupType as unknown as LookupDataType,
							lookupName,
							lookupValue,
						),
				),
			),
		)
		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdLookup,
			{},
			{
				baseURL: endpointPymd.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should throw error if call lookupData un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(
			testVariables['resourcesQuery'].lookupData(undefined),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})
})
