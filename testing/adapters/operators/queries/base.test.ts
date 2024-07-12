import { EndpointKey } from 'shared/adapters/interfaces'
import {
	buildLink,
	buildMultiLink,
	endpointPortal,
	endpointPymdV1,
	mockCorrelationId,
} from '../__mocks__/mockConfig'
import { QueryForTesting } from '../__mocks__/queries/QueryForTesting'

const mockGet = jest.fn()
const mockPost = jest.fn()
const mockPatch = jest.fn()
const testVariables = {}
const testList = [
	{ name: 'post', mock: mockPost, func: 'testPost' },
	{ name: 'patch', mock: mockPatch, func: 'testPatch' },
]

describe('queries: base', () => {
	beforeAll(() => {
		const token = 'token'
		testVariables['token'] = token
		testVariables['url'] = '/queries'
		testVariables['queries'] = new QueryForTesting(
			buildMultiLink(
				{
					endpoints: [endpointPortal, endpointPymdV1],
					context: { token },
				},
				buildLink({ mockGet, mockPost, mockPatch }),
			),
		)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	test('Should call queries method get with correct params', async () => {
		mockGet.mockResolvedValue(undefined)
		await testVariables['queries'].testGet(
			EndpointKey.portal,
			testVariables['url'],
			{},
		)
		expect(mockGet).toHaveBeenCalledWith(testVariables['url'], {
			baseURL: endpointPortal.endpoint,
			headers: {
				correlationId: mockCorrelationId,
			},
		})
	})

	test('Should call queries method get with correct params with versioning', async () => {
		mockGet.mockResolvedValue(undefined)
		await testVariables['queries'].testGet(
			EndpointKey.pymd,
			testVariables['url'],
			{},
		)
		expect(mockGet).toHaveBeenCalledWith(
			`/${endpointPymdV1.versioning}${testVariables['url']}`,
			{
				baseURL: endpointPymdV1.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	testList.forEach(({ name, mock, func }) => {
		test(`Should call queries method ${name} with correct params`, async () => {
			mock.mockResolvedValue(undefined)
			await testVariables['queries'][func](
				EndpointKey.portal,
				testVariables['url'],
				{},
				undefined,
			)
			expect(mock).toHaveBeenCalledWith(
				testVariables['url'],
				{},
				{
					baseURL: endpointPortal.endpoint,
					headers: {
						correlationId: mockCorrelationId,
					},
				},
			)
		})

		test(`Should call queries method ${name} with correct params with versioning`, async () => {
			mock.mockResolvedValue(undefined)
			await testVariables['queries'][func](
				EndpointKey.pymd,
				testVariables['url'],
				{},
				undefined,
			)
			expect(mock).toHaveBeenCalledWith(
				`/${endpointPymdV1.versioning}${testVariables['url']}`,
				{},
				{
					baseURL: endpointPymdV1.endpoint,
					headers: {
						correlationId: mockCorrelationId,
					},
				},
			)
		})

		test(`Should call queries method ${name} with correct params with options`, async () => {
			mock.mockResolvedValue(undefined)
			await testVariables['queries'][func](
				EndpointKey.portal,
				testVariables['url'],
				{},
				{ versioning: 'v2' },
			)
			expect(mock).toHaveBeenCalledWith(
				`/v2${testVariables['url']}`,
				{},
				{
					baseURL: endpointPortal.endpoint,
					versioning: 'v2',
					headers: {
						correlationId: mockCorrelationId,
					},
				},
			)
		})
	})
})
