import { ResourceStatus } from 'contexts/resource/interface'
import { useEffect, useMemo } from 'react'
import {
	EndpointKey,
	IHeader,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { CacheKey } from 'shared/query'
import { IAppContext } from 'x-core-modules/builder/appBuilder'
import {
	IAdapterProvider,
	IAdapterProviderConsumer,
} from 'x-core-modules/provider/adapter'
import { transformResponseToModel } from './dto'
import { IAppContextProps } from 'shared/appContext/interfaces'

const useRequest = (adapter: IAdapterProvider<EndpointKey, IHeader>) => {
	const { data, isLoading, error } = adapter.query<
		IQueryProvider,
		QueryKey.Resources
	>({
		cacheKey: { type: CacheKey.FetchResource },
		queryKey: QueryKey.Resources,
		queryFunc: async (query) => {
			return query.lookupData({})
		},
		isShouldFetch: true,
		option: {
			disableGlobalLoading: true,
			errorRetryCount: 1,
		},
	})

	return {
		resourceData: {
			data,
			isLoading,
			error,
		},
	}
}

export const useConsumeFetchResourceController = (props: IAppContextProps) => {
	const { getContextConsumer, getProviderConsumer } = props
	const { useUpdateResourceModelSelector } =
		getContextConsumer<any>('resources')
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const adapter = useAdapterQuerySelector()
	const {
		resourceData: { data, isLoading, error },
	} = useRequest(adapter)
	const updateResource = useUpdateResourceModelSelector()

	const status = useMemo(() => {
		if (!isLoading) {
			if (error) {
				return ResourceStatus.Error
			}
			return ResourceStatus.Success
		}
		return ResourceStatus.Loading
	}, [error, isLoading])

	useEffect(() => {
		const model = transformResponseToModel(status, data?.listLookup)

		updateResource(model)
	}, [data?.listLookup, status, updateResource])

	return {}
}
