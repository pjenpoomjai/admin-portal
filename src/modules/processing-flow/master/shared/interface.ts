import { IDataPagination } from 'adapters/operators/models/pagination/interface'
import { Pagination } from 'adapters/operators/models/pagination/pagination'
import { IPagination } from 'components/common/Pagination'
import { Control } from 'react-hook-form'
import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { IMasterConfigQuery } from 'shared/adapters/interfaces/masterConfig/queries'
import { IAdapterProvider } from 'x-core-modules/provider/adapter'

export enum InputType {
	ALL = 'all',
	TEXT = 'text',
	NUMBER = 'number',
	DECIMAL = 'decimal',
	ACTIVE = 'active',
}

export interface IOption<T = string> {
	id?: string
	type: InputType
	value: T
	label: string
}

export interface IFormMasterSearch {
	field: IOption<string>
	value: string
}

export interface IOverrideInputProps {
	className?: string
}

export interface IInputExecutor {
	type?: InputType
	control: Control<IFormMasterSearch, any>
}

export interface IMasterUseRequest<R, D, T extends IDataPagination = any> {
	queryKey: keyof IMasterConfigQuery
	initRequest: R
	openCommonDialog: any
	closeCommonDialog: any
	adapter: IAdapterProvider<EndpointKey, IHeader>
	transformData: (props: Pagination<T>) => D
}

interface IMasterUseRequestReturnData<T extends IDataPagination = any> {
	data: Pagination<T>
	error: any
}

export interface IMasterUseRequestReturn<
	T extends IDataPagination = any,
	R = any,
	D = any,
> {
	resourceData: IMasterUseRequestReturnData<T>
	currentPagination: Pick<
		IPagination,
		'page' | 'rowsPerPage' | 'totalPages' | 'totalRows'
	>
	dataSource: D
	isFirstLoadError: boolean
	loadData: () => void
	triggerInquiry: (props: R) => void
}
