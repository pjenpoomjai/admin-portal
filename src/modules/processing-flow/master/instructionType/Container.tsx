import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { StepperType } from 'components/Stepper/interface'
import Box from 'components/common/Box/Box'
import IconButton from 'components/common/IconButton'
import { IColumn } from 'components/common/Table/Table'
import { FC } from 'react'
import MasterConfigPage from '../templates/MasterConfigPage/MasaterConfigPage'
import { useProcessingFlowMasterInstructionTypeController } from './controller'
import { IInstructionType } from './interface'
import { DateTime } from 'luxon'
import { convertDateWithZone } from 'utils/convertDateWithZone'

const Container: FC<
	ReturnType<typeof useProcessingFlowMasterInstructionTypeController>
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

	const columns: IColumn<IInstructionType>[] = [
		{
			id: 'number',
			title: '#',
			dataIndex: 'number',
			width: 80,
		},
		{
			id: 'instruction-type',
			title: 'Instruction Type',
			dataIndex: 'instructionType',
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
			dataIndex: 'instructionTypeId',
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
						id: 'instructionType',
						label: 'Instruction Type',
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
