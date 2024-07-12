'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useProcessingFlowMasterController } from './controller'

const ProcessingFlowMasterContainer = containerConfiguration({
	name: 'processingFlowMaster',
	useController: useProcessingFlowMasterController,
	render: Container,
})

export default ProcessingFlowMasterContainer
