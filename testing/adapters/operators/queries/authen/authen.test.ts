import { ErrorType, Message } from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { AuthenQuery } from 'adapters/operators/queries/authen/authen'
import {
	buildLink,
	buildMultiLink,
	endpointPortal,
	endpointPymd,
	mockCorrelationId,
} from '../../__mocks__/mockConfig'
import authenResponseJson from './authenResponse.json'

const mockPost = jest.fn()
const mockResponseCallback = jest.fn()
const testVariables = {}

describe('queries: authen', () => {
	beforeAll(() => {
		const token = 'token'
		testVariables['token'] = token
		testVariables['authenQuery'] = new AuthenQuery(
			buildMultiLink(
				{
					endpoints: [endpointPortal, endpointPymd],
					context: { token: 'token' },
				},
				buildLink({ mockPost, mockResponseCallback }),
			),
		)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	test('Should return correct response if call authenWithAzure successfully', async () => {
		mockResponseCallback.mockResolvedValue(authenResponseJson)
		const response = await testVariables['authenQuery'].authenWithAzure(
			{ token: testVariables['token'] },
			{ expires: '1706924826' },
		)
		// TODO: expect response
		expect(response).toBeTruthy()
		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdLogin,
			{ expires: '1706924826' },
			{
				baseURL: endpointPortal.endpoint,
				headers: {
					authorization: `Bearer ${testVariables['token']}`,
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should throw error if call authenWithAzure un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(
			testVariables['authenQuery'].authenWithAzure(
				{ token: testVariables['token'] },
				{ expires: '1706924826' },
			),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})

	test('Should return correct response if call refreshToken successfully', async () => {
		mockResponseCallback.mockResolvedValue(authenResponseJson)
		const response = await testVariables['authenQuery'].refreshToken(
			{ token: testVariables['token'] },
			{ expires: '1706924826' },
		)
		// TODO: expect response
		expect(response).toBeTruthy()
		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdRefresh,
			{ expires: '1706924826' },
			{
				baseURL: endpointPortal.endpoint,
				headers: {
					authorization: `Bearer ${testVariables['token']}`,
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should throw error if call refreshToken un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(
			testVariables['authenQuery'].refreshToken(
				{ token: testVariables['token'] },
				{ expires: '1706924826' },
			),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})
})
