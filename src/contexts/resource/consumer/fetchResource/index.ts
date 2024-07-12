'use client'
import { containerConfiguration } from 'x-core-modules/module'
import { useConsumeFetchResourceController } from './controller'

const ConsumeFetchResourceContainer = containerConfiguration({
	name: 'consumeFetchResourceContainer',
	useController: useConsumeFetchResourceController,
	render: () => null,
})

export default ConsumeFetchResourceContainer
