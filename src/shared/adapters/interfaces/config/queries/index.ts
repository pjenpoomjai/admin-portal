import { ModelConfiguration } from 'adapters/operators/models'

export interface IConfigurationImportRequest {
	uploadFile: File
}
export interface IConfigurationQuery {
	configurationImport: (
		payload: IConfigurationImportRequest,
	) => Promise<ModelConfiguration.ConfigurationImport>
	configurationExport: () => Promise<any>
}
