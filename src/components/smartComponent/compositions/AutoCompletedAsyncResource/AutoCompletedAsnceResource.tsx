import { IResourceProps } from 'components/smartComponent/resourceConnector/interface'
import { consumeResource } from '../../resourceConnector'
import { IAutoCompleteSelectAsyncResourceProps } from './interface'
import { AutocompleteSelectAsyncForm } from 'components/common'
import { IOption } from 'modules/transactions/inquiry/interface'
import { useMemo } from 'react'

export const Render = (
	componentProps: IAutoCompleteSelectAsyncResourceProps<IOption>,
	controllerProps: IResourceProps,
) => {
	const {
		resourcekey: _,
		autoCompleteProps: { additionalOptions = [], ...restAutoCompleteProp },
		...commonProps
	} = componentProps
	const options: IOption[] = useMemo(() => {
		return additionalOptions.concat(
			controllerProps.data.map((row) => {
				return {
					id: row.value,
					label: row.label,
					value: row.value,
				}
			}),
		)
	}, [controllerProps, additionalOptions])

	return (
		<AutocompleteSelectAsyncForm
			{...commonProps}
			autoCompleteProps={{
				...restAutoCompleteProp,
				options,
				loading: controllerProps.isLoading,
			}}
		/>
	)
}

export const AutoCompletedAsyncFormResource = consumeResource({
	render: Render,
})
