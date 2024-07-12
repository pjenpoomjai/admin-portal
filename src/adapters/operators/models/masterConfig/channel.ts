import { MasterConfig } from './masterConfig'

export class ChannelInfo {
	constructor(
		private _channelId: string,
		private _channelCode: string,
		private _channelName: string,
		private _channelDescription: string | null,
		private _activeStatus: boolean,
	) {}

	public get channelId(): string {
		return this._channelId
	}

	public get channelCode(): string {
		return this._channelCode
	}

	public get channelName(): string {
		return this._channelName
	}

	public get channelDescription(): string {
		return this._channelDescription
	}

	public get activeStatus(): boolean {
		return this._activeStatus
	}
}

export class MasterConfigChannel extends MasterConfig<ChannelInfo> {}
