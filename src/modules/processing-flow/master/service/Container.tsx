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
import { useProcessingFlowMasterServiceController } from './controller'
import { IService } from './interface'

const Container: FC<
	ReturnType<typeof useProcessingFlowMasterServiceController>
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

	const columns: IColumn<IService>[] = [
		{
			id: 'number',
			title: '#',
			dataIndex: 'number',
			width: 80,
		},
		{
			id: 'function-name',
			title: 'Function Name',
			dataIndex: 'functionName',
		},
		{
			id: 'system-name',
			title: 'System Name',
			dataIndex: 'systemName',
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
			dataIndex: 'serviceId',
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
			name="service"
			stepperProps={{
				steps: [
					{
						id: 'master-configuration-management',
						label: 'Master Configuration Management',
						type: StepperType.LINK,
						href: '/processing-flow/master',
					},
					{
						id: 'service',
						label: 'Service',
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
