import { DateTime } from 'luxon'
import { Entity } from '../entity'

export class MasterConfigTimeStamp {
	constructor(
		private _createdDateTime: DateTime,
		private _createdBy: string,
		private _updatedDateTime: DateTime,
		private _updatedBy: string,
	) {}

	public get createdDateTime(): DateTime {
		return this._createdDateTime
	}

	public get createdBy(): string {
		return this._createdBy
	}

	public get updatedDateTime(): DateTime {
		return this._updatedDateTime
	}

	public get updatedBy(): string {
		return this._updatedBy
	}
}

export class MasterConfig<C> extends Entity {
	constructor(
		id: string,
		private _config: C,
		private _timeStamp: MasterConfigTimeStamp,
	) {
		super(id)
	}

	public get config(): C {
		return this._config
	}

	public get timeStamp(): MasterConfigTimeStamp {
		return this._timeStamp
	}
}
