'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import useLogout from './controller'

const LogoutContainer = containerConfiguration({
	name: 'logout',
	useController: useLogout,
	render: Container,
})

export default LogoutContainer
