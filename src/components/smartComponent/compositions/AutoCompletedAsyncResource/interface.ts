import {
	IAutocompleteSelectAsync,
	IAutocompleteSelectAsyncForm,
} from 'components/common/AutocompleteSelectAsync/AutocompleteSelectAsync'
import { IConsumeResourceProps } from 'components/smartComponent/resourceConnector/interface'
import { IOption } from 'modules/transactions/inquiry/interface'
interface IAutoCompleteSelectAsyncProps<T>
	extends Omit<IAutocompleteSelectAsync<T>, 'value' | 'options'> {
	additionalOptions?: IOption[]
}

export interface IAutoCompleteSelectAsyncResourceProps<T>
	extends IConsumeResourceProps,
		Omit<IAutocompleteSelectAsyncForm<IOption>, 'autoCompleteProps'> {
	autoCompleteProps: IAutoCompleteSelectAsyncProps<T>
}
