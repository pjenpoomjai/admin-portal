import { render } from '@testing-library/react'
import { DateTime } from 'luxon'
import TransactionAdditionalDetails from 'modules/transactions/information/views/TransactionAdditionalDetails/TransactionAdditionalDetails'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { getMockResourceData } from 'testing/test-utils/getMockResourceData'
import { useAppContext } from 'x-core-modules/builder'

jest.mock('x-core-modules/builder', () => ({ useAppContext: jest.fn() }))

const mockUseAppContext = useAppContext as jest.Mock
const mockGetResourceData = jest.fn()

describe('TransactionAdditionalDetails : View', () => {
	beforeEach(() => {
		mockGetResourceData.mockImplementation(getMockResourceData)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Should render successfully with custom text for invalid value', () => {
		mockUseAppContext.mockReturnValue(
			buildMockUseAppContext({
				overrideContextConsumer: {
					resources: () => ({
						useGetResourceModelSelector: () => ({
							getResourceData: mockGetResourceData,
						}),
					}),
				},
			}),
		)
		const { baseElement } = render(
			<TransactionAdditionalDetails
				additionalDetails={
					{
						information: {
							creationDateTime: DateTime.fromISO(''),
							dueDate: DateTime.fromISO(''),
							expiryDateTime: DateTime.fromISO(''),
							onUs: null,
							postedDateTime: DateTime.fromISO(''),
						},
						payer: {},
						payee: {},
					} as any
				}
			/>,
		)
		expect(baseElement).toMatchSnapshot()
	})
})
