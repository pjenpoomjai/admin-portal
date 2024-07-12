'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import usePreLogin from './controller'

const PreLoginContainer = containerConfiguration({
	name: 'pre-login',
	useController: usePreLogin,
	render: Container,
})

export default PreLoginContainer
