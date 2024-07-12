import { IColumn } from 'components/common/Table'
import {
	IConfigurationImportProcess,
	IProcessFailDetailDisplay,
} from '../../interface'

export const processImportColumns: IColumn<IConfigurationImportProcess>[] = [
	{
		id: 'name',
		title: 'Name',
		dataIndex: 'configName',
	},
	{
		id: 'new',
		title: 'New',
		dataIndex: 'new',
	},
	{
		id: 'update',
		title: 'Update',
		dataIndex: 'update',
	},
]

export const processFailDetailImportColumns: IColumn<IProcessFailDetailDisplay>[] =
	[
		{
			id: 'name',
			title: 'Name',
			dataIndex: 'configName',
		},
		{
			id: 'row-number',
			title: 'Row Number',
			dataIndex: 'row',
		},
		{
			id: 'column-name',
			title: 'Column Name',
			dataIndex: 'column',
		},
		{
			id: 'detail',
			title: 'Detail',
			dataIndex: 'detail',
		},
	]
