import { LookupDataType } from 'adapters/operators/models/resources/interface'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { IAppContextProps } from 'shared/appContext/interfaces'
import {
	EndpointKey,
	IHeader,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { CacheKey } from 'shared/query'
import {
	IAdapterProvider,
	IAdapterProviderConsumer,
} from 'x-core-modules/provider/adapter'
import { mapMasterConfig } from './dto'

const useRequest = (adapter: IAdapterProvider<EndpointKey, IHeader>) => {
	const {
		data,
		mutate: reload,
		error,
	} = adapter.query<IQueryProvider, QueryKey.Resources>({
		cacheKey: {
			type: CacheKey.FetchResource,
			extraKey: 'masterConfig',
		},
		queryKey: QueryKey.Resources,
		queryFunc: async (query) => {
			return query.lookupData({ lookupType: 'masterConfig' })
		},
		isShouldFetch: true,
		option: undefined,
	})

	return {
		resourceData: {
			data,
			error,
		},
		reload,
	}
}

export const useProcessingFlowMasterController = (props: IAppContextProps) => {
	const { getProviderConsumer } = props
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const adapter = useAdapterQuerySelector()
	const {
		resourceData: { data, error },
		reload,
	} = useRequest(adapter)
	const { push } = useRouter()

	const isError = useMemo(() => {
		return Boolean(error)
	}, [error])

	const masterConfigData = useMemo(() => {
		if (!data) {
			return undefined
		}
		return mapMasterConfig(
			data.getLookupDataByType(LookupDataType.MasterConfig),
		)
	}, [data])

	const handleOnClickView = useCallback(
		(value: string) => {
			push(`/processing-flow/master/${value}`)
		},
		[push],
	)

	return {
		isError,
		masterConfigData,
		reload,
		handleOnClickView,
	}
}
