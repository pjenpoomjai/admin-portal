import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'

const TransactionsInformationContainer = dynamic(
	() => import('modules/transactions/information'),
)

const TransactionView: NextPage = () => {
	const generateIdEmbed = useId(COMPONENT_TYPE.DIV)

	return (
		<div {...generateIdEmbed('transaction-detail-root')} className={'p-6'}>
			<TransactionsInformationContainer></TransactionsInformationContainer>
		</div>
	)
}

export default TransactionView
