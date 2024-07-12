export class TransactionTransfer {
	private _creditPartyBankCode: string
	private _debitPartyBankCode: string
	private _amount: number
	private _currencyCode: string
	private _debitAccountNumber: string

	constructor(
		creditPartyBankCode: string,
		debitPartyBankCode: string,
		amount: number,
		currencyCode: string,
		debitAccountNumber: string,
	) {
		this._creditPartyBankCode = creditPartyBankCode
		this._debitPartyBankCode = debitPartyBankCode
		this._amount = amount
		this._currencyCode = currencyCode
		this._debitAccountNumber = debitAccountNumber
	}

	get creditPartyBankCode(): string {
		return this._creditPartyBankCode
	}
	get debitPartyBankCode(): string {
		return this._debitPartyBankCode
	}
	get amount(): number {
		return this._amount
	}
	get currencyCode(): string {
		return this._currencyCode
	}
	get debitAccountNumber(): string {
		return this._debitAccountNumber
	}
}
