'use client'
import NoResultFound from 'components/NoResultFound/NoResultFound'
import KeyboardArrowDownIcon from 'components/common/Icon/KeyboardArrowDown'
import Link from 'next/link'
import { FC } from 'react'
import Typography from 'src/components/common/Typography'
import { useTransactionsInformationController } from './controller'
import TransactionView from './views/TransactionView/TransactionView'
import { ErrorType } from 'adapters/error'
import ErrorSystem from 'components/ErrorSystem/ErrorSystem'

const Container: FC<ReturnType<typeof useTransactionsInformationController>> = (
	props,
) => {
	const { transaction, selectedTab, errorCode, tabHandler, reloadDetail } =
		props

	const getBody = () => {
		if (transaction) {
			return (
				<TransactionView
					transaction={transaction}
					selectedTab={selectedTab}
					tabHandler={tabHandler}
				/>
			)
		}
		if (errorCode === ErrorType.DATA_NOT_FOUND) {
			return (
				<NoResultFound className="w-full flex flex-col py-32 items-center bg-white rounded-xl" />
			)
		}
		if (errorCode === ErrorType.SOMETHING_WENT_WRONG) {
			return (
				<ErrorSystem
					className="w-full flex flex-col py-10 items-center bg-white rounded-xl"
					callback={() => reloadDetail()}
				/>
			)
		}
		return <></>
	}

	return (
		<div className="w-full">
			<Typography
				id="search-transactions"
				className="text-xl font-semibold text-indigo-500 pb-6"
			>
				Transactions
			</Typography>
			<div className="flex items-center pb-6">
				<Link href="/transactions">
					<Typography
						id="transaction-search-step"
						className="hover:underline text-gray-400"
					>
						Transactions
					</Typography>
				</Link>
				<KeyboardArrowDownIcon className="transform -rotate-90" />
				<Typography id="transaction-detail-step" className="text-indigo-500">
					Transactions Details
				</Typography>
			</div>
			{getBody()}
		</div>
	)
}

export default Container
