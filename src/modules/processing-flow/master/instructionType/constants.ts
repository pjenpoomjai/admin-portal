import { IOption, InputType } from '../shared/interface'

export const FIELD_OPTIONS_MASTER_CHANNEL: IOption<string>[] = [
	{
		id: 'all',
		type: InputType.ALL,
		value: 'all',
		label: 'ALL',
	},
	{
		id: 'instructionType',
		type: InputType.TEXT,
		value: 'instructionType',
		label: 'Instruction Type',
	},
	{
		id: 'activeStatus',
		type: InputType.ACTIVE,
		value: 'activeStatus',
		label: 'Active Status',
	},
]
