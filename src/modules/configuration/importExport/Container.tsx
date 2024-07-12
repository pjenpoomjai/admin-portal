import classnames from 'classnames'
import Box from 'components/common/Box/Box'
import Tab from 'components/common/Tab'
import Typography from 'components/common/Typography'
import { FC, SyntheticEvent } from 'react'
import { ConfigurationTab, configurationTabs } from './constant'
import { useConfigImportExportController } from './controller'
import defaultClasses from './importExport.module.css'
import ExportConfigView from './views/ExportConfigView/ExportConfigView'
import ImportConfigView from './views/ImportConfigView/ImportConfigView'

const Container: FC<ReturnType<typeof useConfigImportExportController>> = (
	props,
) => {
	const { selectedTab, tabHandler, uploadForm, downloadForm } = props
	const { onSubmitDownload } = downloadForm

	const getTabBody = () => {
		if (selectedTab === ConfigurationTab.DOWNLOAD) {
			return <ExportConfigView onClickDownload={onSubmitDownload} />
		}
		return <ImportConfigView {...uploadForm} />
	}

	return (
		<Box className={classnames(defaultClasses.root, 'w-full')}>
			<Typography
				id="config"
				className="text-xl font-semibold text-indigo-500 pb-6"
			>
				Configuration
			</Typography>
			<Tab
				className="mx-[24px]"
				classNames={defaultClasses.tab}
				id="transaction"
				value={selectedTab}
				tabList={configurationTabs}
				onChange={(
					_e: SyntheticEvent<Element, Event>,
					value: ConfigurationTab,
				) => {
					tabHandler(value)
				}}
			/>
			{getTabBody()}
		</Box>
	)
}

export default Container
