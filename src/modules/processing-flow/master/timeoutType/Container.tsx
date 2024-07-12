import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { StepperType } from 'components/Stepper/interface'
import Box from 'components/common/Box/Box'
import IconButton from 'components/common/IconButton'
import { IColumn } from 'components/common/Table/Table'
import { DateTime } from 'luxon'
import { FC } from 'react'
import { convertDateWithZone } from 'utils/convertDateWithZone'
import MasterConfigPage from '../templates/MasterConfigPage/MasaterConfigPage'
import { useProcessingFlowMasterTimeoutTypeController } from './controller'
import { ITimeoutType } from './interface'
import defaultTo from 'lodash/defaultTo'

const Container: FC<
	ReturnType<typeof useProcessingFlowMasterTimeoutTypeController>
> = (props) => {
	const {
		searchForm,
		table,
		isFirstLoadError,
		refresh,
		handleOnCreate,
		handleOnEdit,
		handleOnDuplicate,
	} = props

	const columns: IColumn<ITimeoutType>[] = [
		{
			id: 'number',
			title: '#',
			dataIndex: 'number',
			width: 80,
		},
		{
			id: 'timeout-type',
			title: 'Timeout Type',
			dataIndex: 'timeoutType',
		},
		{
			id: 'timeout-value',
			title: 'Timeout Value',
			dataIndex: 'timeoutValue',
		},
		{
			id: 'min-threshold',
			title: 'Min Threshold',
			dataIndex: 'minThreshold',
			render: (value: number) => (value ? value.toFixed(2) : '-'),
		},
		{
			id: 'max-threshold',
			title: 'Max Threshold',
			dataIndex: 'maxThreshold',
			render: (value: number) => (value ? value.toFixed(2) : '-'),
		},
		{
			id: 'latency-offset',
			title: 'Latency Offset',
			dataIndex: 'latencyOffset',
			render: (value: number) => defaultTo(value, '-'),
		},
		{
			id: 'active-status',
			title: 'Active Status',
			dataIndex: 'activeStatus',
			render: (value) => {
				return value ? 'Active' : 'Inactive'
			},
		},
		{
			id: 'updated-date-time',
			title: 'Updated Date / Time',
			dataIndex: 'updatedDateTime',
			render: (value: DateTime) => {
				return value ? convertDateWithZone(value, 'dd-MM-yyyy HH:mm:ss') : '-'
			},
		},
		{
			id: 'updated-by',
			title: 'Updated By',
			dataIndex: 'updatedBy',
		},
		{
			id: 'action',
			title: '',
			dataIndex: 'timeoutTypeId',
			width: 80,
			render: (value, record) => {
				return (
					<Box className="flex">
						<IconButton
							id={`edit-${value}`}
							onClick={() => handleOnEdit(record)}
						>
							<CreateOutlinedIcon />
						</IconButton>
						<IconButton
							id={`duplicate-${value}`}
							onClick={() => handleOnDuplicate(record)}
						>
							<ContentCopyIcon />
						</IconButton>
					</Box>
				)
			},
		},
	]

	return (
		<MasterConfigPage
			name="timeoutType"
			stepperProps={{
				steps: [
					{
						id: 'master-configuration-management',
						label: 'Master Configuration Management',
						type: StepperType.LINK,
						href: '/processing-flow/master',
					},
					{
						id: 'timeout-type',
						label: 'Timeout Type',
						type: StepperType.TEXT,
					},
				],
			}}
			isFirstLoadError={isFirstLoadError}
			searchForm={searchForm}
			table={{
				columns,
				dataSource: table.data,
				paginationProps: {
					id: 'master-service',
					...table.paginationProps,
				},
			}}
			refresh={refresh}
			handleOnCreate={handleOnCreate}
		/>
	)
}

export default Container
