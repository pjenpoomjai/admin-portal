import { ModelConfiguration } from 'adapters/operators/models'
import defaultTo from 'lodash/defaultTo'
import {
	IConfigurationImportProcess,
	IConfigurationImportProcessFailDetail,
	IConfigurationImportResponse,
} from './interface'

export const transformResponseConfigurationImport = (
	response: IConfigurationImportResponse,
	isSuccess: boolean,
): ModelConfiguration.ConfigurationImport => {
	const { process, processFailDetail } = response

	return new ModelConfiguration.ConfigurationImport(
		transformResponseConfigurationImportProcess(isSuccess ? process : []),
		transformResponseConfigurationImportProcessFailDetail(
			isSuccess ? [] : processFailDetail,
		),
	)
}

const transformResponseConfigurationImportProcess = (
	process: IConfigurationImportProcess[],
) => {
	return defaultTo(process, []).map(({ configName, record }) => {
		return new ModelConfiguration.Process(
			configName,
			new ModelConfiguration.ProcessRecord(record.new, record.update),
		)
	})
}

const transformResponseConfigurationImportProcessFailDetail = (
	processFailDetail: IConfigurationImportProcessFailDetail[],
) => {
	return defaultTo(processFailDetail, []).map(({ configName, target }) => {
		return new ModelConfiguration.ProcessFailDetail(
			configName,
			target.map(({ row, column, detail }) => {
				return new ModelConfiguration.ProcessFailDetailTarget(
					row,
					column,
					detail,
				)
			}),
		)
	})
}
