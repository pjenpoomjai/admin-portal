import { IOption, InputType } from '../shared/interface'

export const FIELD_OPTIONS_MASTER_CHANNEL: IOption<string>[] = [
	{
		id: 'all',
		type: InputType.ALL,
		value: 'all',
		label: 'ALL',
	},
	{
		id: 'channelCode',
		type: InputType.TEXT,
		value: 'channelCode',
		label: 'Channel Code',
	},
	{
		id: 'channelName',
		type: InputType.TEXT,
		value: 'channelName',
		label: 'Channel Name',
	},
	{
		id: 'channelDescription',
		type: InputType.TEXT,
		value: 'channelDescription',
		label: 'Channel Description',
	},
	{
		id: 'activeStatus',
		type: InputType.ACTIVE,
		value: 'activeStatus',
		label: 'Active Status',
	},
]
