import { act, renderHook, waitFor } from '@testing-library/react'
import { ErrorType, Message } from 'adapters/error'
import { TransactionTabEnum } from 'modules/transactions/information/constant'
import { useTransactionsInformationController } from 'modules/transactions/information/controller'
import { useParams, useSearchParams } from 'next/navigation'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { renderHookClearSwrCache } from 'testing/test-utils/renderHookClearSwrCache'

jest.mock('x-core-modules/builder', () => ({ useAppContext: jest.fn() }))
jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useSearchParams: jest.fn(),
	useParams: jest.fn(),
}))

const mockUseParams = useParams as jest.Mock
const mockUseSearchParams = useSearchParams as jest.Mock
const mockGetDetail = jest.fn()
const testVariables = {
	id: '64bc0071-459f-47b1-8daa-c13f53be0028',
	type: 'BILL_PAYMENT',
}

describe('Transactions information : controller', () => {
	beforeEach(() => {
		mockUseParams.mockReturnValue({
			id: testVariables['id'],
		})
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(testVariables['type']),
		})
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should return initial states correctly', async () => {
		// mock state
		const mockQueryGetDetail = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				query: jest.fn().mockImplementation(({ queryFunc }) => {
					queryFunc({ getDetail: mockQueryGetDetail })
					return { data: undefined, error: undefined, mutate: jest.fn() }
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInformationController(mockAppContext),
		)
		// expect
		await waitFor(() => {
			expect(mockQueryGetDetail).toHaveBeenCalledWith({
				instructionType: testVariables['type'],
				requestId: testVariables['id'],
			})
		})

		expect(result.current.errorCode).toBeUndefined()
		expect(result.current.selectedTab).toEqual(TransactionTabEnum.DETAILS)
		expect(typeof result.current.reloadDetail).toEqual('function')
		expect(typeof result.current.tabHandler).toEqual('function')
	})

	test('Should able to change tab state', async () => {
		// mock state
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				query: jest.fn().mockImplementation(() => {
					return { data: undefined, error: undefined, mutate: jest.fn() }
				}),
			},
		})
		// hook
		const { result } = renderHook(() =>
			useTransactionsInformationController(mockAppContext),
		)
		// action
		expect(result.current.selectedTab).toEqual(TransactionTabEnum.DETAILS)
		// expect
		act(() => {
			result.current.tabHandler(TransactionTabEnum.ADDITIONAL_DETAILS)
		})
		await waitFor(() => {
			expect(result.current.selectedTab).toEqual(
				TransactionTabEnum.ADDITIONAL_DETAILS,
			)
		})
	})

	test('Should error state as data not found', async () => {
		// mock state
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				query: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: { code: ErrorType.DATA_NOT_FOUND },
						mutate: jest.fn(),
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInformationController(mockAppContext),
		)
		// expect
		await waitFor(() => {
			expect(result.current.errorCode).toEqual(ErrorType.DATA_NOT_FOUND)
		})
	})

	test('Should error state as something went wrong and able to reload', async () => {
		// mock state
		mockGetDetail.mockImplementation(() => {
			throw new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG)
		})
		const mockMutate = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				query: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: new Message(
							'something went wrong',
							ErrorType.SOMETHING_WENT_WRONG,
						),
						mutate: mockMutate,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInformationController(mockAppContext),
		)
		// expect
		await waitFor(() => {
			expect(result.current.errorCode).toEqual(ErrorType.SOMETHING_WENT_WRONG)
		})
		result.current.reloadDetail()
		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalledTimes(1)
		})
	})
})
