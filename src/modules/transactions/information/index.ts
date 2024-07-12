'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useTransactionsInformationController } from './controller'

const TransactionsInformationContainer = containerConfiguration({
	name: 'transactionsInformationContainer',
	useController: useTransactionsInformationController,
	render: Container,
})

export default TransactionsInformationContainer
