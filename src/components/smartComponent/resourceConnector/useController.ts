import { IResourceData, ResourceStatus } from 'contexts/resource/interface'
import { Resource } from 'contexts/resource/model'
import { defaultTo } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { IConsumeResourceProps, IResourceProps } from './interface'

export const useResourceController = (
	props: IConsumeResourceProps,
	ctx: IAppContextProps,
) => {
	const { resourcekey } = props
	const { getContextConsumer } = ctx
	const { useGetResourceModelSelector }: any = getContextConsumer('resources')
	const resources = useGetResourceModelSelector()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const resourceData = useMemo(() => {
		const resourceData: IResourceData = (resources as Resource).getResourceData(
			resourcekey,
		)
		return resourceData
	}, [resourcekey, resources])

	const data = useMemo(() => {
		return defaultTo(resourceData?.data, []).map((row) => {
			return {
				value: row.value,
				label: row.name,
			}
		})
	}, [resourceData?.data])

	useEffect(() => {
		setIsLoading(resourceData?.status === ResourceStatus.Loading)
		setIsError(resourceData?.status === ResourceStatus.Error)
	}, [resourceData?.status])

	const resource = useMemo(() => {
		return {
			isError,
			isLoading,
			data,
		} as IResourceProps
	}, [data, isError, isLoading])
	return resource
}
