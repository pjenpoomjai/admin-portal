import { ResourceKey } from 'contexts/resource/interface'
import {
	ITransaction,
	ITransactionInformation as ITransactionInformationData,
} from '../../interface'
import { ReactNode } from 'react'

export interface ITransactionInformation
	extends Pick<ITransaction, 'information'> {}

export type TRenderItem = Omit<
	ITransactionInformationData,
	'transactionDate' | 'latestSubmission'
>

export interface IRenderItem<T extends object> {
	label: string
	key?: keyof T
	values: T
	customText?: () => string
	renderValue?: (props: IRenderText<T>) => ReactNode
	resourceValueKey?: ResourceKey
}

export interface IRenderText<T extends object>
	extends Pick<IRenderItem<T>, 'resourceValueKey'> {
	id: string
	value: string
}
