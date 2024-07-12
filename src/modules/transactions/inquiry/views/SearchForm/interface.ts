import { Control } from 'react-hook-form'
import { IFormData, IOption } from '../../interface'

export interface ISearchForm {
	control: Control<IFormData, any>
	isAdvanceSearch: boolean
	onChangeValidate: (name: keyof IFormData, value: any) => void
	options: {
		serviceOptions: IOption[]
		onUsFlagOptions: IOption<boolean>[]
		kymOptions: IOption<boolean>[]
		externalClearingSystemOptions: IOption[]
		outboundInboundOptions: IOption[]
		flagOptions: IOption<boolean>[]
	}
}
