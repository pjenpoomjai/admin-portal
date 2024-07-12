import { ITab } from 'components/common/Tab'

export enum TransactionTabEnum {
	DETAILS = 'details',
	ADDITIONAL_DETAILS = 'additionalDetails',
	HISTORY = 'history',
}

export const transactionTabs: ITab[] = [
	{
		id: TransactionTabEnum.DETAILS,
		name: 'Details',
		value: TransactionTabEnum.DETAILS,
	},
	{
		id: TransactionTabEnum.ADDITIONAL_DETAILS,
		name: 'Additional Details',
		value: TransactionTabEnum.ADDITIONAL_DETAILS,
	},
	{
		id: TransactionTabEnum.HISTORY,
		name: 'History',
		value: TransactionTabEnum.HISTORY,
	},
]
