import { act, fireEvent, render } from '@testing-library/react'
import Container from 'modules/transactions/inquiry/Container'
import {
	DEFAULT_VALUES,
	EmptyTextTransaction,
} from 'modules/transactions/inquiry/constant'
import { IFormData } from 'modules/transactions/inquiry/interface'
import { useForm } from 'react-hook-form'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { getMockResourceData } from 'testing/test-utils/getMockResourceData'
import { EnumSortBy } from 'types/base'
import { useAppContext } from 'x-core-modules/builder'
import { mockOptions } from './controller.test'
import {
	expectTransactionResult,
	expectTransactionSomeFieldResult,
} from './dto.test'

jest.mock('x-core-modules/builder', () => ({
	...jest.requireActual('x-core-modules/builder'),
	useAppContext: jest.fn(),
}))

const mockUseAppContext = useAppContext as jest.Mock
const mockGetResourceData = jest.fn()

describe('Transaction information : Container', () => {
	beforeEach(() => {
		mockGetResourceData.mockImplementation(getMockResourceData)
	})

	afterEach(() => {
		jest.resetModules()
		jest.clearAllMocks()
	})

	test('Should render successfully (with transaction search result)', () => {
		const mockExport = jest.fn()
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
		const { baseElement, getByTestId, unmount } = render(<div></div>, {
			wrapper: () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { control } = useForm<IFormData>({
					defaultValues: DEFAULT_VALUES,
				})

				return (
					<Container
						control={control}
						errorInquiry={undefined}
						options={mockOptions}
						handleOnClickAdvanceSearch={jest.fn()}
						isAdvanceSearch={false}
						handleOnDownloadTransaction={mockExport}
						isIdleQuery={false}
						isMutatingTransactions={false}
						isSearched={true}
						onSearch={jest.fn()}
						resetFormHandler={jest.fn()}
						table={{
							data: [expectTransactionResult, expectTransactionSomeFieldResult],
							onSortDataTable: jest.fn(),
							orderBy: 'creationDateTime',
							sortBy: EnumSortBy.asc,
							paginationProps: {
								id: 'transactions-pagination',
								onPageChange: jest.fn(),
								onRowsPerPageChange: jest.fn(),
								page: 1,
								totalPages: 1,
								totalRows: 2,
							},
						}}
						targetRef={null}
						emptyText={undefined}
						isEnabledSearch={true}
						onChangeValidate={jest.fn()}
					/>
				)
			},
		})
		expect(baseElement).toMatchSnapshot()
		act(() => {
			fireEvent.click(getByTestId('export-result-button'))
		})
		expect(mockExport).toHaveBeenCalled()
		unmount()
	})

	test('Should render advance search form successfully', () => {
		const mockSearch = jest.fn()
		const mockReset = jest.fn()
		const mockClickAdvanceSearch = jest.fn()
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
		const { baseElement, getByTestId, unmount } = render(<></>, {
			wrapper: () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { control } = useForm<IFormData>({
					defaultValues: DEFAULT_VALUES,
				})

				return (
					<Container
						control={control}
						errorInquiry={undefined}
						options={mockOptions}
						handleOnClickAdvanceSearch={mockClickAdvanceSearch}
						isAdvanceSearch={true}
						handleOnDownloadTransaction={jest.fn()}
						isIdleQuery={true}
						isMutatingTransactions={true}
						isSearched={false}
						onSearch={mockSearch}
						resetFormHandler={mockReset}
						table={{
							data: [],
							onSortDataTable: jest.fn(),
							orderBy: 'creationDateTime',
							sortBy: EnumSortBy.asc,
							paginationProps: {
								id: 'transactions-pagination',
								onPageChange: jest.fn(),
								onRowsPerPageChange: jest.fn(),
								page: 1,
								totalPages: 1,
								totalRows: 1,
							},
						}}
						targetRef={null}
						emptyText={undefined}
						isEnabledSearch={true}
						onChangeValidate={jest.fn()}
					/>
				)
			},
		})
		act(() => {
			fireEvent.click(getByTestId('advance-search-expand-icon'))
		})
		expect(mockClickAdvanceSearch).toHaveBeenCalled()
		act(() => {
			fireEvent.click(getByTestId('search-transaction-button'))
		})
		expect(mockSearch).toHaveBeenCalled()
		act(() => {
			fireEvent.click(getByTestId('reset-transaction-button'))
		})
		expect(mockReset).toHaveBeenCalled()
		expect(baseElement).toMatchSnapshot()
		unmount()
	})

	test('Should render empty state successfully', () => {
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
		const { baseElement, getByTestId, unmount } = render(<></>, {
			wrapper: () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { control } = useForm<IFormData>({
					defaultValues: DEFAULT_VALUES,
				})

				return (
					<Container
						control={control}
						errorInquiry={undefined}
						options={mockOptions}
						handleOnClickAdvanceSearch={jest.fn()}
						isAdvanceSearch={false}
						handleOnDownloadTransaction={jest.fn()}
						isIdleQuery={false}
						isMutatingTransactions={false}
						isSearched={true}
						onSearch={jest.fn()}
						resetFormHandler={jest.fn()}
						table={{
							data: [],
							onSortDataTable: jest.fn(),
							orderBy: 'creationDateTime',
							sortBy: EnumSortBy.asc,
							paginationProps: {
								id: 'transactions-pagination',
								onPageChange: jest.fn(),
								onRowsPerPageChange: jest.fn(),
								page: 0,
								totalPages: 0,
								totalRows: 0,
							},
						}}
						targetRef={null}
						emptyText={EmptyTextTransaction.DEFAULT}
						isEnabledSearch={true}
						onChangeValidate={jest.fn()}
					/>
				)
			},
		})
		expect(baseElement).toMatchSnapshot()
		expect(getByTestId('no-result-found-typography')).toHaveTextContent(
			EmptyTextTransaction.DEFAULT,
		)
		unmount()
	})

	test('Should render successfully (with disable search)', () => {
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
		const { getByTestId, unmount } = render(<></>, {
			wrapper: () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { control } = useForm<IFormData>({
					defaultValues: DEFAULT_VALUES,
				})

				return (
					<Container
						control={control}
						errorInquiry={undefined}
						options={mockOptions}
						handleOnClickAdvanceSearch={jest.fn()}
						isAdvanceSearch={false}
						handleOnDownloadTransaction={jest.fn()}
						isIdleQuery={false}
						isMutatingTransactions={false}
						isSearched={true}
						onSearch={jest.fn()}
						resetFormHandler={jest.fn()}
						table={{
							data: [],
							onSortDataTable: jest.fn(),
							orderBy: 'creationDateTime',
							sortBy: EnumSortBy.asc,
							paginationProps: {
								id: 'transactions-pagination',
								onPageChange: jest.fn(),
								onRowsPerPageChange: jest.fn(),
								page: 0,
								totalPages: 0,
								totalRows: 0,
							},
						}}
						targetRef={null}
						emptyText={EmptyTextTransaction.DEFAULT}
						isEnabledSearch={false}
						onChangeValidate={jest.fn()}
					/>
				)
			},
		})
		expect(getByTestId('search-transaction-button')).toBeDisabled()
		unmount()
	})
})
