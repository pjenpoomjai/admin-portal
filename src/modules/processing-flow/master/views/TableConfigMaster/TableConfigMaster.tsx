import classnames from 'classnames'
import Button from 'components/common/Button/Button'
import Table, { IColumn } from 'components/common/Table/Table'
import { FC } from 'react'
import { IMasterConfig } from '../../interface'
import { ITableMasterProps } from './interface'
import defaultClasses from './tableConfigMaster.module.css'

const TableConfigMaster: FC<ITableMasterProps> = (props) => {
	const { data, handleOnClickView } = props

	const masterConfigColumns: IColumn<IMasterConfig>[] = [
		{
			id: 'number',
			title: '#',
			dataIndex: 'number',
			width: 80,
		},
		{
			id: 'name',
			title: 'Name',
			dataIndex: 'name',
		},
		{
			id: 'action',
			title: 'Action',
			dataIndex: 'path',
			render: (value) => {
				return (
					<Button
						id={`view-master-config-${value}`}
						themesize="base"
						themetype="filled"
						onClick={() => handleOnClickView(value)}
					>
						View
					</Button>
				)
			},
		},
	]

	return (
		<Table
			emptyStateWithHeader
			classNames={classnames(defaultClasses.root, 'bg-white rounded-xl')}
			id="table-master-config-result"
			dataSource={data}
			columns={masterConfigColumns}
		/>
	)
}

export default TableConfigMaster
