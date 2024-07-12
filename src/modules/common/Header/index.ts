import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import useHeaderController from './controller'

const HeaderContainer = containerConfiguration({
	name: 'header',
	useController: useHeaderController,
	render: Container,
})

export default HeaderContainer
