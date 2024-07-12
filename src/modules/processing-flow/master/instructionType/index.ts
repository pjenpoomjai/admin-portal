'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useProcessingFlowMasterInstructionTypeController } from './controller'

const ProcessingFlowMasterInstructionTypeContainer = containerConfiguration({
	name: 'processingFlowMasterInstructionType',
	useController: useProcessingFlowMasterInstructionTypeController,
	render: Container,
})

export default ProcessingFlowMasterInstructionTypeContainer
