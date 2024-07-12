import Tab from 'components/common/Tab'
import { FC, SyntheticEvent } from 'react'
import TransactionAdditionalDetails from '../TransactionAdditionalDetails/TransactionAdditionalDetails'
import TransactionDetails from '../TransactionDetails/TransactionDetails'
import TransactionInformation from '../TransactionInformation/TransactionInformation'
import defaultClasses from './transactionView.module.css'
import { ITransactionView } from './interface'
import { TransactionTabEnum, transactionTabs } from '../../constant'
import TransactionHistoriesContainer from '../../TransactionHistories'

const TransactionView: FC<ITransactionView> = (props) => {
	const { transaction, selectedTab, tabHandler } = props
	const { information, details, additionalDetails } = transaction

	const getTabBody = () => {
		if (selectedTab === TransactionTabEnum.ADDITIONAL_DETAILS) {
			return (
				<TransactionAdditionalDetails additionalDetails={additionalDetails} />
			)
		} else if (selectedTab === TransactionTabEnum.HISTORY) {
			return <TransactionHistoriesContainer />
		}
		return <TransactionDetails details={details} />
	}

	return (
		<>
			<TransactionInformation information={information} />
			<Tab
				className="mx-[24px]"
				classNames={defaultClasses.tab}
				id="transaction"
				value={selectedTab}
				tabList={transactionTabs}
				onChange={(
					_e: SyntheticEvent<Element, Event>,
					value: TransactionTabEnum,
				) => {
					tabHandler(value)
				}}
			/>
			<div className="bg-white rounded-b-lg">{getTabBody()}</div>
		</>
	)
}

export default TransactionView
