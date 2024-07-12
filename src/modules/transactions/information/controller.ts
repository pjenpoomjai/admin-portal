import { TransactionDetail } from 'adapters/operators/models/transactions'
import { types } from 'hooks/queries/actions'
import defaultTo from 'lodash/defaultTo'
import { useParams, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import {
	EndpointKey,
	IHeader,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'
import { TransactionTabEnum } from './constant'
import { mapTransactionDetail } from './dto'
import { IUseResourceHandler } from './interface'

const useResourceHandler = (props: IUseResourceHandler) => {
	const { adapter, requestId, instructionType } = props

	const {
		data: transactionData,
		error,
		mutate: reloadDetail,
	} = adapter.query<IQueryProvider, QueryKey.transactions, TransactionDetail>({
		cacheKey: {
			type: types.ActionKey.GET_TRANSACTION_DETAIL,
		},
		queryKey: QueryKey.transactions,
		queryFunc: async (query) => {
			return query.getDetail({ requestId, instructionType })
		},
		option: undefined,
		isShouldFetch: true,
	})

	const errorCode = useMemo(() => {
		return error?.code
	}, [error?.code])

	return {
		reloadDetail,
		transactionData,
		errorCode,
	}
}

export const useTransactionsInformationController = (
	props: IAppContextProps,
) => {
	const { getProviderConsumer } = props
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const adapter = useAdapterQuerySelector()
	const params = useParams<{ id: string }>()
	const searchParams = useSearchParams()
	const { id } = params
	const instructionType = defaultTo(searchParams.get('type'), '')
	const { transactionData, errorCode, reloadDetail } = useResourceHandler({
		requestId: id,
		instructionType,
		adapter,
	})
	const [selectedTab, setSelectedTab] = useState<TransactionTabEnum>(
		TransactionTabEnum.DETAILS,
	)

	const transaction = useMemo(() => {
		if (transactionData) {
			return mapTransactionDetail(transactionData)
		}
		return undefined
	}, [transactionData])

	const tabHandler = useCallback((selected: TransactionTabEnum) => {
		setSelectedTab(selected)
	}, [])

	return {
		transaction,
		errorCode,
		selectedTab,
		reloadDetail,
		tabHandler,
	}
}
