import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'

const TransactionsInquiryContainer = dynamic(
	() => import('modules/transactions/inquiry'),
)

const Transaction: NextPage = () => {
	const generateIdEmbed = useId(COMPONENT_TYPE.DIV)

	return (
		<div {...generateIdEmbed('transactions-root')} className={'p-4'}>
			<TransactionsInquiryContainer></TransactionsInquiryContainer>
		</div>
	)
}

export default Transaction
