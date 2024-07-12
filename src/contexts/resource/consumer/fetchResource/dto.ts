import { ModelResources } from 'adapters/operators/models'
import { LookupDataType } from 'adapters/operators/models/resources/interface'
import {
	ILookupData,
	ResourceKey,
	ResourceStatus,
	IResourceData,
} from 'contexts/resource/interface'
import { Resource } from 'contexts/resource/model'
import { defaultTo, get } from 'lodash'

const TYPE_MAPPER = {
	[LookupDataType.Channel]: ResourceKey.Channel,
	[LookupDataType.Currency]: ResourceKey.Currency,
	[LookupDataType.PaymentMethod]: ResourceKey.PaymentMethod,
	[LookupDataType.Service]: ResourceKey.Service,
	[LookupDataType.Status]: ResourceKey.Status,
	[LookupDataType.Classification]: ResourceKey.Classification,
	[LookupDataType.TransactionType]: ResourceKey.TransactionType,
}

export const transformResponseToModel = (
	status: ResourceStatus,
	resource: ModelResources.LookupData[] = [],
): Resource => {
	const keyResources = Object.values(ResourceKey)
	const defaultResource = keyResources.reduce(
		(accumulator: Record<string, IResourceData>, key: string) => {
			return Object.assign(accumulator, {
				[key]: {
					status: status,
					data: [],
				},
			})
		},
		{},
	)
	const resourceGroups = resource.reduce(
		(
			accumulator: Record<string, IResourceData>,
			data: ModelResources.LookupData,
		) => {
			const values = defaultTo(
				get(accumulator[TYPE_MAPPER[data.type]], 'data'),
				[],
			)
			return Object.assign(accumulator, {
				[data.type]: {
					status: status,
					data: values.concat({
						value: data.value,
						name: data.name,
					} as ILookupData),
				},
			})
		},
		defaultResource,
	)

	return Object.keys(resourceGroups).reduce((acc, group) => {
		acc.setResourceData(group as any, resourceGroups[group])
		return acc
	}, new Resource())
}
