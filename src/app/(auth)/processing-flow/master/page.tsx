import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'

const ProcessingFlowMasterContainer = dynamic(
	() => import('modules/processing-flow/master'),
)

const ProcessingFlowMaster: NextPage = () => {
	const generateIdEmbed = useId(COMPONENT_TYPE.DIV)

	return (
		<div {...generateIdEmbed('processing-flow-master-root')} className={'p-4'}>
			<ProcessingFlowMasterContainer />
		</div>
	)
}

export default ProcessingFlowMaster
