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
import { useProcessingFlowMasterChannelController } from './controller'
import { IChannel } from './interface'

const Container: FC<
	ReturnType<typeof useProcessingFlowMasterChannelController>
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

	const columns: IColumn<IChannel>[] = [
		{
			id: 'number',
			title: '#',
			dataIndex: 'number',
			width: 80,
		},
		{
			id: 'channel-code',
			title: 'Channel Code',
			dataIndex: 'channelCode',
		},
		{
			id: 'channel-name',
			title: 'Channel Name',
			dataIndex: 'channelName',
		},
		{
			id: 'channel-description',
			title: 'Channel Description',
			dataIndex: 'channelDescription',
			render: (value) => {
				return value ? value : '-'
			},
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
			dataIndex: 'channelId',
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
			name="channel"
			stepperProps={{
				steps: [
					{
						id: 'master-configuration-management',
						label: 'Master Configuration Management',
						type: StepperType.LINK,
						href: '/processing-flow/master',
					},
					{
						id: 'hannel',
						label: 'Channel',
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
					id: 'master-channel',
					...table.paginationProps,
				},
			}}
			refresh={refresh}
			handleOnCreate={handleOnCreate}
		/>
	)
}

export default Container
