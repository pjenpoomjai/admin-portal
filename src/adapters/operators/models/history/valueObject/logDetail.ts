import { LogInformation } from './logInformation'

export class LogDetail {
	private _logDateTime: string
	private _information: LogInformation
	private _externalCode: string
	private _externalDescription: string

	constructor(
		logDateTime: string,
		information: LogInformation,
		externalCode: string,
		externalDescription: string,
	) {
		this._logDateTime = logDateTime
		this._information = information
		this._externalCode = externalCode
		this._externalDescription = externalDescription
	}

	public setLogDateTime(dateTime: string) {
		return new LogDetail(
			dateTime,
			this._information,
			this._externalCode,
			this._externalDescription,
		)
	}

	public setInformation(information: LogInformation) {
		return new LogDetail(
			this._logDateTime,
			information,
			this._externalCode,
			this._externalDescription,
		)
	}

	public setExternalCode(code: string) {
		return new LogDetail(
			this._logDateTime,
			this._information,
			code,
			this._externalDescription,
		)
	}

	public setExternalDescription(description: string) {
		return new LogDetail(
			this._logDateTime,
			this._information,
			this._externalCode,
			description,
		)
	}

	get logDateTime() {
		return this._logDateTime
	}

	get information() {
		return this._information
	}

	get externalCode() {
		return this._externalCode
	}

	get externalDescription() {
		return this._externalDescription
	}
}
