import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import classnames from 'classnames'
import NoResultFound from 'components/NoResultFound/NoResultFound'
import { Button, Table, Typography } from 'components/common'
import defaultTo from 'lodash/defaultTo'
import isNil from 'lodash/isNull'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { FC } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import { convertDateWithZone } from 'utils/convertDateWithZone'
import useId from 'utils/useId'
import { ITransaction } from '../../interface'
import { ITableTransactionsProps } from './interface'
import defaultClasses from './tableTransactions.module.css'

enum ColumKey {
	TRANSACTION_ID = 'transaction-id',
	SERVICE = 'service',
	TRANSACTION_END_TO_END_ID = 'transaction-end-to-end-id',
	TRANSACTION_REFERENCE = 'transaction-reference',
	TRANSACTION_RECEIPT_NUMBER = 'transaction-receipt-number',
	CLASSIFICATION = 'classification',
	CREDIT_PARTY_BANK_CODE = 'credit-party-bank-code',
	DEBIT_PARTY_BANK_CODE = 'debitParty-bank-code',
	AMOUNT = 'amount',
	STATUS = 'status',
	CREATION_DATE_TIME = 'creation-date-time',
	DEBIT_ACCOUNT_NUMBER = 'debit-account-number',
	WHITE_LIST = 'white-list',
	CREDIT_ACCOUNT_NUMBER = 'credits-account-number',
	BILL_REFERENCE_1_REMITTANCE = 'bill-reference-1-remitance',
}

const TableTransactions: FC<ITableTransactionsProps> = (props) => {
	const {
		data,
		onSortDataTable,
		sortBy,
		targetRef,
		paginationProps,
		emptyText,
		handleOnDownloadTransaction,
	} = props
	const columns = [
		{
			id: ColumKey.TRANSACTION_ID,
			title: 'Transaction ID',
			dataIndex: 'transactionId',
			render: (value: string, { isBillPayment }: ITransaction) => {
				return (
					<Link
						href={`/transactions/${value}?type=${
							isBillPayment ? 'BILL_PAYMENT' : 'TRANSFER'
						}`}
						target="_blank"
					>
						<Typography
							variant="small"
							id={value}
							className="underline text-violet-500"
						>
							{value}
						</Typography>
					</Link>
				)
			},
		},
		{
			id: ColumKey.SERVICE,
			title: 'Service',
			dataIndex: 'service',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography variant="small" id={`${transactionId}-service`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.TRANSACTION_END_TO_END_ID,
			title: 'Transaction End To End ID',
			dataIndex: 'transactionEndToEndId',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography
						variant="small"
						id={`${transactionId}-transactionEndToEndId`}
					>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.TRANSACTION_REFERENCE,
			title: 'Transaction Reference',
			dataIndex: 'transactionReference',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography
						variant="small"
						id={`${transactionId}-transactionReference`}
					>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.TRANSACTION_RECEIPT_NUMBER,
			title: 'Transaction Receipt Number',
			dataIndex: 'transactionReceiptNumber',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography
						variant="small"
						id={`${transactionId}-transactionReceiptNumber`}
					>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.CLASSIFICATION,
			title: 'Classification',
			dataIndex: 'classification',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography variant="small" id={`${transactionId}-classification-`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.CREDIT_PARTY_BANK_CODE,
			title: 'Credit Party Bank Code',
			dataIndex: 'creditPartyBankCode',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography
						variant="small"
						id={`${transactionId}-creditPartyBankCode`}
					>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.DEBIT_PARTY_BANK_CODE,
			title: 'Debit Party Bank Code',
			dataIndex: 'debitPartyBankCode',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography
						variant="small"
						id={`${transactionId}-debitPartyBankCode`}
					>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.AMOUNT,
			title: 'Amount',
			dataIndex: 'amount',
			render: (
				value: string,
				{ transactionId, currencyCode }: ITransaction,
			) => {
				return (
					<Typography
						variant="small"
						id={`${transactionId}-amount`}
						className="text-end"
					>
						{`${defaultTo(value, '-')}${
							currencyCode ? ` ${currencyCode}` : ''
						}`}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.STATUS,
			title: 'Status',
			dataIndex: 'status',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography variant="small" id={`${transactionId}-status`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.CREATION_DATE_TIME,
			title: 'Creation Date Time',
			dataIndex: 'creationDateTime',
			sortable: true,
			render: (value: DateTime, { transactionId }: ITransaction) => {
				return (
					<Typography variant="small" id={`${transactionId}-creationDateTime`}>
						{value ? convertDateWithZone(value) : '-'}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.DEBIT_ACCOUNT_NUMBER,
			title: 'Debit Account Number',
			dataIndex: 'debitAccountNumber',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography
						variant="small"
						id={`${transactionId}-debitAccountNumber`}
					>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.CREDIT_ACCOUNT_NUMBER,
			title: 'Credit Account Number',
			dataIndex: 'creditAccountNumber',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography
						variant="small"
						id={`${transactionId}-creditAccountNumber`}
					>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.BILL_REFERENCE_1_REMITTANCE,
			title: 'Bill Reference 1/ Remittance Info',
			dataIndex: 'billReference1',
			render: (value: string, { transactionId }: ITransaction) => {
				return (
					<Typography variant="small" id={`${transactionId}-billReference1`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.WHITE_LIST,
			title: 'PYMD Whitelist',
			dataIndex: 'isWhiteList',
			render: (value: string, { transactionId }: ITransaction) => {
				const yesNoFlag = value ? 'Y' : 'N'
				return (
					<Typography variant="small" id={`${transactionId}-isWhiteList`}>
						{isNil(value) ? '-' : yesNoFlag}
					</Typography>
				)
			},
		},
	]

	const generateIdEmbed = useId(COMPONENT_TYPE.DIV)
	const renderEmpty = () => {
		return (
			<NoResultFound
				className="w-full flex flex-col py-10 items-center bg-white rounded-xl"
				label={emptyText}
			/>
		)
	}

	return (
		<div className="py-6">
			<div
				className="flex flex-col"
				{...generateIdEmbed('data-source-found')}
				ref={targetRef}
			>
				<Button
					id="export-result"
					onClick={() => handleOnDownloadTransaction()}
					disabled={data.length === 0}
					className="flex gap-2 py-1 px-5 w-[140px] mb-3 text-xs self-end !text-indigo-400 disabled:!text-gray-400 !border-indigo-400 disabled:!border-gray-400 disabled:bg-gray-100"
				>
					<ExitToAppIcon fontSize="small" />
					Export Result
				</Button>
				<Table
					id="transactions"
					classNames={classnames(
						defaultClasses.root,
						data.length === 0 ? '' : defaultClasses.foundRecord,
					)}
					columns={columns}
					dataSource={data}
					onSort={onSortDataTable}
					order={sortBy}
					emptyStateWithHeader={true}
					emptyState={renderEmpty()}
					paginationProps={paginationProps}
				/>
			</div>
		</div>
	)
}

export default TableTransactions
