import { AutocompleteSelectAsyncForm } from 'components/common/AutocompleteSelectAsync'
import { IInputExecutor, InputType } from './interface'
import { Input, InputForm } from 'components/common/Input'
import {
	onlyDouble,
	onlyEnglishCharacterAndNumberAndSpaceAndDashAndUnderScoreAndComma,
	onlyNumber,
} from 'utils/normalizeInput'

const inputExecutorList = [
	{
		match: InputType.TEXT,
		build: (props: Omit<IInputExecutor, 'type'>) => {
			const { control } = props
			return (
				<InputForm
					id="value"
					name="value"
					control={control as any}
					normalizes={[
						onlyEnglishCharacterAndNumberAndSpaceAndDashAndUnderScoreAndComma,
					]}
				/>
			)
		},
	},
	{
		match: InputType.NUMBER,
		build: (props: Omit<IInputExecutor, 'type'>) => {
			const { control } = props
			return (
				<InputForm
					id="value"
					name="value"
					control={control as any}
					normalizes={[onlyNumber]}
				/>
			)
		},
	},
	{
		match: InputType.DECIMAL,
		build: (props: Omit<IInputExecutor, 'type'>) => {
			const { control } = props
			return (
				<InputForm
					id="value"
					name="value"
					control={control as any}
					normalizes={[onlyDouble]}
					transforms={[(value: string) => Number(value).toFixed(2)]}
				/>
			)
		},
	},
	{
		match: InputType.ACTIVE,
		build: (props: Omit<IInputExecutor, 'type'>) => {
			const { control } = props
			return (
				<AutocompleteSelectAsyncForm
					name="value"
					control={control as any}
					defaultValue={{
						id: 'active',
						label: 'Active',
						value: true,
					}}
					autoCompleteProps={{
						options: [
							{
								id: 'active',
								label: 'Active',
								value: true,
							},
							{
								id: 'inactive',
								label: 'Inactive',
								value: false,
							},
						],
						id: 'value-search',
						valueIndex: 'value',
						labelIndex: 'label',
						debounce: 300,
						height: 35,
					}}
				/>
			)
		},
	},
]

export const inputExecutors = (props: IInputExecutor) => {
	const { type, ...rest } = props
	const executorResult = inputExecutorList
		.find(({ match }) => match === type)
		?.build(rest)
	return (
		executorResult ?? (
			<Input id="value" outlinedInputProps={{ disabled: true }} />
		)
	)
}
