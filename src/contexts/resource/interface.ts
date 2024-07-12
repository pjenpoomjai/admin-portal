export interface IResourceModel {
	setResourceData(key: ResourceKey, data: IResourceData): void
	getResourceData(key: ResourceKey): IResourceData | null
}

export enum ResourceKey {
	Service = 'service',
	Status = 'status',
	Channel = 'channel',
	Currency = 'currency',
	PaymentMethod = 'paymentmethod',
	Classification = 'classification',
	TransactionType = 'transactionType',
	MasterConfig = 'masterConfig',
}

export interface IResourceData {
	status: ResourceStatus
	data: ILookupData[]
}

export interface ILookupData {
	name: string
	value: string
}

export enum ResourceStatus {
	Idle = 'idle',
	Loading = 'loading',
	Error = 'error',
	Success = 'success',
}

export interface IResourcesValue {
	resources: IResourceModel
}

export interface IResourcesAction {
	updateResource: (resource: IResourceModel) => void
	updateState: (resource: IResourcesValue) => void
}

export type IResourcesState = [IResourcesValue, IResourcesAction]
