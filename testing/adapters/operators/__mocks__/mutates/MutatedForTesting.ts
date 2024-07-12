import { Mutated } from 'adapters/operators/mutates/base'
import { EndpointKey } from 'shared/adapters/interfaces'
import { IApiOptions } from 'x-core-modules/adapter/link'

export class MutatedForTesting extends Mutated {
	public testPost(
		key: EndpointKey,
		url: string,
		data: any,
		options?: IApiOptions,
	) {
		return this.post(key, url, data, options)
	}

	public testPut(
		key: EndpointKey,
		url: string,
		data: any,
		options?: IApiOptions,
	) {
		return this.put(key, url, data, options)
	}

	public testPatch(
		key: EndpointKey,
		url: string,
		data: any,
		options?: IApiOptions,
	) {
		return this.patch(key, url, data, options)
	}

	public testDelete(key: EndpointKey, url: string, options?: IApiOptions) {
		return this.delete(key, url, options)
	}
}
