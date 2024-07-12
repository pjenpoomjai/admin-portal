import { render } from '@testing-library/react'
import TransactionsInformationContainer from 'modules/transactions/information'
import { useParams, useSearchParams } from 'next/navigation'
import { expectTransactionDetailDto } from 'testing/adapters/operators/queries/transactions/__mocks__/expectTransactionDetailDto'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { getMockResourceData } from 'testing/test-utils/getMockResourceData'
import { useAppContext } from 'x-core-modules/builder/appBuilder'

jest.mock('x-core-modules/builder/appBuilder', () => ({
	...jest.requireActual('x-core-modules/builder/appBuilder'),
	useAppContext: jest.fn(),
}))
jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useSearchParams: jest.fn(),
	useParams: jest.fn(),
}))

const mockUseParams = useParams as jest.Mock
const mockUseSearchParams = useSearchParams as jest.Mock
const testVariables = {
	id: '64bc0071-459f-47b1-8daa-c13f53be0028',
	type: 'BILL_PAYMENT',
}
const mockUseAppContext = useAppContext as jest.Mock
const mockGetResourceData = jest.fn()

describe('TransactionsInformationContainer : Container Configuration', () => {
	beforeEach(() => {
		mockGetResourceData.mockImplementation(getMockResourceData)
		mockUseParams.mockReturnValue({
			id: testVariables['id'],
		})
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(testVariables['type']),
		})
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Should render successfully', () => {
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
					query: jest.fn().mockImplementation(() => {
						return {
							data: expectTransactionDetailDto,
							error: undefined,
							mutate: jest.fn(),
						}
					}),
				},
			}),
		)
		const { baseElement, unmount } = render(
			<TransactionsInformationContainer />,
		)
		expect(baseElement).toMatchSnapshot()
		unmount()
	})
})
