import { ErrorType, Message } from 'adapters/error'
import { ModelTermsAndConditions } from 'adapters/operators/models'
import { TermsAndConditionsQuery } from 'adapters/operators/queries/termsAndConditions/termsAndConditions'
import {
	buildLink,
	buildMultiLink,
	endpointPymd,
} from '../../__mocks__/mockConfig'
import termsAndConditionsResponseJson from './termsAndConditionsResponse.json'

const mockGet = jest.fn()
const mockResponseCallback = jest.fn()
const testVariables = {}

describe('queries: termsAndConditions', () => {
	beforeAll(() => {
		testVariables['termsAndConditionsQuery'] = new TermsAndConditionsQuery(
			buildMultiLink(
				{
					endpoints: [endpointPymd],
					context: { token: 'token' },
				},
				buildLink({ mockGet, mockResponseCallback }),
			),
		)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	test('Should return correct response if call termsAndConditions successfully', async () => {
		// mockResponseCallback.mockResolvedValue(termsAndConditionsResponseJson)
		const response = await testVariables[
			'termsAndConditionsQuery'
		].getTermsAndConditions(undefined)
		expect(response).toEqual(
			new ModelTermsAndConditions.TermsAndConditions(
				termsAndConditionsResponseJson.data.termsOfUse.map(
					({ content, language, title, version }) => {
						return new ModelTermsAndConditions.TermsOfUse(
							version,
							language,
							title,
							content,
						)
					},
				),
			),
		)

		// expect(mockGet).toHaveBeenCalledWith(
		// 	RoutePath.PymdTermsAndConditions,
		// 	{},
		// 	{
		// 		baseURL: endpointPymd.endpoint,
		// 		headers: {
		// 			correlationId: mockCorrelationId,
		// 		},
		// 	},
		// )
	})

	test.skip('Should throw error if call termsAndConditions un-successfully', async () => {
		mockGet.mockRejectedValue(new Error())
		await expect(
			testVariables['termsAndConditionsQuery'].getTermsAndConditions(undefined),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})
})
