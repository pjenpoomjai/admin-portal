import { ModelMasterConfig } from 'adapters/operators/models'
import { IPagination } from 'components/common/Pagination'
import { useCallback, useMemo } from 'react'
import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { IGetMasterConfigTimeoutTypeRequest } from 'shared/adapters/interfaces/masterConfig/queries'
import { SortDirection } from 'shared/adapters/interfaces/transactions/queries'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'
import {
	useMasterConfigFormHandle,
	useMasterConfigRequest,
} from '../shared/controller'
import { IFormMasterSearch, IOption, InputType } from '../shared/interface'
import { FIELD_OPTIONS_MASTER_CHANNEL } from './constants'
import { mapMasterConfigTimeoutType } from './dto'
import { ITimeoutType } from './interface'

const initRequest = {
	pageSize: 30,
	pageNumber: 1,
	sortBy: SortDirection.ASC,
	orderBy: 'timeoutType',
}

export const useProcessingFlowMasterTimeoutTypeController = (
	props: IAppContextProps,
) => {
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

	const { searchQuery, handleSubmit, ...searchFormProps } =
		useMasterConfigFormHandle()

	const {
		isFirstLoadError,
		currentPagination,
		dataSource,
		triggerInquiry,
		loadData: refresh,
	} = useMasterConfigRequest<
		ModelMasterConfig.MasterConfigTimeoutType,
		IGetMasterConfigTimeoutTypeRequest
	>({
		adapter,
		queryKey: 'getMasterConfigTimeoutType',
		openCommonDialog,
		closeCommonDialog,
		initRequest,
		transformData: mapMasterConfigTimeoutType,
	})

	const onPageChange = useCallback(
		(_: any, page: number) => {
			triggerInquiry({
				...initRequest,
				pageSize: currentPagination.rowsPerPage,
				pageNumber: Number(page),
				search: searchQuery,
			})
		},
		[currentPagination.rowsPerPage, searchQuery, triggerInquiry],
	)

	const onRowsPerPageChange = useCallback(
		(event: any) => {
			triggerInquiry({
				...initRequest,
				pageSize: Number(event.target.value),
				pageNumber: 1,
				search: searchQuery,
			})
		},
		[searchQuery, triggerInquiry],
	)

	const paginationProps = useMemo((): Omit<IPagination, 'id'> => {
		return {
			onRowsPerPageChange,
			onPageChange,
			...currentPagination,
		}
	}, [onRowsPerPageChange, onPageChange, currentPagination])

	const transformValue = useCallback(
		(field: IOption<string>, value: string) => {
			if (field.type === InputType.TEXT) {
				return value.trim()
			}
			if (field.type === InputType.ACTIVE) {
				return value
			}
			return Number(value)
		},
		[],
	)

	const handleOnSearch = useCallback(
		async (values: IFormMasterSearch) => {
			const { field, value } = values
			triggerInquiry({
				...initRequest,
				pageSize: 30,
				pageNumber: 1,
				search:
					field.type !== InputType.ALL
						? {
								[field.value]: transformValue(field, value),
							}
						: undefined,
			})
		},
		[transformValue, triggerInquiry],
	)

	const handleOnCreate = useCallback(() => {}, [])

	const handleOnEdit = useCallback((_service: ITimeoutType) => {}, [])

	const handleOnDuplicate = useCallback((_service: ITimeoutType) => {}, [])

	return {
		searchForm: {
			...searchFormProps,
			options: FIELD_OPTIONS_MASTER_CHANNEL,
			onSearch: handleSubmit(handleOnSearch),
		},
		table: {
			data: dataSource,
			paginationProps,
		},
		isFirstLoadError,
		refresh,
		handleOnCreate,
		handleOnEdit,
		handleOnDuplicate,
	}
}