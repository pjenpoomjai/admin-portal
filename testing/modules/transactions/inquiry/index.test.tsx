import { render } from '@testing-library/react'
import TransactionsInquiryContainer from 'modules/transactions/inquiry'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { getMockResourceData } from 'testing/test-utils/getMockResourceData'
import { useAppContext } from 'x-core-modules/builder/appBuilder'
import { mockTransaction } from './dto.test'

jest.mock('x-core-modules/builder/appBuilder', () => ({
	...jest.requireActual('x-core-modules/builder/appBuilder'),
	useAppContext: jest.fn(),
}))

const mockUseAppContext = useAppContext as jest.Mock
const mockGetResourceData = jest.fn()
const mockGetValues = jest.fn()

describe('TransactionsInquiryContainer: Container Configuration', () => {
	beforeEach(() => {
		mockGetResourceData.mockImplementation(getMockResourceData)
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should render successfully', async () => {
		mockGetValues.mockReturnValue({})
		mockUseAppContext.mockReturnValue(
			buildMockUseAppContext({
				overrideContextConsumer: {
					resources: () => ({
						useGetResourceModelSelector: () => ({
							getResourceData: mockGetResourceData,
						}),
					}),
				},
				overrideAdapterQuery: {
					lazyQuery: jest.fn().mockImplementation(() => {
						return {
							data: { data: [mockTransaction] },
							error: undefined,
							trigger: jest.fn(),
							isMutating: false,
						}
					}),
				},
			}),
		)
		const { baseElement, unmount } = render(<TransactionsInquiryContainer />)
		expect(baseElement).toMatchSnapshot()
		unmount()
	})
})
