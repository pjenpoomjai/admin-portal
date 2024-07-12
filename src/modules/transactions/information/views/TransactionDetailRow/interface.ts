import { ResourceKey } from 'contexts/resource/interface'

export interface ITransactionDetailRow<T> {
	id: string
	label: string
	keys: (keyof T)[]
	value: T
	customText?: () => string
}

export interface ITransactionDetailRowProps<T> {
	data: ITransactionDetailRow<T>
	resourceValueKey?: ResourceKey
}

export interface ITransactionDetailRowsProps<T> {
	id: string
	data: ITransactionDetailRow<T>[]
	resourceValueKey?: ResourceKey
}
