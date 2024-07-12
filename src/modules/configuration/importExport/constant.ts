import { ITab } from 'components/common/Tab'

export enum ConfigurationTab {
	DOWNLOAD = 'download',
	UPLOAD = 'upload',
}

export const configurationTabs: ITab[] = [
	{
		id: ConfigurationTab.DOWNLOAD,
		name: 'Download Configuration',
		value: ConfigurationTab.DOWNLOAD,
	},
	{
		id: ConfigurationTab.UPLOAD,
		name: 'Upload Configuration',
		value: ConfigurationTab.UPLOAD,
	},
]
