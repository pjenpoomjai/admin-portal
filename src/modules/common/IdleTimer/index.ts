import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import useIdleTimerController from './controller'
import { IIdletimerProps } from './interface'

const IdletimerContainer = containerConfiguration<IIdletimerProps>({
	name: 'Idletimer',
	useController: useIdleTimerController,
	render: Container,
})

export default IdletimerContainer
