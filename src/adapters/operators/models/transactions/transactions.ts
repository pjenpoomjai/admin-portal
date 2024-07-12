import { Entity } from '../entity'
import { TransactionsInformation, TransactionTransfer } from './valueObject'

export class Transaction extends Entity {
	constructor(
		id: string,
		private _transactionId: string,
		private _information: TransactionsInformation,
		private _transfer: TransactionTransfer,
		private _status: string,
		private _creationDateTime: string, // ISODateTime
		private _isWhiteList?: boolean,
	) {
		super(id)
	}

	public get transactionId(): string {
		return this._transactionId
	}

	get information(): TransactionsInformation {
		return this._information
	}

	public get transfer(): TransactionTransfer {
		return this._transfer
	}

	public get status(): string {
		return this._status
	}

	public get creationDateTime(): string {
		return this._creationDateTime
	}

	public get isWhiteList(): boolean {
		return this._isWhiteList
	}
}
