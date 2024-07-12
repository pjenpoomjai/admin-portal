import { Entity } from '../entity'
import { LogDetail } from './valueObject'

export class History extends Entity {
	private _referenceId: string
	private _type: string
	private _flow: string
	private _logDetails: LogDetail.LogDetail[]

	constructor(id: string, referenceId: string) {
		super(id)
		this._referenceId = referenceId
	}

	set type(typeVal: string) {
		this._type = typeVal
	}

	set flow(flowVal: string) {
		this._flow = flowVal
	}

	set logDetails(logs: LogDetail.LogDetail[]) {
		this._logDetails = logs.slice()
	}

	get type(): string {
		return this._type
	}

	get flow(): string {
		return this._flow
	}

	get referenceId(): string {
		return this._referenceId
	}

	get logDetails(): LogDetail.LogDetail[] {
		return this._logDetails.slice()
	}
}
