import { IStepperProps } from 'components/Stepper/interface'
import { IPagination } from 'components/common/Pagination'
import { IColumn } from 'components/common/Table/Table'
import { Control, UseFormResetField } from 'react-hook-form'
import { IFormMasterSearch, IOption } from '../../shared/interface'

export interface ISearchForm {
	searchField: IOption<string>
	control: Control<IFormMasterSearch, any>
	isDisabledSearch: boolean
	options: IOption<string>[]
	resetField: UseFormResetField<IFormMasterSearch>
	onSearch: () => Promise<void>
}

export interface ITableConfig<T = any> {
	dataSource: T
	columns: IColumn<T>[]
	paginationProps: IPagination
}

export interface IMasterConfigPageProps<T = any> {
	name: string
	stepperProps: IStepperProps
	isFirstLoadError: boolean
	searchForm: ISearchForm
	table: ITableConfig<T>
	handleOnCreate: () => void
	refresh: () => void
	className?: string
}
