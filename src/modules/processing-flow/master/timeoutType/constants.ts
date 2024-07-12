import { IOption, InputType } from '../shared/interface'

export const FIELD_OPTIONS_MASTER_CHANNEL: IOption<string>[] = [
	{
		id: 'all',
		type: InputType.ALL,
		value: 'all',
		label: 'ALL',
	},
	{
		id: 'timeoutType',
		type: InputType.TEXT,
		value: 'timeoutType',
		label: 'Timeout Type',
	},
	{
		id: 'timeoutValue',
		type: InputType.NUMBER,
		value: 'timeoutValue',
		label: 'Timeout Value',
	},
	{
		id: 'minThreshold',
		type: InputType.DECIMAL,
		value: 'minThreshold',
		label: 'Min Threshold',
	},
	{
		id: 'maxThreshold',
		type: InputType.NUMBER,
		value: 'maxThreshold',
		label: 'Max Threshold',
	},
	{
		id: 'latencyOffset',
		type: InputType.DECIMAL,
		value: 'latencyOffset',
		label: 'Latency Offset',
	},
	{
		id: 'activeStatus',
		type: InputType.ACTIVE,
		value: 'activeStatus',
		label: 'Active Status',
	},
]
