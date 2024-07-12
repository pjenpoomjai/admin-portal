import classnames from 'classnames'
import { Typography } from 'components/common'
import { TypographyResource } from 'components/smartComponent/compositions/TypographyResource'
import { ResourceKey } from 'contexts/resource/interface'
import isNil from 'lodash/isNil'
import { FC } from 'react'
import { convertDateWithZone } from 'utils/convertDateWithZone'
import {
	IRenderItem,
	IRenderText,
	ITransactionInformation,
	TRenderItem,
} from './interface'
import defaultClasses from './transactionInformation.module.css'

const TypographyPlain: FC<any> = ({ label, ...props }) => {
	return <Typography {...props}>{label}</Typography>
}

export const renderText = <T extends object>(props: IRenderText<T>) => {
	const { id, resourceValueKey, value } = props
	const TypographyCondition = resourceValueKey
		? TypographyResource
		: TypographyPlain
	return (
		<TypographyCondition
			resourcekey={resourceValueKey}
			id={id}
			className="break-words"
			label={value || '-'}
			notmatchlabel="-"
		/>
	)
}

export const renderItem = <T extends object>(props: IRenderItem<T>) => {
	const { label, key, values, customText, resourceValueKey, renderValue } =
		props
	const value = customText ? customText() : (values[key] as string)
	const render = renderValue || renderText

	return (
		<div className="flex w-[calc(50%-12px)] py-2 px-3">
			<div className="pr-2 w-2/5">
				<Typography
					id={`${String(key)}-information-field`}
					className="font-semibold break-words"
				>
					{label}
				</Typography>
			</div>
			<div className="pl-2 w-3/5">
				{render({
					id: `${String(key)}-information-value`,
					value: value,
					resourceValueKey,
				})}
			</div>
		</div>
	)
}

const TransactionInformation: React.FC<ITransactionInformation> = (props) => {
	const { information } = props

	return (
		<div className="rounded-lg bg-white mb-6 w-full">
			<Typography
				id="transaction-information"
				className="text-lg font-semibold text-white px-6 py-4 bg-indigo-500 rounded-t-lg"
			>
				Transaction
			</Typography>
			<div
				className={classnames(
					defaultClasses.table,
					'flex flex-wrap justify-between px-6 py-4',
				)}
			>
				{renderItem<TRenderItem>({
					label: 'Transaction Id  :',
					key: 'transactionId',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Status  :',
					key: 'status',
					values: information,
					resourceValueKey: ResourceKey.Status,
				})}
				{renderItem<TRenderItem>({
					label: 'Transaction Reference  :',
					key: 'transactionReference',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Activity Domain  :',
					key: 'activityDomain',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Instruction Reference  :',
					key: 'instructionReference',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Linked Transaction  :',
					key: 'linkedTransaction',
					values: information,
					renderValue: ({ id, value }) => {
						if (value.length === 0) {
							return (
								<Typography id={`${id}-link`} className="break-words">
									-
								</Typography>
							)
						}
						return (
							<>
								{(value as unknown as string[]).map((item) => {
									return (
										<Typography
											key={`${id}-link-${item}`}
											id={`${id}-link-${item}`}
											className="break-words"
										>
											{item}
										</Typography>
									)
								})}
							</>
						)
					},
				})}
				{renderItem<TRenderItem>({
					label: 'Transaction End To End Id  :',
					key: 'transactionEndToEndId',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Amount  :',
					key: 'amount',
					values: information,
					customText: () => {
						if (information.amount) {
							return `${information.amount}${
								information.currencyCode ? ` ${information.currencyCode}` : ''
							}`
						}
						return ''
					},
				})}
				{renderItem<TRenderItem>({
					label: 'Transaction Date  :',
					customText: () => {
						return information.transactionDate.isValid
							? convertDateWithZone(information.transactionDate)
							: ''
					},
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Latest Submission  :',
					customText: () => {
						return information.latestSubmission.isValid
							? information.latestSubmission.toFormat('dd-MM-yyyy HH:mm:ss')
							: ''
					},
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Classification  :',
					key: 'classification',
					values: information,
					resourceValueKey: ResourceKey.Classification,
				})}
				{renderItem<TRenderItem>({
					label: 'Bank  :',
					key: 'bank',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Service :',
					key: 'service',
					values: information,
					resourceValueKey: ResourceKey.Service,
				})}
				{renderItem<TRenderItem>({
					label: 'Incoming Banking Entity  :',
					key: 'incomingBankingEntity',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Servicer Transaction Id  :',
					key: 'servicerTransactionId',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Outgoing Banking Entity  :',
					key: 'outgoingBankingEntity',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'Importance  :',
					key: 'importance',
					values: information,
				})}
				{renderItem<TRenderItem>({
					label: 'ISO20022 Flag  :',
					customText: () => {
						if (isNil(information?.iso20022Flag)) {
							return ''
						}
						return information.iso20022Flag ? 'T' : 'F'
					},
					values: information,
				})}
			</div>
		</div>
	)
}

export default TransactionInformation
