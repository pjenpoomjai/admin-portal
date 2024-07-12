export class TransactionsInformation {
	private _service: string
	private _transactionEndToEndId: string
	private _transactionReference: string
	private _transactionReceiptNumber: string
	private _classification: string
	private _creditAccountNumber: string
	private _billReference1: string

	constructor(
		service: string,
		transactionEndToEndId: string,
		transactionReference: string,
		transactionReceiptNumber: string,
		classification: string,
		creditAccountNumber: string,
		billReference1: string,
	) {
		this._transactionReceiptNumber = transactionReceiptNumber
		this._service = service
		this._transactionReference = transactionReference
		this._transactionEndToEndId = transactionEndToEndId
		this._classification = classification
		this._billReference1 = billReference1
		this._creditAccountNumber = creditAccountNumber
	}

	get billReference1(): string {
		return this._billReference1
	}

	get creditAccountNumber(): string {
		return this._creditAccountNumber
	}

	get transactionEndToEndId(): string {
		return this._transactionEndToEndId
	}

	get transactionReference(): string {
		return this._transactionReference
	}

	get transactionReceiptNumber(): string {
		return this._transactionReceiptNumber
	}

	get classification(): string {
		return this._classification
	}

	get service(): string {
		return this._service
	}
}
