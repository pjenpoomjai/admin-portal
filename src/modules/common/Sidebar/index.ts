import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import useSiderController from './controller'

const SidebarContainer = containerConfiguration({
	name: 'sidebar',
	useController: useSiderController,
	render: Container,
})

export default SidebarContainer
