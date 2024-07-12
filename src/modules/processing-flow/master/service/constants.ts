import { IOption, InputType } from '../shared/interface'

export const FIELD_OPTIONS_MASTER_CHANNEL: IOption<string>[] = [
	{
		id: 'all',
		type: InputType.ALL,
		value: 'all',
		label: 'ALL',
	},
	{
		id: 'functionName',
		type: InputType.TEXT,
		value: 'functionName',
		label: 'Function Name',
	},
	{
		id: 'systemName',
		type: InputType.TEXT,
		value: 'systemName',
		label: 'System Name',
	},
	{
		id: 'activeStatus',
		type: InputType.ACTIVE,
		value: 'activeStatus',
		label: 'Active Status',
	},
]
