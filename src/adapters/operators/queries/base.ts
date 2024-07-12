import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { IApiOptions, IMultiLink } from 'x-core-modules/adapter/link'

export class Query {
	constructor(protected _api: IMultiLink<EndpointKey, IHeader>) {}

	protected get(key: EndpointKey, url: string, options?: IApiOptions) {
		return this._api.get(key, url, options?.versioning ?? '', options)
	}

	protected post(
		key: EndpointKey,
		url: string,
		data: any,
		options?: IApiOptions,
	) {
		return this._api.post(key, url, options?.versioning ?? '', data, options)
	}

	protected patch(
		key: EndpointKey,
		url: string,
		data: any,
		options?: IApiOptions,
	) {
		return this._api.patch(key, url, options?.versioning ?? '', data, options)
	}
}
