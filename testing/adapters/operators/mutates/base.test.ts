import { EndpointKey } from 'shared/adapters/interfaces'
import {
	buildLink,
	buildMultiLink,
	endpointPortal,
	endpointPymdV1,
	mockCorrelationId,
} from '../__mocks__/mockConfig'
import { MutatedForTesting } from '../__mocks__/mutates/MutatedForTesting'

const mockPost = jest.fn()
const mockPatch = jest.fn()
const mockPut = jest.fn()
const mockDelete = jest.fn()
const testVariables = {}
const testList = [
	{ name: 'post', mock: mockPost, func: 'testPost' },
	{ name: 'patch', mock: mockPatch, func: 'testPatch' },
	{ name: 'put', mock: mockPut, func: 'testPut' },
]

describe('mutate: base', () => {
	const url = '/mutate'
	beforeAll(() => {
		const token = 'token'
		testVariables['token'] = token
		testVariables['url'] = '/queries'
		testVariables['mutate'] = new MutatedForTesting(
			buildMultiLink(
				{
					endpoints: [endpointPortal, endpointPymdV1],
					context: { token },
				},
				buildLink({ mockPost, mockPut, mockPatch, mockDelete }),
			),
		)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	testList.forEach(({ name, mock, func }) => {
		test(`Should call mutate method ${name} with correct params`, async () => {
			mock.mockResolvedValue(undefined)
			await testVariables['mutate'][func](
				EndpointKey.portal,
				url,
				{},
				undefined,
			)
			expect(mock).toHaveBeenCalledWith(
				url,
				{},
				{
					baseURL: endpointPortal.endpoint,
					headers: {
						correlationId: mockCorrelationId,
					},
				},
			)
		})

		test(`Should call mutate method ${name} with correct params with versioning`, async () => {
			mock.mockResolvedValue(undefined)
			await testVariables['mutate'][func](EndpointKey.pymd, url, {}, undefined)
			expect(mock).toHaveBeenCalledWith(
				`/${endpointPymdV1.versioning}${url}`,
				{},
				{
					baseURL: endpointPymdV1.endpoint,
					headers: {
						correlationId: mockCorrelationId,
					},
				},
			)
		})

		test(`Should call mutate method ${name} with correct params with options`, async () => {
			mock.mockResolvedValue(undefined)
			await testVariables['mutate'][func](
				EndpointKey.portal,
				url,
				{},
				{ versioning: 'v2' },
			)
			expect(mock).toHaveBeenCalledWith(
				`/v2${url}`,
				{},
				{
					baseURL: endpointPortal.endpoint,
					headers: {
						correlationId: mockCorrelationId,
					},
					versioning: 'v2',
				},
			)
		})
	})

	test('Should call mutate method delete with correct params', async () => {
		mockDelete.mockResolvedValue(undefined)
		await testVariables['mutate'].testDelete(EndpointKey.portal, url, {})
		expect(mockDelete).toHaveBeenCalledWith(url, {
			baseURL: endpointPortal.endpoint,
			headers: {
				correlationId: mockCorrelationId,
			},
		})
	})

	test('Should call mutate method delete with correct params with versioning', async () => {
		mockDelete.mockResolvedValue(undefined)
		await testVariables['mutate'].testDelete(EndpointKey.pymd, url, {})
		expect(mockDelete).toHaveBeenCalledWith(
			`/${endpointPymdV1.versioning}${url}`,
			{
				baseURL: endpointPymdV1.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
			},
		)
	})
})
