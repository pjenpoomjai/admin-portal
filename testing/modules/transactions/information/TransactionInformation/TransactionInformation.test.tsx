import { render } from '@testing-library/react'
import { DateTime } from 'luxon'
import TransactionInformation from 'modules/transactions/information/views/TransactionInformation/TransactionInformation'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { getMockResourceData } from 'testing/test-utils/getMockResourceData'
import { useAppContext } from 'x-core-modules/builder'

jest.mock('x-core-modules/builder', () => ({ useAppContext: jest.fn() }))

const mockUseAppContext = useAppContext as jest.Mock
const mockGetResourceData = jest.fn()

describe('TransactionInformation : View', () => {
	beforeEach(() => {
		mockGetResourceData.mockImplementation(getMockResourceData)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Should render successfully with custom text for linkedTransaction', () => {
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
			<TransactionInformation
				information={{
					activityDomain: '',
					amount: '',
					currencyCode: '',
					bank: '',
					classification: '',
					importance: '',
					incomingBankingEntity: '',
					instructionReference: '',
					iso20022Flag: false,
					latestSubmission: DateTime.fromISO(''),
					linkedTransaction: ['1234567890', '0987654321'],
					outgoingBankingEntity: '',
					service: '',
					servicerTransactionId: '',
					status: '',
					transactionDate: DateTime.fromISO(''),
					transactionEndToEndId: '',
					transactionId: '',
					transactionReference: '',
				}}
			/>,
		)
		expect(baseElement).toMatchSnapshot()
	})

	test('Should render successfully with custom text for iso20022Flag', () => {
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
			<TransactionInformation
				information={{
					activityDomain: '',
					amount: '',
					currencyCode: '',
					bank: '',
					classification: '',
					importance: '',
					incomingBankingEntity: '',
					instructionReference: '',
					iso20022Flag: null,
					latestSubmission: DateTime.fromISO(''),
					linkedTransaction: [],
					outgoingBankingEntity: '',
					service: '',
					servicerTransactionId: '',
					status: '',
					transactionDate: DateTime.fromISO(''),
					transactionEndToEndId: '',
					transactionId: '',
					transactionReference: '',
				}}
			/>,
		)
		expect(baseElement).toMatchSnapshot()
	})
})
