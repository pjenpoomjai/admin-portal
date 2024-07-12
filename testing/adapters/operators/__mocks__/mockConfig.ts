import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { IConfiguration, Link, MultipleLink } from 'x-core-modules/adapter/link'

export const mockCorrelationId = 'c3bec388-1dde-4a83-b37d-3e6896114c1f'

const mockParseHeader = () => {
	return {
		correlationId: mockCorrelationId,
	}
}

export const endpointPortal = {
	key: EndpointKey.portal,
	versioning: '',
	endpoint: '/api',
	parseHeader: mockParseHeader,
}

export const endpointPymd = {
	key: EndpointKey.pymd,
	versioning: '',
	endpoint: '/pymd',
	parseHeader: mockParseHeader,
}

export const endpointPymdV1 = {
	key: EndpointKey.pymd,
	versioning: 'v1',
	endpoint: '/pymd',
	parseHeader: mockParseHeader,
}

export const buildLink = (params: {
	mockGet?: jest.Mock
	mockPost?: jest.Mock
	mockPatch?: jest.Mock
	mockPut?: jest.Mock
	mockDelete?: jest.Mock
	mockResponseCallback?: jest.Mock
	mockExceptionCallback?: jest.Mock
}) => {
	const {
		mockGet = jest.fn(),
		mockPost = jest.fn(),
		mockPatch = jest.fn(),
		mockPut = jest.fn(),
		mockDelete = jest.fn(),
		mockResponseCallback = jest.fn(),
		mockExceptionCallback = jest.fn(),
	} = params
	return new Link(
		{
			get: mockGet,
			post: mockPost,
			patch: mockPatch,
			put: mockPut,
			delete: mockDelete,
		} as any,
		mockResponseCallback,
		mockExceptionCallback,
	)
}

export const buildMultiLink = (
	config: IConfiguration<EndpointKey, IHeader>,
	link: Link,
) => {
	return new MultipleLink<EndpointKey, IHeader>(config, link)
}
