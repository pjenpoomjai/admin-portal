export class LogInformation {
	private _from: string
	private _to: string
	private _event: string
	private _resource: string

	constructor(from: string, to: string, event: string, resource: string) {
		this._from = from
		this._to = to
		this._event = event
		this._resource = resource
	}

	get from(): string {
		return this._from
	}

	get to(): string {
		return this._to
	}

	get event(): string {
		return this._event
	}

	get resource(): string {
		return this._resource
	}

	public setFrom(from: string) {
		return new LogInformation(from, this._to, this._event, this._resource)
	}

	public setTo(to: string) {
		return new LogInformation(this._from, to, this._event, this._resource)
	}

	public setEvent(event: string) {
		return new LogInformation(this._from, this._to, event, this._resource)
	}

	public setResource(resource: string) {
		return new LogInformation(this._from, this._to, this._event, resource)
	}
}
