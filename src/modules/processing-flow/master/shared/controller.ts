import { Message } from 'adapters/error'
import { IDataPagination } from 'adapters/operators/models/pagination/interface'
import { Pagination } from 'adapters/operators/models/pagination/pagination'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IQueryProvider, QueryKey } from 'shared/adapters/interfaces'
import { defaultDialogExecutors } from 'src/builders/commonDialogBuilder/executors'
import { CommonDialogType } from 'src/builders/commonDialogBuilder/interface'
import { mapMasterConfigPage } from './dto'
import {
	IFormMasterSearch,
	IMasterUseRequest,
	IMasterUseRequestReturn,
	InputType,
} from './interface'

export const useMasterConfigFormHandle = () => {
	const { handleSubmit, watch, resetField, control } =
		useForm<IFormMasterSearch>({
			reValidateMode: 'onSubmit',
			mode: 'all',
		})
	const searchField = watch('field')
	const searchValue = watch('value')

	const isDisabledSearch = useMemo(() => {
		if (searchField?.type === InputType.ALL) {
			return false
		}
		return !searchField || !searchValue
	}, [searchField, searchValue])

	const searchQuery = useMemo(() => {
		if (searchField && searchValue) {
			return {
				[searchField.value]:
					searchField.type === InputType.TEXT
						? searchValue.trim()
						: searchValue,
			}
		}
		return undefined
	}, [searchField, searchValue])

	return {
		searchField,
		control,
		isDisabledSearch,
		searchQuery,
		resetField,
		handleSubmit,
	}
}

export const useMasterConfigRequest = <
	T extends IDataPagination = any,
	R = any,
	D = any,
>(
	props: IMasterUseRequest<R, D, T>,
): IMasterUseRequestReturn<T, R, D> => {
	const {
		queryKey,
		openCommonDialog,
		closeCommonDialog,
		initRequest,
		adapter,
		transformData,
	} = props
	const [isFetched, setIsFetched] = useState(false)

	const {
		data,
		trigger: triggerInquiry,
		error,
	} = adapter.lazyQuery<IQueryProvider, QueryKey.MasterConfig, Pagination<T>>({
		queryKey: QueryKey.MasterConfig,
		queryFunc: async (query, arg: R) => {
			return query[queryKey](arg as any)
		},
		option: {
			onSuccess: () => {
				setIsFetched(true)
			},
			onError: (error: Message) => {
				if (isFetched) {
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
				}
			},
		},
	})

	const loadData = useCallback(() => {
		triggerInquiry(initRequest)
	}, [initRequest, triggerInquiry])

	useEffect(() => {
		loadData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const isFirstLoadError = useMemo(() => {
		return !isFetched && Boolean(error)
	}, [isFetched, error])

	const currentPagination = useMemo(() => {
		return mapMasterConfigPage(data)
	}, [data])

	const dataSource = useMemo(() => {
		if (data) {
			return transformData(data)
		}
		return undefined
	}, [data, transformData])

	return {
		resourceData: {
			data,
			error,
		},
		dataSource,
		currentPagination,
		isFirstLoadError,
		loadData,
		triggerInquiry,
	}
}
