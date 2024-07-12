import { Query } from 'adapters/operators/queries/base'
import { EndpointKey } from 'shared/adapters/interfaces'
import { IApiOptions } from 'x-core-modules/adapter/link'

export class QueryForTesting extends Query {
	public testGet(key: EndpointKey, url: string, options?: IApiOptions) {
		return this.get(key, url, options)
	}

	public testPost(
		key: EndpointKey,
		url: string,
		data: any,
		options?: IApiOptions,
	) {
		return this.post(key, url, data, options)
	}

	public testPatch(
		key: EndpointKey,
		url: string,
		data: any,
		options?: IApiOptions,
	) {
		return this.patch(key, url, data, options)
	}
}
