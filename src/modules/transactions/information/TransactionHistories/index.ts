'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useTransactionHistoriesController } from './controller'

const TransactionHistoriesContainer = containerConfiguration({
	name: 'transactionHistories',
	useController: useTransactionHistoriesController,
	render: Container,
})

export default TransactionHistoriesContainer
