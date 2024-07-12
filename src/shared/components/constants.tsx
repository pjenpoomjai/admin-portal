import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { IMenu } from 'components/template/Sider/interface'
import { PymdRole } from 'shared/constants'

export const MENU_OPTIONS: IMenu[] = [
	{
		id: 'transactions',
		name: 'Transaction',
		url: '/transactions',
		dataId: 'transactions',
		icon: <HistoryOutlinedIcon fontSize="small" />,
		activeIcon: (
			<HistoryOutlinedIcon className="text-violet-900" fontSize="small" />
		),
		roles: [
			PymdRole.TransactionManager.toLocaleLowerCase(),
			PymdRole.Bypass.toLocaleLowerCase(),
			PymdRole.Emer.toLocaleLowerCase(),
		],
	},
	{
		id: 'processing-flow',
		name: 'Processing Flow',
		url: undefined,
		dataId: 'processing-flow',
		icon: <CreateOutlinedIcon fontSize="small" />,
		activeIcon: (
			<CreateOutlinedIcon className="text-violet-900" fontSize="small" />
		),
		subMenu: [
			{
				id: 'processing-flow-master',
				name: 'Master',
				url: '/processing-flow/master',
				dataId: 'processing-flow-master',
			},
			{
				id: 'processing-flow-transaction',
				name: 'Transaction',
				url: '/processing-flow/transaction',
				dataId: 'processing-flow-transaction',
			},
			{
				id: 'processing-flow-global',
				name: 'Global',
				url: '/processing-flow/global',
				dataId: 'processing-flow-global',
			},
		],
		roles: [
			PymdRole.Configuration.toLocaleLowerCase(),
			PymdRole.Bypass.toLocaleLowerCase(),
			PymdRole.Emer.toLocaleLowerCase(),
		],
	},
	{
		id: 'configuration',
		name: 'Configuration',
		url: '/configuration',
		dataId: 'configuration',
		icon: <SettingsOutlinedIcon fontSize="small" />,
		activeIcon: (
			<SettingsOutlinedIcon className="text-violet-900" fontSize="small" />
		),
		roles: [
			PymdRole.Configuration.toLocaleLowerCase(),
			PymdRole.Bypass.toLocaleLowerCase(),
			PymdRole.Emer.toLocaleLowerCase(),
		],
	},
]
