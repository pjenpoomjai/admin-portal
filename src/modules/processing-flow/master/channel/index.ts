'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useProcessingFlowMasterChannelController } from './controller'

const ProcessingFlowMasterChannelContainer = containerConfiguration({
	name: 'processingFlowMasterChannel',
	useController: useProcessingFlowMasterChannelController,
	render: Container,
})

export default ProcessingFlowMasterChannelContainer
