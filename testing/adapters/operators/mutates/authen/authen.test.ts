import { ErrorType, Message } from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { AuthenMutate } from 'adapters/operators/mutates/authen/authen'
import {
	buildLink,
	buildMultiLink,
	endpointPortal,
	mockCorrelationId,
} from '../../__mocks__/mockConfig'

const mockPost = jest.fn()
const testVariables = {}

describe('mutates: authen', () => {
	beforeAll(() => {
		testVariables['authenMutate'] = new AuthenMutate(
			buildMultiLink(
				{
					endpoints: [endpointPortal],
					context: { token: 'token' },
				},
				buildLink({ mockPost }),
			),
		)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	test('Should return true if call logout successfully', async () => {
		const response = await testVariables['authenMutate'].logout()
		expect(response).toEqual(true)
		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdLogout,
			{},
			{
				baseURL: endpointPortal.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should throw error if call logout un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(testVariables['authenMutate'].logout()).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})

	test('Should return true if call clearSession successfully', async () => {
		const response = await testVariables['authenMutate'].clearSession()
		expect(response).toEqual(true)
		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdClearSession,
			{},
			{
				baseURL: endpointPortal.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should throw error if call clearSession un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(testVariables['authenMutate'].clearSession()).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})
})
