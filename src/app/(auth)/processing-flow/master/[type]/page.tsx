import { LOOK_UP_PATH as LOOK_UP_PATH_MASTER_CONFIG } from 'modules/processing-flow/master/interface'
import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import { notFound } from 'next/navigation'

const ProcessingFlowMasterChannelContainer = dynamic(
	() => import('modules/processing-flow/master/channel'),
)
const ProcessingFlowMasterInstructionTypeContainer = dynamic(
	() => import('modules/processing-flow/master/instructionType'),
)
const ProcessingFlowMasterServiceContainer = dynamic(
	() => import('modules/processing-flow/master/service'),
)
const ProcessingFlowMasterTimeoutTypeContainer = dynamic(
	() => import('modules/processing-flow/master/timeoutType'),
)

const renderContainer = (configType: string) => {
	switch (configType) {
		case LOOK_UP_PATH_MASTER_CONFIG.CHANNEL: {
			return <ProcessingFlowMasterChannelContainer />
		}
		case LOOK_UP_PATH_MASTER_CONFIG.INSTRUCTION_TYPE: {
			return <ProcessingFlowMasterInstructionTypeContainer />
		}
		case LOOK_UP_PATH_MASTER_CONFIG.SERVICE: {
			return <ProcessingFlowMasterServiceContainer />
		}
		case LOOK_UP_PATH_MASTER_CONFIG.TIMEOUT_TYPE: {
			return <ProcessingFlowMasterTimeoutTypeContainer />
		}
		default: {
			notFound()
		}
	}
}

export function generateStaticParams() {
	return [{ configType: 'channel' }]
}

const ProcessingFlowMasterType: NextPage = ({
	params,
}: {
	params: { type: string }
}) => {
	const generateIdEmbed = useId(COMPONENT_TYPE.DIV)

	return (
		<div {...generateIdEmbed('processing-flow-master-root')} className={'p-4'}>
			{renderContainer(params.type)}
		</div>
	)
}

export default ProcessingFlowMasterType
