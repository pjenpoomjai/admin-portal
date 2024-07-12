import { ModelConfiguration } from 'adapters/operators/models'
import configurationImportResponseJson from './configurationImportResponse.json'
import configurationImportResponseFailResponseJson from './configurationImportResponseFail.json'

const process = configurationImportResponseJson.data.process
const processFailDetail =
	configurationImportResponseFailResponseJson.data.processFailDetail

export const expectConfigurationImportProcessDto = [
	new ModelConfiguration.Process(
		process[0].configName,
		new ModelConfiguration.ProcessRecord(
			process[0].record.new,
			process[0].record.update,
		),
	),
	new ModelConfiguration.Process(
		process[1].configName,
		new ModelConfiguration.ProcessRecord(
			process[1].record.new,
			process[1].record.update,
		),
	),
]

export const expectConfigurationImportProcessFailDetailDto = [
	new ModelConfiguration.ProcessFailDetail(processFailDetail[0].configName, [
		new ModelConfiguration.ProcessFailDetailTarget(
			processFailDetail[0].target[0].row,
			processFailDetail[0].target[0].column,
			processFailDetail[0].target[0].detail,
		),
		new ModelConfiguration.ProcessFailDetailTarget(
			processFailDetail[0].target[1].row,
			processFailDetail[0].target[1].column,
			processFailDetail[0].target[1].detail,
		),
	]),
	new ModelConfiguration.ProcessFailDetail(processFailDetail[1].configName, [
		new ModelConfiguration.ProcessFailDetailTarget(
			processFailDetail[1].target[0].row,
			processFailDetail[1].target[0].column,
			processFailDetail[1].target[0].detail,
		),
	]),
]
