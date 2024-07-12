import { ModelMasterConfig } from 'adapters/operators/models'
import { IPagination } from 'components/common/Pagination'
import { useCallback, useMemo } from 'react'
import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { IGetMasterConfigChannelRequest } from 'shared/adapters/interfaces/masterConfig/queries'
import { SortDirection } from 'shared/adapters/interfaces/transactions/queries'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'
import {
	useMasterConfigFormHandle,
	useMasterConfigRequest,
} from '../shared/controller'
import { IFormMasterSearch, InputType } from '../shared/interface'
import { FIELD_OPTIONS_MASTER_CHANNEL } from './constants'
import { mapMasterConfigChannel } from './dto'
import { IChannel } from './interface'

const initRequest = {
	pageSize: 30,
	pageNumber: 1,
	sortBy: SortDirection.ASC,
	orderBy: 'channelCode',
}

export const useProcessingFlowMasterChannelController = (
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
		ModelMasterConfig.MasterConfigChannel,
		IGetMasterConfigChannelRequest
	>({
		adapter,
		queryKey: 'getMasterConfigChannel',
		openCommonDialog,
		closeCommonDialog,
		initRequest,
		transformData: mapMasterConfigChannel,
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
								[field.value]:
									field.type === InputType.TEXT ? value.trim() : value,
							}
						: undefined,
			})
		},
		[triggerInquiry],
	)

	const handleOnCreate = useCallback(() => {}, [])

	const handleOnEdit = useCallback((_channel: IChannel) => {}, [])

	const handleOnDuplicate = useCallback((_channel: IChannel) => {}, [])

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
