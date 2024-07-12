import { waitFor } from '@testing-library/react'
import { ErrorType } from 'adapters/error'
import { ModelPagination } from 'adapters/operators/models'
import { DateTime } from 'luxon'
import {
	BILL_PAYMENT_LIST,
	EmptyTextTransaction,
} from 'modules/transactions/inquiry/constant'
import { useTransactionsInquiryController } from 'modules/transactions/inquiry/controller'
import { act } from 'react-dom/test-utils'
import { useForm } from 'react-hook-form'
import { SortDirection } from 'shared/adapters/interfaces/transactions/queries'
import {
	buildMockUseAppContext,
	mockOpenCommonDialog,
} from 'testing/test-utils/buildMockUseAppContext'
import { renderHookClearSwrCache } from 'testing/test-utils/renderHookClearSwrCache'
import { EnumSortBy } from 'types/base'
import { useAppContext } from 'x-core-modules/builder/appBuilder'
import { expectTransactionResult, mockTransaction } from './dto.test'

jest.mock('x-core-modules/builder/appBuilder', () => ({
	...jest.requireActual('x-core-modules/builder/appBuilder'),
	useAppContext: jest.fn(),
}))
jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	useForm: jest.fn(),
}))

const mockUseAppContext = useAppContext as jest.Mock
const mockUseForm = useForm as jest.Mock
const mockReset = jest.fn()
const mockGetValues = jest.fn()
const mockWatch = jest.fn().mockImplementation(() => {
	return ''
})
export const mockOptions = {
	externalClearingSystemOptions: [
		{ id: 'ACELEDA', label: 'ACELEDA', value: 'ACELEDA' },
		{ id: 'ARTA', label: 'ARTA', value: 'ARTA' },
		{ id: 'NAPAS', label: 'NAPAS', value: 'NAPAS' },
		{ id: 'PAYNET', label: 'PAYNET', value: 'PAYNET' },
	],
	flagOptions: [
		{ id: 'flag-true', label: 'TRUE', value: true },
		{ id: 'flag-false', label: 'FALSE', value: false },
	],
	kymOptions: [
		{ id: 'kym-true', label: 'TRUE', value: true },
		{ id: 'kym-false', label: 'FALSE', value: false },
	],
	onUsFlagOptions: [
		{ id: 'onus', label: 'Onus', value: true },
		{ id: 'offus', label: 'Offus', value: false },
	],
	outboundInboundOptions: [
		{ id: 'inbound', label: 'Inbound', value: 'Inbound' },
		{ id: 'outbound', label: 'outbound', value: 'Outbound' },
	],
	serviceOptions: [
		{ id: 'allBillPayment', label: 'All Bill Payment', value: null },
	],
}
const mockForm = {
	control: {},
	handleSubmit: (func) => {
		return func
	},
	reset: mockReset,
	getValues: mockGetValues,
	watch: mockWatch,
}
const mockPagination = {
	page: 1,
	rowsPerPage: 50,
	totalPages: 1,
	totalRows: 0,
}

let originalCreateObjectURL
let originalRevokeObjectURL

describe('Transactions inquiry : controller', () => {
	beforeEach(() => {
		mockUseForm.mockReturnValue(mockForm)
		originalCreateObjectURL = global.URL.createObjectURL
		originalRevokeObjectURL = global.URL.revokeObjectURL
		global.URL.createObjectURL = jest.fn()
		global.URL.revokeObjectURL = jest.fn()
	})

	afterEach(() => {
		global.URL.createObjectURL = originalCreateObjectURL
		global.URL.revokeObjectURL = originalRevokeObjectURL
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should return initial states correctly', async () => {
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: undefined,
						trigger: jest.fn(),
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		expect(result.current.resetFormHandler).toBeTruthy()
		expect(result.current.isSearched).toEqual(false)
		expect(result.current.isIdleQuery).toEqual(true)
		expect(result.current.isMutatingTransactions).toEqual(false)
		expect(result.current.control).toBeTruthy()
		expect(result.current.targetRef).toEqual({ current: null })
		expect(result.current.isAdvanceSearch).toEqual(false)
		expect(result.current.errorInquiry).toBeUndefined()
		expect(result.current.table).toEqual({
			data: [],
			onSortDataTable: expect.anything(),
			orderBy: 'creationDateTime',
			paginationProps: {
				id: 'transactions-pagination',
				onPageChange: expect.anything(),
				onRowsPerPageChange: expect.anything(),
				...mockPagination,
			},
			sortBy: EnumSortBy.desc,
		})
		expect(result.current.options).toEqual(mockOptions)
		expect(result.current.handleOnDownloadTransaction).toBeTruthy()
		expect(result.current.handleOnClickAdvanceSearch).toBeTruthy()
		expect(result.current.onSearch).toBeTruthy()
		expect(result.current.isEnabledSearch).toEqual(false)
	})

	test('Should able to change isAdvanceSearch', async () => {
		// mock state
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: undefined,
						trigger: jest.fn(),
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		expect(result.current.isAdvanceSearch).toEqual(false)
		act(() => {
			result.current.handleOnClickAdvanceSearch()
		})
		expect(result.current.isAdvanceSearch).toEqual(true)
	})

	test('Should return transaction search result correctly', async () => {
		// mock state
		const mockInquiry = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: { data: [mockTransaction] },
						error: undefined,
						trigger: mockInquiry,
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		await act(async () => {
			await result.current.onSearch()
		})
		await waitFor(() => {
			expect(mockInquiry).toHaveBeenCalledWith({
				pageNumber: mockPagination.page,
				pageSize: mockPagination.rowsPerPage,
				sortBy: SortDirection.DESC,
			})
		})
		await waitFor(() => {
			expect(result.current.table.data).toEqual([expectTransactionResult])
		})
		// change row per page
		act(() => {
			result.current.table.paginationProps.onRowsPerPageChange({
				target: { value: 10 },
			})
		})
		await waitFor(() => {
			expect(mockInquiry).toHaveBeenCalledWith({
				pageNumber: 1,
				pageSize: 10,
				sortBy: SortDirection.DESC,
			})
		})
		// change page
		act(() => {
			result.current.table.paginationProps.onPageChange(undefined, 2)
		})
		await waitFor(() => {
			expect(mockInquiry).toHaveBeenCalledWith({
				pageNumber: 2,
				pageSize: 10,
				sortBy: SortDirection.DESC,
			})
		})
		// sorting
		act(() => {
			result.current.table.onSortDataTable('transactionId', EnumSortBy.desc)
		})
		await waitFor(() => {
			expect(result.current.table.orderBy).toEqual('transactionId')
			expect(result.current.table.sortBy).toEqual(EnumSortBy.asc)
		})
		act(() => {
			result.current.table.onSortDataTable('transactionId', EnumSortBy.asc)
		})
		await waitFor(() => {
			expect(result.current.table.orderBy).toEqual('transactionId')
			expect(result.current.table.sortBy).toEqual(EnumSortBy.desc)
		})
		// reset
		act(() => {
			result.current.resetFormHandler()
		})
		await waitFor(() => {
			expect(mockReset).toHaveBeenCalled()
		})
	})

	test('Should return empty text correctly [DATA_NOT_FOUND]', async () => {
		const mockInquiry = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: ModelPagination.Pagination.empty(ErrorType.DATA_NOT_FOUND),
						error: undefined,
						trigger: mockInquiry,
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		await act(async () => {
			await result.current.onSearch()
		})
		await waitFor(() => {
			expect(result.current.emptyText).toEqual(EmptyTextTransaction.DEFAULT)
		})
	})

	test('Should return empty text correctly [DATA_NOT_FOUND_IN_WHITELIST]', async () => {
		mockGetValues.mockReturnValue({
			creditPartyAccount: '123',
			service: { value: BILL_PAYMENT_LIST[0] },
		})
		mockUseForm.mockReturnValue({
			...mockForm,
			getValues: mockGetValues,
		})
		const mockInquiry = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: ModelPagination.Pagination.empty(
							ErrorType.DATA_NOT_FOUND_IN_WHITELIST,
						),
						error: undefined,
						trigger: mockInquiry,
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		await act(async () => {
			await result.current.onSearch()
		})
		await waitFor(() => {
			expect(result.current.emptyText).toEqual(EmptyTextTransaction.WHITELIST)
		})
	})

	test('Should return empty text correctly [DATA_NOT_FOUND_NOT_IN_WHITELIST]', async () => {
		mockGetValues.mockReturnValue({
			creditPartyAccount: '123',
			service: { value: BILL_PAYMENT_LIST[0] },
		})
		mockUseForm.mockReturnValue({
			...mockForm,
			getValues: mockGetValues,
		})
		const mockInquiry = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: ModelPagination.Pagination.empty(
							ErrorType.DATA_NOT_FOUND_NOT_IN_WHITELIST,
						),
						error: undefined,
						trigger: mockInquiry,
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		await act(async () => {
			await result.current.onSearch()
		})
		await waitFor(() => {
			expect(result.current.emptyText).toEqual(
				EmptyTextTransaction.NOT_WHITELIST,
			)
		})
	})

	test('Should return empty text correctly [GENERIC]', async () => {
		mockGetValues.mockReturnValue({
			creditPartyAccount: '123',
			service: { value: `NOT_${BILL_PAYMENT_LIST[0]}` },
		})
		mockUseForm.mockReturnValue({
			...mockForm,
			getValues: mockGetValues,
		})
		const mockInquiry = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: ModelPagination.Pagination.empty(ErrorType.DATA_NOT_FOUND),
						error: undefined,
						trigger: mockInquiry,
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		await act(async () => {
			await result.current.onSearch()
		})
		await waitFor(() => {
			expect(result.current.emptyText).toEqual(EmptyTextTransaction.GENERIC)
		})
	})

	test('Should able to download transaction', async () => {
		mockGetValues.mockReturnValue({ instructionId: '123' })
		mockUseForm.mockReturnValue({
			...mockForm,
			getValues: mockGetValues,
		})
		const mockDownloadInquiry = jest.fn()
		// mock state
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: undefined,
						trigger: mockDownloadInquiry,
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		act(() => {
			result.current.handleOnDownloadTransaction()
		})
		await waitFor(() => {
			expect(mockDownloadInquiry).toHaveBeenCalledWith({
				sortBy: SortDirection.DESC,
			})
		})
	})

	test('Should open error dialog if download transaction fail', async () => {
		// mock state
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ option }) => {
					return {
						data: undefined,
						error: undefined,
						trigger: () => option.onError(),
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		act(() => {
			result.current.handleOnDownloadTransaction()
		})
		await waitFor(() => {
			expect(mockOpenCommonDialog).toHaveBeenCalled()
		})
	})

	test('Should open error dialog if export excel fail', async () => {
		global.URL.createObjectURL = jest.fn().mockImplementation(() => {
			throw new Error()
		})
		// mock state
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ option }) => {
					return {
						data: undefined,
						error: undefined,
						trigger: () => option.onSuccess({ file: '', name: 'test' }),
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		act(() => {
			result.current.handleOnDownloadTransaction()
		})
		await waitFor(() => {
			expect(mockOpenCommonDialog).toHaveBeenCalled()
		})
	})

	test('Should return isEnabledSearch as true if full search', async () => {
		mockUseForm.mockReturnValue({
			...mockForm,
			watch: jest.fn().mockImplementation((field: string) => {
				if (field === 'instructionId') return '123'
				return ''
			}),
		})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: undefined,
						trigger: jest.fn(),
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		await waitFor(() => {
			expect(result.current.isEnabledSearch).toEqual(true)
		})
	})

	test('Should return isEnabledSearch as false if input date', async () => {
		mockUseForm.mockReturnValue({
			...mockForm,
			watch: jest.fn().mockImplementation((field: string) => {
				if (field === 'transactionDateFrom' || field === 'transactionDateTo')
					return DateTime.now()
				return ''
			}),
		})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: undefined,
						trigger: jest.fn(),
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		await waitFor(() => {
			expect(result.current.isEnabledSearch).toEqual(false)
		})
	})

	test('Should return isEnabledSearch as true if input date with at least mandatory', async () => {
		mockUseForm.mockReturnValue({
			...mockForm,
			watch: jest.fn().mockImplementation((field: string) => {
				if (field === 'transactionDateFrom' || field === 'transactionDateTo')
					return DateTime.now()
				if (field === 'creditPartyAccount') return '123'
				return ''
			}),
		})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: undefined,
						trigger: jest.fn(),
						isMutating: false,
					}
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		await waitFor(() => {
			expect(result.current.isEnabledSearch).toEqual(true)
		})
	})

	test('Should ordering on trigger sort function ', () => {
		mockUseAppContext.mockReturnValue(buildMockUseAppContext())
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return {
						data: undefined,
						error: undefined,
						trigger: jest.fn(),
						isMutating: false,
					}
				}),
			},
		})

		const { result } = renderHookClearSwrCache(() =>
			useTransactionsInquiryController(mockAppContext),
		)
		// expect
		act(() => {
			result.current.table.onSortDataTable('createDatedTime', EnumSortBy.desc)
		})

		expect(result.current.table.orderBy).toBe('createDatedTime')
		expect(result.current.table.sortBy).toBe(EnumSortBy.asc)
	})
})
