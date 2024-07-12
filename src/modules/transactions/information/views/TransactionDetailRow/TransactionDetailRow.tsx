import { Typography } from 'components/common'
import {
	ITransactionDetailRowProps,
	ITransactionDetailRowsProps,
} from './interface'
import { Fragment } from 'react'
import { renderText } from '../TransactionInformation/TransactionInformation'

const TransactionDetailRow = <T,>(props: ITransactionDetailRowProps<T>) => {
	const { data, resourceValueKey } = props
	const { id, label, keys, value, customText } = data

	if (keys.length === 1) {
		return (
			<div className="flex w-full">
				<div className="flex w-1/2 py-2 px-6">
					<Typography id={id} className="font-semibold break-words">
						{label}
					</Typography>
				</div>
				<div className="flex w-1/2 p-2">
					{renderText({
						id: `${id}-${String(keys[0])}`,
						value: customText ? customText() : (value[keys[0]] as string),
						resourceValueKey,
					})}
				</div>
			</div>
		)
	}

	const widthValue = keys.length === 2 ? 'w-2/5' : 'w-[calc((4/15)*100%)]'

	return (
		<div className="flex w-full">
			<div className="flex w-1/5 py-2 px-6">
				<Typography id={id} className="font-semibold break-words">
					{label}
				</Typography>
			</div>
			{keys.map((k) => {
				const displayValue = customText ? customText() : (value[k] as string)
				return (
					<div className={`flex ${widthValue} p-2`} key={`${id}-${String(k)}`}>
						{renderText({
							id: `${id}-${String(k)}`,
							value: displayValue,
							resourceValueKey,
						})}
					</div>
				)
			})}
		</div>
	)
}

export const TransactionDetailRows = <T,>(
	props: ITransactionDetailRowsProps<T>,
) => {
	const { data, id, resourceValueKey } = props

	return data.map((d) => {
		return (
			<Fragment key={`${id}-${d.id}`}>
				{TransactionDetailRow({ data: d, resourceValueKey })}
			</Fragment>
		)
	})
}

export default TransactionDetailRow
