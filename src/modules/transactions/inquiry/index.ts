'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useTransactionsInquiryController } from './controller'

const TransactionsInquiryContainer = containerConfiguration({
	name: 'transactionsInquiryContainer',
	useController: useTransactionsInquiryController,
	render: Container,
})

export default TransactionsInquiryContainer
