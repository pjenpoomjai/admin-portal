import { MasterConfig } from './masterConfig'

export class ServiceInfo {
	constructor(
		private _serviceId: string,
		private _functionName: string,
		private _systemName: string,
		private _activeStatus: boolean,
	) {}

	public get serviceId(): string {
		return this._serviceId
	}

	public get functionName(): string {
		return this._functionName
	}

	public get systemName(): string {
		return this._systemName
	}

	public get activeStatus(): boolean {
		return this._activeStatus
	}
}

export class MasterConfigService extends MasterConfig<ServiceInfo> {}
