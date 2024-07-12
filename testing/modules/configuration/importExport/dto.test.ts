import { ModelConfiguration } from 'adapters/operators/models'
import { mapConfigurationImport } from 'modules/configuration/importExport/dto'
import configurationImportResponse from 'testing/adapters/operators/queries/configuration/__mocks__/configurationImportResponse.json'
import configurationImportResponseFail from 'testing/adapters/operators/queries/configuration/__mocks__/configurationImportResponseFail.json'
import {
	expectConfigurationImportProcessDto,
	expectConfigurationImportProcessFailDetailDto,
} from 'testing/adapters/operators/queries/configuration/__mocks__/expectImportConfigurationDto'

const expectProcess = configurationImportResponse.data.process
const expectProcessFail = configurationImportResponseFail.data.processFailDetail

export const mockProcess = [
	{
		configName: expectProcess[0].configName,
		new: expectProcess[0].record.new,
		update: expectProcess[0].record.new,
	},
	{
		configName: expectProcess[1].configName,
		new: expectProcess[1].record.new,
		update: expectProcess[1].record.new,
	},
]

export const mockProcessFail = [
	{
		configName: expectProcessFail[0].configName,
		target: [
			{
				column: expectProcessFail[0].target[0].column.toString(),
				detail: expectProcessFail[0].target[0].detail,
				row: expectProcessFail[0].target[0].row.toString(),
			},
			{
				column: expectProcessFail[0].target[1].column.toString(),
				detail: expectProcessFail[0].target[1].detail,
				row: expectProcessFail[0].target[1].row.toString(),
			},
			,
		],
	},
	{
		configName: expectProcessFail[1].configName,
		target: [
			{
				column: expectProcessFail[1].target[0].column.toString(),
				detail: expectProcessFail[1].target[0].detail,
				row: expectProcessFail[1].target[0].row.toString(),
			},
		],
	},
]

describe('Configuration Import Export : dto', () => {
	it('Should map mapConfigurationImport correctly', () => {
		const { process, processFailDetail } = mapConfigurationImport(
			new ModelConfiguration.ConfigurationImport(
				expectConfigurationImportProcessDto,
				expectConfigurationImportProcessFailDetailDto,
			),
		)
		expect(process).toEqual(mockProcess)
		expect(processFailDetail).toEqual(mockProcessFail)
	})
})
