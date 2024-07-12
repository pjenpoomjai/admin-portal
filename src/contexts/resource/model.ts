import { IResourceData, ResourceKey, IResourceModel } from './interface'

export class Resource implements IResourceModel {
	static readonly ResourceKey = ResourceKey
	private _resource: Map<ResourceKey, IResourceData> = new Map()

	public setResourceData(key: ResourceKey, data: IResourceData) {
		this._resource.set(key, { ...data })
	}

	public getResourceData(key: ResourceKey): null | IResourceData {
		if (!this._resource.has(key)) {
			return null
		}
		return this._resource.get(key)
	}
}
