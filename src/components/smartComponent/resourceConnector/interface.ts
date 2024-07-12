import { ResourceKey } from 'contexts/resource/interface'
import { IHOCConsumeContextConfig } from 'x-core-modules/utils'

export interface IConsumeResourceProps {
	resourcekey: ResourceKey
}

export interface IOption {
	value: string
	label: string
}

export interface IResourceProps {
	isLoading: boolean
	isError: boolean
	data: IOption[]
}

export interface IConsumeResourceConfig<CP extends IConsumeResourceProps>
	extends Omit<IHOCConsumeContextConfig<IResourceProps, CP>, 'useController'> {}
