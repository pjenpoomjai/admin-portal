import { ApiError, ErrorType, Message, PmtStatusCode } from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { ModelConfiguration } from 'adapters/operators/models'
import { EndpointKey } from 'shared/adapters/interfaces'
import {
	IConfigurationImportRequest,
	IConfigurationQuery,
} from 'shared/adapters/interfaces/config/queries'
import { Query } from '../base'
import { transformResponseConfigurationImport } from './dto'
import get from 'lodash/get'

export class ConfigurationQuery extends Query implements IConfigurationQuery {
	public async configurationImport(
		payload: IConfigurationImportRequest,
	): Promise<ModelConfiguration.ConfigurationImport> {
		try {
			const formData = new FormData()
			formData.append(
				'uploadFile',
				get(payload.uploadFile, '[0]'),
				get(payload.uploadFile, '[0].name'),
			)
			const response: any = await this._api.post(
				EndpointKey.pymd,
				RoutePath.PymdConfigurationImport,
				'',
				formData,
				{ headers: { 'content-type': 'multipart/form-data' } },
			)

			return transformResponseConfigurationImport(response.data, true)
		} catch (e) {
			if (
				e instanceof ApiError &&
				e.message.message === PmtStatusCode.PMT_2007
			) {
				return transformResponseConfigurationImport(e.data?.data, false)
			}

			if (
				e instanceof ApiError &&
				(e.message.message === PmtStatusCode.PMT_2015 ||
					e.message.message === PmtStatusCode.PMT_2016)
			) {
				const description = e.data.status.description
				throw new Message(
					description,
					ErrorType.SOMETHING_WENT_WRONG,
					e.message.message,
				)
			}

			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}

	public async configurationExport(): Promise<any> {
		try {
			const response: any = await this._api.post(
				EndpointKey.pymd,
				RoutePath.PymdConfigurationExport,
				'',
				undefined,
				{ responseType: 'arraybuffer' },
			)
			return { name: response.name, file: response.file }
		} catch (e) {
			throw new Message(
				'something went wrong',
				ErrorType.SOMETHING_WENT_WRONG,
				e?.message?.message,
			)
		}
	}
}
