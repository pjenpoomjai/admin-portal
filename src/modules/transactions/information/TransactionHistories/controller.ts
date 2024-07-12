import { ModelHistories } from 'adapters/operators/models'
import { types } from 'hooks/queries/actions'
import { defaultTo } from 'lodash'
import { useParams, useSearchParams } from 'next/navigation'
import { ReactNode, useCallback, useMemo } from 'react'
import {
	EndpointKey,
	IHeader,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import {
	ITransactionsQuery,
	LogType,
} from 'shared/adapters/interfaces/transactions/queries'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { CommonDialogType, defaultDialogExecutors } from 'src/builders'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'
import { transformResponseToTableDisplay } from './dto'
import { IUseHandleJsonView, IUseTransactionRequestProps } from './interface'

const useRequestHistories = (props: IUseTransactionRequestProps) => {
	const { id, instructionType, adapter } = props

	const {
		data,
		error,
		isLoading,
		mutate: reloadData,
	} = adapter.query<
		IQueryProvider,
		QueryKey.transactions,
		ModelHistories.History
	>({
		cacheKey: {
			type: types.ActionKey.GET_TRANSACTION_DETAIL_HISTORIES,
			extraKey: id,
		},
		queryKey: QueryKey.transactions,
		queryFunc: async (query: ITransactionsQuery) => {
			return query.listHistories({
				requestId: id,
				logType:
					instructionType === 'BILL_PAYMENT'
						? LogType.BillPayment
						: LogType.Transfer,
			})
		},
		option: {
			disableGlobalLoading: true,
			errorRetryCount: 0,
		},
		isShouldFetch: !!id,
	})

	const errorCode = useMemo(() => {
		return error?.code
	}, [error?.code])

	return {
		reloadData,
		data,
		errorCode,
		isLoading,
	}
}

const useHandleJsonView = (props: IUseHandleJsonView) => {
	const { getContextConsumer } = props
	const { useOpenCommonDialogSelector, useCloseCommonDialogSelector }: any =
		getContextConsumer('commonDialog')
	const openCommonDialog = useOpenCommonDialogSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()

	const handleOnClickExpandDescription = useCallback(
		(render: ReactNode) => {
			openCommonDialog(
				defaultDialogExecutors(CommonDialogType.CUSTOM_VIEW, {
					primaryButtonOnClick: () => {
						closeCommonDialog()
					},
					primaryButtonLabel: 'Close',
					showIcon: false,
					size: 'medium',
					desc: render,
				}),
			)
		},
		[openCommonDialog, closeCommonDialog],
	)

	return {
		handleOnClickExpandDescription,
	}
}

export const useTransactionHistoriesController = (props: IAppContextProps) => {
	const { getContextConsumer, getProviderConsumer } = props
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const adapter = useAdapterQuerySelector()
	const params = useParams<{ id: string }>()
	const searchParams = useSearchParams()
	const { id } = params
	const instructionType = defaultTo(searchParams.get('type'), '')
	const { data, isLoading, errorCode, reloadData } = useRequestHistories({
		id,
		instructionType,
		adapter,
	})
	const { handleOnClickExpandDescription } = useHandleJsonView({
		getContextConsumer,
	})

	const dataTable = useMemo(() => {
		const dataDisplay = transformResponseToTableDisplay(data)
		return errorCode ? [] : dataDisplay
	}, [data, errorCode])

	return {
		reloadData,
		errorCode,
		data: dataTable,
		isLoading,
		handleOnClickExpandDescription,
	}
}
