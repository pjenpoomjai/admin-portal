import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'

const ConfigImportExportContainer = dynamic(
	() => import('modules/configuration/importExport'),
)

const Configuration: NextPage = () => {
	const generateIdEmbed = useId(COMPONENT_TYPE.DIV)

	return (
		<div {...generateIdEmbed('upload-config-root')} className={'p-4'}>
			<ConfigImportExportContainer />
		</div>
	)
}

export default Configuration
