export enum ActionKey {
	GET_TRANSACTION_DETAIL = 'getTransactionDetail',
	GET_TRANSACTION_DETAIL_HISTORIES = 'getTransactionDetailHistories',
}

export interface Actions {
	type: ActionKey
	extraKey?: any
}
