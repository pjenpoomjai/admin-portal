'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useProcessingFlowMasterTimeoutTypeController } from './controller'

const ProcessingFlowMasterTimeoutTypeContainer = containerConfiguration({
	name: 'processingFlowMasterTimeoutType',
	useController: useProcessingFlowMasterTimeoutTypeController,
	render: Container,
})

export default ProcessingFlowMasterTimeoutTypeContainer
