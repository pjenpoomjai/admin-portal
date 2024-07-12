import { IConfigurationImportRequest } from 'shared/adapters/interfaces/config/queries'
import { IAppContextProps } from 'shared/appContext/interfaces'

export interface IFormData {
	file: File
}

export interface IUseFormHandle {
	getContextConsumer: IAppContextProps['getContextConsumer']
	upload: (request: IConfigurationImportRequest) => void
}

export interface IUseResourceHandler {
	getContextConsumer: IAppContextProps['getContextConsumer']
	getProviderConsumer: IAppContextProps['getProviderConsumer']
}

export interface IConfigurationImportProcess {
	configName: string
	new: number
	update: number
}

export interface IConfigurationImportProcessFailDetailTarget {
	row: string
	column: string
	detail: string
}

export interface IConfigurationImportProcessFailDetail {
	configName: string
	target: IConfigurationImportProcessFailDetailTarget[]
}

export interface IConfigurationImport {
	process: IConfigurationImportProcess[]
	processFailDetail: IConfigurationImportProcessFailDetail[]
}

export interface IProcessFailDetailDisplay {
	configName: string
	row: string
	column: string
	detail: string
}
