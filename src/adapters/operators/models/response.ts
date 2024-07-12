export class Status {
	constructor(private _code: number | string, private _description: string) {}

	public get code(): number | string {
		return this._code
	}

	public set code(code: number | string) {
		this._code = code
	}

	public get description(): string {
		return this._description
	}

	public set description(description: string) {
		this._description = description
	}
}

export class Response<T = null> {
	constructor(private _status: Status, private _data: T) {}

	public get status(): Status {
		return this._status
	}

	public set status(status: Status) {
		this._status = status
	}

	public get data(): T {
		return this._data
	}

	public set data(data: T) {
		this._data = data
	}
}
