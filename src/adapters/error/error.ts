import { ErrorType, PmtStatusCode } from './interface'

export class Message extends Error {
	private _code: ErrorType
	private _referenceId: string | null = null
	private _rawCode: PmtStatusCode | null = null

	constructor(
		message: string,
		code: ErrorType,
		rawCode: PmtStatusCode | null = null,
	) {
		super(message)
		this._code = code
		this._rawCode = rawCode
		Object.setPrototypeOf(this, Message.prototype)
	}

	get code(): ErrorType {
		return this._code
	}

	get rawCode(): PmtStatusCode {
		return this._rawCode
	}

	get stack() {
		return ''
	}

	set refId(refId: string | null) {
		this._referenceId = refId
	}

	get refId(): string | null {
		return this._referenceId
	}
}

export class MultipleMessage extends Error {
	private _fields: Message[] = []

	constructor(message: string, fields: Message[]) {
		super(message)
		this._fields = fields
		Object.setPrototypeOf(this, MultipleMessage.prototype)
	}

	get fields(): Message[] {
		return this._fields.slice()
	}

	set fields(fields: Message[]) {
		this._fields = fields.slice()
	}
}
