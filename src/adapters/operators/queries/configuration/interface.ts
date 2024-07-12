export interface IConfigurationImportProcessRecord {
	new: number
	update: number
}

export interface IConfigurationImportProcess {
	configName: string
	record: IConfigurationImportProcessRecord
}

export interface IConfigurationImportProcessFailDetailTarget {
	row: number | null
	column: number | null
	detail: string
}

export interface IConfigurationImportProcessFailDetail {
	configName: string
	target: IConfigurationImportProcessFailDetailTarget[]
}

export interface IConfigurationImportResponse {
	process: IConfigurationImportProcess[]
	processFailDetail: IConfigurationImportProcessFailDetail[]
}
