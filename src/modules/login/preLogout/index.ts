'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import usePreLogout from './controller'

const PreLogoutContainer = containerConfiguration({
	name: 'preLogout',
	useController: usePreLogout,
	render: Container,
})

export default PreLogoutContainer
