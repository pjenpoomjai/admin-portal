import { MasterConfig } from './masterConfig'

export class TimeoutTypeInfo {
	constructor(
		private _timeoutTypeId: string,
		private _timeoutType: string,
		private _timeoutValue: number,
		private _minThreshold: number | null,
		private _maxThreshold: number | null,
		private _latencyOffset: number | null,
		private _activeStatus: boolean,
	) {}

	public get timeoutTypeId(): string {
		return this._timeoutTypeId
	}

	public get timeoutType(): string {
		return this._timeoutType
	}

	public get timeoutValue(): number {
		return this._timeoutValue
	}

	public get minThreshold(): number | null {
		return this._minThreshold
	}

	public get maxThreshold(): number | null {
		return this._maxThreshold
	}

	public get latencyOffset(): number | null {
		return this._latencyOffset
	}

	public get activeStatus(): boolean {
		return this._activeStatus
	}
}

export class MasterConfigTimeoutType extends MasterConfig<TimeoutTypeInfo> {}
