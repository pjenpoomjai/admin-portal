'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import useLogIn from './controller'

const LoginContainer = containerConfiguration({
	name: 'login',
	useController: useLogIn,
	render: Container,
})

export default LoginContainer
