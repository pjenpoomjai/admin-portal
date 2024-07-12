import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorType, Message } from 'adapters/error'
import { ModelPagination, ModelTransactions } from 'adapters/operators/models'
import { IPagination } from 'components/common/Pagination'
import { defaultTo, get, isEmpty, isNil } from 'lodash'
import { DateTime } from 'luxon'
import { IAppContextProps } from 'shared/appContext/interfaces'
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { useForm } from 'react-hook-form'
import {
	EndpointKey,
	IHeader,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import {
	ITransactionsDownloadRequest,
	ITransactionsInquiryRequest,
} from 'shared/adapters/interfaces/transactions/queries'
import { CommonDialogType, defaultDialogExecutors } from 'src/builders'
import { EnumSortBy } from 'types/base'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'
import {
	BILL_PAYMENT_LIST,
	DEFAULT_VALUES,
	EmptyTextTransaction,
	SERVICE_CONSTANT,
} from './constant'
import { mapTransactions, transformStateToRequestPayload } from './dto'
import { IFormData, IOption, IUseTransactionsDataTable } from './interface'
import { validateSchema } from './validate'
const LIMIT_NUMBER = 1000
const useFormHandle = () => {
	const { control, handleSubmit, reset, getValues, watch, trigger, setValue } =
		useForm<IFormData>({
			defaultValues: DEFAULT_VALUES,
			resolver: yupResolver<any>(validateSchema()),
			reValidateMode: 'onChange',
			mode: 'all',
		})

	const instructionId = watch('instructionId')
	const instructionReference = watch('instructionReference')
	const transactionEndToEndId = watch('transactionEndToEndId')
	const transactionReference = watch('transactionReference')

	const transactionDateFrom = watch('transactionDateFrom')
	const transactionDateTo = watch('transactionDateTo')
	const amountFrom = watch('amountFrom')
	const amountTo = watch('amountTo')
	const debitPartyAccount = watch('debitPartyAccount')
	const creditPartyAccount = watch('creditPartyAccount')

	const isFullSearch = useMemo(() => {
		return [
			instructionId,
			instructionReference,
			transactionEndToEndId,
			transactionReference,
		].some((value) => !isEmpty(value))
	}, [
		instructionId,
		instructionReference,
		transactionEndToEndId,
		transactionReference,
	])

	const isInputDate = useMemo(() => {
		return (
			!isEmpty(transactionDateFrom) &&
			transactionDateFrom.isValid &&
			!isEmpty(transactionDateTo) &&
			transactionDateTo.isValid
		)
	}, [transactionDateFrom, transactionDateTo])

	const isAtLeastMandatory = useMemo(() => {
		return [amountFrom, amountTo, debitPartyAccount, creditPartyAccount].some(
			(value) => !isEmpty(value),
		)
	}, [amountFrom, amountTo, creditPartyAccount, debitPartyAccount])

	const isNotFullSearch = useMemo(() => {
		return isInputDate && isAtLeastMandatory
	}, [isAtLeastMandatory, isInputDate])

	const onChangeValidate = useCallback(
		(name: keyof IFormData, value: any) => {
			setValue(name, value)
			trigger()
		},
		[setValue, trigger],
	)

	return {
		control,
		handleSubmit,
		reset,
		getValues,
		onChangeValidate,
		isFullSearch,
		isNotFullSearch,
	}
}

const useResourceHandler = (props: IAppContextProps) => {
	const { getContextConsumer, getProviderConsumer } = props
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const adapter = useAdapterQuerySelector()
	const { useOpenCommonDialogSelector, useCloseCommonDialogSelector } =
		getContextConsumer<any>('commonDialog')
	const openCommonDialog = useOpenCommonDialogSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()
	const [isFromSearch, setIsFromSearch] = useState(false)
	const [queryState, setQueryState] =
		useState<ITransactionsInquiryRequest | null>(null)
	const {
		data: response,
		trigger: triggerTransactions,
		isMutating: isMutatingTransactions,
		error: errorTransactions,
	} = adapter.lazyQuery<
		IQueryProvider,
		QueryKey.transactions,
		ModelPagination.Pagination<ModelTransactions.Transaction>
	>({
		queryKey: QueryKey.transactions,
		queryFunc: async (query, arg: ITransactionsInquiryRequest) => {
			return query.inquiry(arg)
		},
		option: {
			onSuccess: (data) => {
				if (get(data, 'total', 0) > LIMIT_NUMBER && isFromSearch) {
					setIsFromSearch(false)
					openCommonDialog(
						defaultDialogExecutors(CommonDialogType.WARNING, {
							title: 'Showing up to 1,000 records',
							desc: 'Refine your search for more specific results.',
							primaryButtonOnClick: () => {
								closeCommonDialog()
							},
						}),
					)
				}
			},
			onError: (error: Message) => {
				openCommonDialog(
					defaultDialogExecutors(
						CommonDialogType.SOMETHING_WENT_WRONG,
						{
							primaryButtonOnClick: () => {
								closeCommonDialog()
							},
						},
						error.rawCode,
					),
				)
			},
		},
	})

	const errorInquiry = useMemo(() => {
		return errorTransactions?.code
	}, [errorTransactions?.code])

	const { trigger: triggerDownloadTransactions } = adapter.lazyQuery<
		IQueryProvider,
		QueryKey.transactions
	>({
		queryKey: QueryKey.transactions,
		queryFunc: async (query, arg: ITransactionsDownloadRequest) => {
			return query.downloadInquiry(arg)
		},
		option: {
			onSuccess: (data) => {
				try {
					const blob = new Blob([data.file], { type: 'text/csv' })
					const defaultName = `${DateTime.now().toFormat(
						'yyyy-MM-dd_HH-mm-ss',
					)}_Transaction.csv`
					const url = window.URL.createObjectURL(blob)
					const a = document.createElement('a')
					a.href = url
					a.download = data.name ? data.name : defaultName
					document.body.appendChild(a)
					a.click()
					document.body.removeChild(a)
					window.URL.revokeObjectURL(url)
				} catch {
					openCommonDialog(
						defaultDialogExecutors(CommonDialogType.SOMETHING_WENT_WRONG, {
							primaryButtonOnClick: () => {
								closeCommonDialog()
							},
						}),
					)
				}
			},
			onError: (error: Message) => {
				openCommonDialog(
					defaultDialogExecutors(
						CommonDialogType.SOMETHING_WENT_WRONG,
						{
							primaryButtonOnClick: () => {
								closeCommonDialog()
							},
						},
						error?.rawCode,
					),
				)
			},
		},
	})

	const isIdleQuery = useMemo(() => {
		return isNil(queryState)
	}, [queryState])

	const serviceOptions = useMemo((): IOption[] => {
		return [SERVICE_CONSTANT]
	}, [])

	const transactions = useMemo(() => {
		return mapTransactions(get(response, 'data', []))
	}, [response])

	const isSearchCriteriaWhiteList = useMemo(() => {
		if (isNil(queryState)) return false
		return queryState.creditPartyID || queryState.creditPartyAccount
	}, [queryState])

	const isBillPayment = useMemo(() => {
		if (isNil(queryState)) return false
		const isAllBillPayment = !queryState.service
		const isIncludeBillPaymentList = BILL_PAYMENT_LIST.includes(
			queryState.service,
		)
		return isAllBillPayment || isIncludeBillPaymentList
	}, [queryState])

	const emptyText = useMemo(() => {
		const emptyState = get(response, 'emptyState', [])
		if (!emptyState) {
			return undefined
		}
		if (
			isBillPayment &&
			isSearchCriteriaWhiteList &&
			emptyState === ErrorType.DATA_NOT_FOUND_NOT_IN_WHITELIST
		) {
			return EmptyTextTransaction.NOT_WHITELIST
		}
		if (
			isBillPayment &&
			isSearchCriteriaWhiteList &&
			emptyState === ErrorType.DATA_NOT_FOUND_IN_WHITELIST
		) {
			return EmptyTextTransaction.WHITELIST
		}
		if (isBillPayment && !isSearchCriteriaWhiteList) {
			return EmptyTextTransaction.DEFAULT
		}
		return EmptyTextTransaction.GENERIC
	}, [isBillPayment, isSearchCriteriaWhiteList, response])

	const isSearched = useMemo(() => {
		return Boolean(response)
	}, [response])

	const onUsFlagOptions = useMemo((): IOption<boolean>[] => {
		return [
			{ id: 'onus', label: 'Onus', value: true },
			{ id: 'offus', label: 'Offus', value: false },
		]
	}, [])

	const kymOptions = useMemo((): IOption<boolean>[] => {
		return [
			{ id: 'kym-true', label: 'TRUE', value: true },
			{ id: 'kym-false', label: 'FALSE', value: false },
		]
	}, [])

	const flagOptions = useMemo((): IOption<boolean>[] => {
		return [
			{ id: 'flag-true', label: 'TRUE', value: true },
			{ id: 'flag-false', label: 'FALSE', value: false },
		]
	}, [])

	const externalClearingSystemOptions = useMemo((): IOption[] => {
		return [
			{ id: 'ACELEDA', label: 'ACELEDA', value: 'ACELEDA' },
			{ id: 'ARTA', label: 'ARTA', value: 'ARTA' },
			{ id: 'NAPAS', label: 'NAPAS', value: 'NAPAS' },
			{ id: 'PAYNET', label: 'PAYNET', value: 'PAYNET' },
		]
	}, [])

	const outboundInboundOptions = useMemo((): IOption[] => {
		return [
			{ id: 'inbound', label: 'Inbound', value: 'Inbound' },
			{ id: 'outbound', label: 'outbound', value: 'Outbound' },
		]
	}, [])

	const paginationResponse = useMemo(() => {
		const total = get(response, 'total', 0)
		const totalPages =
			get(response, 'total', 0) > LIMIT_NUMBER ? LIMIT_NUMBER : total
		return {
			totalRows: totalPages,
			totalPages: Math.ceil(totalPages / get(response, 'rowsPerPage', 0)) || 1,
		}
	}, [response])

	return {
		isSearched,
		isIdleQuery,
		isMutatingTransactions,
		queryState: [queryState, setQueryState],
		paginationResponse,
		transactions,
		errorInquiry,
		emptyText,
		triggerDownloadTransactions,
		triggerTransactions,
		setIsFromSearch,
		options: {
			flagOptions,
			serviceOptions,
			onUsFlagOptions,
			kymOptions,
			externalClearingSystemOptions,
			outboundInboundOptions,
		},
	}
}

const DEFAULT_SORT = {
	orderBy: 'creationDateTime',
	sortBy: EnumSortBy.desc,
}

const useTransactionsDataTable = (props: IUseTransactionsDataTable) => {
	const { paginationResponse } = props
	const [sortTable, setSortTable] = useState(DEFAULT_SORT)
	const [pagination, setPagination] = useState({
		rowsPerPage: 50,
		page: 1,
	})

	const totalRows = useMemo(() => {
		return paginationResponse.totalRows || 0
	}, [paginationResponse])

	const totalPage = useMemo(() => {
		return paginationResponse.totalPages
	}, [paginationResponse])

	const onSortDataTable = useCallback((key: string, direction: EnumSortBy) => {
		setSortTable({
			orderBy: key,
			sortBy: direction === EnumSortBy.asc ? EnumSortBy.desc : EnumSortBy.asc,
		})
	}, [])

	const paginationProps = useMemo(() => {
		return {
			id: 'transactions-pagination',
			totalRows: totalRows,
			rowsPerPage: pagination.rowsPerPage,
			totalPages: totalPage,
			page: pagination.page,
		} as IPagination
	}, [pagination.page, pagination.rowsPerPage, totalPage, totalRows])

	return {
		setSortTable,
		setPagination,
		onSortDataTable,
		sortBy: sortTable.sortBy,
		orderBy: sortTable.orderBy,
		paginationProps,
	}
}

export const useTransactionsInquiryController = (props: IAppContextProps) => {
	const targetRef = useRef(null)
	const [isAdvanceSearch, setIsAdvanceSearch] = useState(false)
	const {
		control,
		handleSubmit,
		reset,
		getValues,
		onChangeValidate,
		isFullSearch,
		isNotFullSearch,
	} = useFormHandle()
	const [formSubmitState, setFormSubmitState] = useState(null)
	const {
		isSearched,
		isIdleQuery,
		isMutatingTransactions,
		errorInquiry,
		emptyText,
		triggerDownloadTransactions,
		triggerTransactions,
		paginationResponse,
		transactions: transactionsData,
		options,
		queryState: queryStateResource,
		setIsFromSearch,
	} = useResourceHandler(props)
	const [queryState, setQueryState] = queryStateResource as [
		ITransactionsInquiryRequest,
		Dispatch<SetStateAction<ITransactionsInquiryRequest>>,
	]
	const {
		onSortDataTable,
		sortBy,
		orderBy,
		paginationProps: paginationState,
		setPagination,
		setSortTable,
	} = useTransactionsDataTable({ paginationResponse })

	const handleOnClickAdvanceSearch = useCallback(() => {
		setIsAdvanceSearch((prev) => !prev)
	}, [])

	const handleOnSorting = useCallback(
		(key: string, direction: EnumSortBy) => {
			const values = getValues()
			const { rowsPerPage } = paginationState
			onSortDataTable(key, direction)
			setPagination((prevState) => ({
				...prevState,
				page: 1,
			}))
			const sortPayload = {
				key,
				direction:
					direction === EnumSortBy.asc ? EnumSortBy.desc : EnumSortBy.asc,
			}
			const payload = transformStateToRequestPayload(
				values,
				1,
				rowsPerPage,
				sortPayload,
			)
			setQueryState(payload)
		},
		[onSortDataTable, setQueryState, getValues, paginationState, setPagination],
	)

	const handleOnSearch = useCallback(async () => {
		const values = getValues()
		setFormSubmitState(values)
		const { rowsPerPage } = paginationState
		setIsFromSearch(true)
		const sortPayload: any = {
			key: orderBy,
			direction: sortBy,
		}
		const payload = transformStateToRequestPayload(
			values,
			1,
			rowsPerPage,
			sortPayload,
		)
		setQueryState(payload)
		setPagination((prevState) => ({
			...prevState,
			page: 1,
		}))
		if (targetRef.current) {
			targetRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [
		setFormSubmitState,
		getValues,
		paginationState,
		setIsFromSearch,
		orderBy,
		sortBy,
		setQueryState,
		setPagination,
	])

	const handleOnDownloadTransaction = useCallback(async () => {
		const values = formSubmitState
		const sortPayload: any = {
			key: orderBy,
			direction: sortBy,
		}
		const {
			pageNumber: _pageNumber,
			pageSize: _pageSize,
			...payload
		} = transformStateToRequestPayload(values, 0, 0, sortPayload)
		await triggerDownloadTransactions(payload as ITransactionsDownloadRequest)
	}, [getValues, orderBy, sortBy, triggerDownloadTransactions, formSubmitState])

	const onPageChange = useCallback(
		(_: any, p: any) => {
			setPagination((prevState) => ({
				...prevState,
				page: Number(p),
			}))
			setQueryState(
				(prevQueryState: ITransactionsInquiryRequest) =>
					({
						...defaultTo(prevQueryState, {}),
						pageNumber: Number(p),
					}) as ITransactionsInquiryRequest,
			)
		},
		[setPagination, setQueryState],
	)

	const onRowsPerPageChange = useCallback(
		(event: any) => {
			setPagination((prevState) => ({
				...prevState,
				page: 1,
				rowsPerPage: Number(event.target.value),
			}))
			setQueryState(
				(prevQueryState: ITransactionsInquiryRequest) =>
					({
						...defaultTo(prevQueryState, {}),
						pageNumber: 1,
						pageSize: Number(event.target.value),
					}) as ITransactionsInquiryRequest,
			)
		},
		[setPagination, setQueryState],
	)

	const paginationProps = useMemo(() => {
		return {
			...paginationState,
			onRowsPerPageChange,
			onPageChange,
		}
	}, [paginationState, onPageChange, onRowsPerPageChange])

	useEffect(() => {
		if (!isNil(queryState)) {
			triggerTransactions(queryState)
		}
	}, [queryState, triggerTransactions])

	const resetFormHandler = useCallback(() => {
		setQueryState(null)
		setSortTable(DEFAULT_SORT)
		reset(DEFAULT_VALUES, {
			keepDefaultValues: false,
			keepDirty: false,
			keepDirtyValues: false,
			keepErrors: false,
		})
	}, [setQueryState, reset, setSortTable])

	const isEnabledSearch = useMemo(() => {
		if (isFullSearch) return true
		return isNotFullSearch
	}, [isFullSearch, isNotFullSearch])

	return {
		resetFormHandler,
		onChangeValidate,
		isSearched,
		isIdleQuery,
		isMutatingTransactions,
		control,
		targetRef,
		isAdvanceSearch,
		errorInquiry,
		emptyText,
		table: {
			data: transactionsData,
			onSortDataTable: handleOnSorting,
			sortBy,
			orderBy,
			paginationProps,
		},
		options,
		isEnabledSearch,
		handleOnDownloadTransaction,
		handleOnClickAdvanceSearch,
		onSearch: handleSubmit(handleOnSearch),
	}
}
