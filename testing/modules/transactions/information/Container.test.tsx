import { act, fireEvent, render } from '@testing-library/react'
import { ErrorType } from 'adapters/error'
import Container from 'modules/transactions/information/Container'
import { TransactionTabEnum } from 'modules/transactions/information/constant'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { getMockResourceData } from 'testing/test-utils/getMockResourceData'
import { useAppContext } from 'x-core-modules/builder'
import { mockAdditional, mockDetail, mockInformation } from './dto.test'

jest.mock('x-core-modules/builder', () => ({
	...jest.requireActual('x-core-modules/builder'),
	useAppContext: jest.fn(),
	contextBuilder: jest.fn(),
}))

const mockUseAppContext = useAppContext as jest.Mock
const mockGetResourceData = jest.fn()

describe('Transaction information : Container', () => {
	beforeEach(() => {
		mockGetResourceData.mockImplementation(getMockResourceData)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Should render successfully (TransactionTab DETAILS table)', () => {
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
		const mockTransaction = {
			information: mockInformation,
			details: mockDetail,
			additionalDetails: mockAdditional,
			histories: [],
		}
		const { baseElement } = render(
			<Container
				transaction={mockTransaction}
				errorCode={undefined}
				reloadDetail={jest.fn()}
				selectedTab={TransactionTabEnum.DETAILS}
				tabHandler={jest.fn()}
			/>,
		)
		expect(baseElement).toMatchSnapshot()
	})

	test('Should render successfully (TransactionTab ADDITIONAL_DETAILS table)', () => {
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
		const mockTransaction = {
			information: mockInformation,
			details: mockDetail,
			additionalDetails: mockAdditional,
			histories: [],
		}
		const { baseElement } = render(
			<Container
				transaction={mockTransaction}
				errorCode={undefined}
				reloadDetail={jest.fn()}
				selectedTab={TransactionTabEnum.ADDITIONAL_DETAILS}
				tabHandler={jest.fn()}
			/>,
		)
		expect(baseElement).toMatchSnapshot()
	})

	test('Should render successfully (TransactionTab DETAILS table)', () => {
		const mockTabHandler = jest.fn()
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
		const mockTransaction = {
			information: mockInformation,
			details: mockDetail,
			additionalDetails: mockAdditional,
			histories: [],
		}
		const { getByTestId } = render(
			<Container
				transaction={mockTransaction}
				errorCode={undefined}
				reloadDetail={jest.fn()}
				selectedTab={TransactionTabEnum.DETAILS}
				tabHandler={mockTabHandler}
			/>,
		)
		act(() => {
			fireEvent.click(getByTestId('additionalDetails-tab'))
		})
		expect(mockTabHandler).toHaveBeenCalledWith(
			TransactionTabEnum.ADDITIONAL_DETAILS,
		)
	})

	test('Should render as data not found', () => {
		const { getByTestId } = render(
			<Container
				transaction={undefined}
				errorCode={ErrorType.DATA_NOT_FOUND}
				reloadDetail={jest.fn()}
				selectedTab={TransactionTabEnum.DETAILS}
				tabHandler={jest.fn()}
			/>,
		)
		expect(getByTestId('data-source-not-found-div')).toBeInTheDocument()
	})

	test('Should render as something went wrong', () => {
		const reloadDetail = jest.fn()
		const { getByTestId } = render(
			<Container
				transaction={undefined}
				errorCode={ErrorType.SOMETHING_WENT_WRONG}
				reloadDetail={reloadDetail}
				selectedTab={TransactionTabEnum.DETAILS}
				tabHandler={jest.fn()}
			/>,
		)
		expect(getByTestId('error-somethingWentWrong-div')).toBeInTheDocument()
		act(() => {
			fireEvent.click(getByTestId('error-somethingWentWrong-button'))
		})
		expect(reloadDetail).toHaveBeenCalled()
	})
})
