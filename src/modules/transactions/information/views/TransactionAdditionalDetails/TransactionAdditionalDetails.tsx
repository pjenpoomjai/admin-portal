import classnames from 'classnames'
import { ResourceKey } from 'contexts/resource/interface'
import { isNil } from 'lodash'
import { convertDateWithZone } from 'utils/convertDateWithZone'
import { TransactionDetailRows } from '../TransactionDetailRow/TransactionDetailRow'
import { renderItem } from '../TransactionInformation/TransactionInformation'
import { ITransactionAdditionalDetails, TRenderItem } from './interface'
import defaultClasses from './transactionAddtionDetails.module.css'

const TransactionAdditionalDetails: React.FC<ITransactionAdditionalDetails> = (
	props,
) => {
	const { additionalDetails } = props
	const { information, payee, payer } = additionalDetails

	return (
		<div className="pt-4">
			<div
				className={classnames(
					defaultClasses.tableGray,
					'flex flex-wrap justify-between pb-4 px-6',
				)}
			>
				{renderItem<TRenderItem>({
					label: 'Creation Date Time :',
					key: 'creationDateTime',
					values: information,
					customText: () => {
						return information.creationDateTime.isValid
							? convertDateWithZone(information.creationDateTime)
							: ''
					},
				})}
				{renderItem<TRenderItem>({
					label: 'Expiry Date Time :',
					key: 'expiryDateTime',
					values: information,
					customText: () => {
						return information.expiryDateTime.isValid
							? information.expiryDateTime.toFormat('dd-MM-yyyy HH:mm:ss')
							: ''
					},
				})}
				{renderItem<TRenderItem>({
					label: 'Posted Date Time :',
					key: 'postedDateTime',
					values: information,
					customText: () => {
						return information.postedDateTime.isValid
							? information.postedDateTime.toFormat('dd-MM-yyyy HH:mm:ss')
							: ''
					},
				})}
				{renderItem<TRenderItem>({
					label: 'Due Date :',
					key: 'dueDate',
					values: information,
					customText: () => {
						return information.dueDate.isValid
							? information.dueDate.toFormat('dd-MM-yyyy HH:mm:ss')
							: ''
					},
				})}
				{renderItem<TRenderItem>({
					label: 'Transaction Receipt Number :',
					key: 'transactionReceiptNumber',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Transaction Type :',
					key: 'transactionType',
					values: information,
					resourceValueKey: ResourceKey.TransactionType,
				})}
				{renderItem<TRenderItem>({
					label: 'Status :',
					key: 'status',
					values: information,
					resourceValueKey: ResourceKey.Status,
				})}
				{renderItem<TRenderItem>({
					label: 'On-Us :',
					key: 'onUs',
					values: information,
					customText: () => {
						if (isNil(information.onUs)) {
							return ''
						}
						return information.onUs ? 'T' : 'F'
					},
				})}
				{renderItem<TRenderItem>({
					label: 'Payment Method :',
					key: 'paymentMethod',
					values: information,
					resourceValueKey: ResourceKey.PaymentMethod,
				})}
				{renderItem<TRenderItem>({
					label: 'Charge Amount :',
					key: 'chargeAmount',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'IB Fee :',
					key: 'ibFee',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'IR Fee :',
					key: 'irFee',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Equivalent Amount :',
					key: 'equivalentAmount',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Equivalent Currency :',
					key: 'equivalentCurrency',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Biller Type :',
					key: 'billerType',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Biller Code :',
					key: 'billerCode',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Biller Name :',
					key: 'billerName',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Biller Profile ID :',
					key: 'billerProfileId',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Biller Sub-Type :',
					key: 'billerSubType',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Bill Reference 1 :',
					key: 'billReference1',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Bill Reference 2 :',
					key: 'billReference2',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Bill Reference 3 :',
					key: 'billReference3',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Sender Name :',
					key: 'senderName',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Sender ID :',
					key: 'senderId',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Sender Mobile :',
					key: 'senderMobile',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Sender Email :',
					key: 'senderEmail',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Remittance Info :',
					key: 'remittanceInfo',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Thai QR Tag :',
					key: 'thaiQrTag',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Annotation :',
					key: 'annotation',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Account Servicer Reference :',
					key: 'accountServiceReference',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Exchange Rate :',
					key: 'exchangeRate',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Payment Type :',
					key: 'paymentType',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Additional Note :',
					key: 'additionalNote',
					values: information,
				})}
			</div>
			<div
				className={classnames(
					defaultClasses.table,
					'flex flex-wrap justify-between pb-4 px-6',
				)}
			>
				{TransactionDetailRows({
					id: 'transaction-additional-details-pay',
					data: [
						{
							id: 'header-pay',
							label: '',
							value: { payer: 'Payer', payee: 'Payee' },
							keys: ['payer', 'payee'],
						},
						{
							id: 'proxy-customer-type',
							label: 'Proxy Customer Type :',
							value: {
								payer: payer.proxyCustomerType,
								payee: payee.proxyCustomerType,
							},
							keys: ['payer', 'payee'],
						},
						{
							id: 'proxy-account-name',
							label: 'Proxy Account Name :',
							value: {
								payer: payer.proxyAccountName,
								payee: payee.proxyAccountName,
							},
							keys: ['payer', 'payee'],
						},
						{
							id: 'available-balance',
							label: 'Available Balance :',
							value: {
								payer: payer.availableBalance,
								payee: payee.availableBalance,
							},
							keys: ['payer', 'payee'],
						},
						{
							id: 'account-status-code',
							label: 'Account Status Code :',
							value: {
								payer: payer.accountStatusCode,
								payee: payee.accountStatusCode,
							},
							keys: ['payer', 'payee'],
						},
						{
							id: 'account-status-description',
							label: 'Account Status Description :',
							value: {
								payer: payer.accountStatusDescription,
								payee: payee.accountStatusDescription,
							},
							keys: ['payer', 'payee'],
						},
						{
							id: 'email-address',
							label: 'Email Address :',
							value: { payer: payer.emailAddress, payee: payee.emailAddress },
							keys: ['payer', 'payee'],
						},
						{
							id: 'mobile-number',
							label: 'Mobile Number :',
							value: { payer: payer.mobileNumber, payee: payee.mobileNumber },
							keys: ['payer', 'payee'],
						},
						{
							id: 'teca-Code',
							label: 'TEPA Code :',
							value: { payer: payer.tepaCode, payee: payee.tepaCode },
							keys: ['payer', 'payee'],
						},
						{
							id: 'fcd-amount',
							label: 'FCD Amount :',
							value: { payer: payer.fcdAmount, payee: payee.fcdAmount },
							keys: ['payer', 'payee'],
						},
						{
							id: 'fcd-currency',
							label: 'FCD Currency :',
							value: { payer: payer.fcdCurrency, payee: payee.fcdCurrency },
							keys: ['payer', 'payee'],
						},
						{
							id: 'fcd-equivalent-amount',
							label: 'FCD Equivalent Amount :',
							value: {
								payer: payer.fcdEquivalentAmount,
								payee: payee.fcdEquivalentAmount,
							},
							keys: ['payer', 'payee'],
						},
					],
				})}
			</div>
		</div>
	)
}

export default TransactionAdditionalDetails
