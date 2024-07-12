import classnames from 'classnames'
import TransactionDetailRow from '../TransactionDetailRow/TransactionDetailRow'
import { ITransactionDetails } from './interface'
import defaultClasses from './transactionDetails.module.css'
import { ResourceKey } from 'contexts/resource/interface'

const TransactionDetails: React.FC<ITransactionDetails> = (props) => {
	const { details } = props
	const {
		incoming,
		outgoing,
		debitParty,
		creditParty,
		debitPartyAgent,
		creditPartyAgent,
		// intermediaryAgent,
	} = details

	return (
		<div className="pt-4">
			<div
				className={classnames(
					defaultClasses.table,
					'flex flex-wrap justify-between pb-4 px-6',
				)}
			>
				<TransactionDetailRow
					data={{
						id: 'header-income-outcome',
						label: '',
						value: { incoming: 'Incoming', outgoing: 'Outgoing' },
						keys: ['incoming', 'outgoing'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'instruction-id',
						label: 'Instruction Id :',
						value: {
							incoming: incoming.instructionId,
							outgoing: outgoing.instructionId,
						},
						keys: ['incoming', 'outgoing'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'business-participant',
						label: 'Business Participant :',
						value: {
							incoming: incoming.businessParticipant,
							outgoing: outgoing.businessParticipant,
						},
						keys: ['incoming', 'outgoing'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'scheme',
						label: 'Scheme :',
						value: { incoming: incoming.scheme, outgoing: outgoing.scheme },
						keys: ['incoming', 'outgoing'],
					}}
					resourceValueKey={ResourceKey.Classification}
				/>
				<TransactionDetailRow
					data={{
						id: 'service',
						label: 'Service :',
						value: { incoming: incoming.service, outgoing: outgoing.service },
						keys: ['incoming', 'outgoing'],
					}}
					resourceValueKey={ResourceKey.Service}
				/>
			</div>
			<div
				className={classnames(
					defaultClasses.table,
					'flex flex-wrap justify-between pb-4 px-6',
				)}
			>
				<TransactionDetailRow
					data={{
						id: 'header-debit-credit',
						label: '',
						value: { debitParty: 'Debit Party', creditParty: 'Credit Party' },
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'id',
						label: 'Id :',
						value: { debitParty: debitParty.id, creditParty: creditParty.id },
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'id-2-type',
						label: 'Id 2 Type :',
						value: {
							debitParty: debitParty.id2Type,
							creditParty: creditParty.id2Type,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'account',
						label: 'Account :',
						value: {
							debitParty: debitParty.account,
							creditParty: creditParty.account,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'name',
						label: 'Name :',
						value: {
							debitParty: debitParty.name,
							creditParty: creditParty.name,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'address-line-1',
						label: 'Address Line 1 :',
						value: {
							debitParty: debitParty.addressLine1,
							creditParty: creditParty.addressLine1,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'address-line-2',
						label: 'Address Line 2 :',
						value: {
							debitParty: debitParty.addressLine2,
							creditParty: creditParty.addressLine2,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'address-line-3',
						label: 'Address Line 3 :',
						value: {
							debitParty: debitParty.addressLine3,
							creditParty: creditParty.addressLine3,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'city',
						label: 'City :',
						value: {
							debitParty: debitParty.city,
							creditParty: creditParty.city,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'country',
						label: 'Country :',
						value: {
							debitParty: debitParty.country,
							creditParty: creditParty.country,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'postal-code',
						label: 'Postal Code :',
						value: {
							debitParty: debitParty.postalCode,
							creditParty: creditParty.postalCode,
						},
						keys: ['debitParty', 'creditParty'],
					}}
				/>
			</div>
			<div
				className={classnames(
					defaultClasses.table,
					'flex flex-wrap justify-between pb-4 px-6',
				)}
			>
				<TransactionDetailRow
					data={{
						id: 'header-debit-credit-agent',
						label: '',
						value: {
							debitPartyAgent: 'Debit Party Agent',
							creditPartyAgent: 'Credit Party Agent',
							intermediaryPartyAgent: 'Intermediary Agent',
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'id-type',
						label: 'Id Type :',
						value: {
							debitPartyAgent: debitPartyAgent.idType,
							creditPartyAgent: creditPartyAgent.idType,
							// intermediaryPartyAgent: intermediaryAgent.idType,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'id',
						label: 'Id :',
						value: {
							debitPartyAgent: debitPartyAgent.id,
							creditPartyAgent: creditPartyAgent.id,
							// intermediaryPartyAgent: intermediaryAgent.id,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'account',
						label: 'Account :',
						value: {
							debitPartyAgent: debitPartyAgent.account,
							creditPartyAgent: creditPartyAgent.account,
							// intermediaryPartyAgent: intermediaryAgent.account,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'name',
						label: 'Name :',
						value: {
							debitPartyAgent: debitPartyAgent.name,
							creditPartyAgent: creditPartyAgent.name,
							// intermediaryPartyAgent: intermediaryAgent.name,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'address-line-1',
						label: 'Address Line 1 :',
						value: {
							debitPartyAgent: debitPartyAgent.addressLine1,
							creditPartyAgent: creditPartyAgent.addressLine1,
							// intermediaryPartyAgent: intermediaryAgent.addressLine1,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'address-line-2',
						label: 'Address Line 2 :',
						value: {
							debitPartyAgent: debitPartyAgent.addressLine2,
							creditPartyAgent: creditPartyAgent.addressLine2,
							// intermediaryPartyAgent: intermediaryAgent.addressLine2,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'address-line-3',
						label: 'Address Line 3 :',
						value: {
							debitPartyAgent: debitPartyAgent.addressLine3,
							creditPartyAgent: creditPartyAgent.addressLine3,
							// intermediaryPartyAgent: intermediaryAgent.addressLine3,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'city',
						label: 'City :',
						value: {
							debitPartyAgent: debitPartyAgent.city,
							creditPartyAgent: creditPartyAgent.city,
							// intermediaryPartyAgent: intermediaryAgent.city,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'country',
						label: 'Country :',
						value: {
							debitPartyAgent: debitPartyAgent.country,
							creditPartyAgent: creditPartyAgent.country,
							// intermediaryPartyAgent: intermediaryAgent.country,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
				<TransactionDetailRow
					data={{
						id: 'postal-code',
						label: 'Postal Code :',
						value: {
							debitPartyAgent: debitPartyAgent.postalCode,
							creditPartyAgent: creditPartyAgent.postalCode,
							// intermediaryPartyAgent: intermediaryAgent.postalCode,
						},
						keys: [
							'debitPartyAgent',
							'creditPartyAgent',
							//'intermediaryPartyAgent',
						],
					}}
				/>
			</div>
		</div>
	)
}

export default TransactionDetails
