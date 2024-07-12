'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useProcessingFlowMasterServiceController } from './controller'

const ProcessingFlowMasterServiceContainer = containerConfiguration({
	name: 'processingFlowMasterService',
	useController: useProcessingFlowMasterServiceController,
	render: Container,
})

export default ProcessingFlowMasterServiceContainer
