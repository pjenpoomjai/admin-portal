import { ConfigurationImport } from 'adapters/operators/models/configuration'
import defaultTo from 'lodash/defaultTo'
import { IConfigurationImport } from './interface'

export const mapConfigurationImport = (
	configurationImport: ConfigurationImport,
): IConfigurationImport => {
	return {
		process: configurationImport.process.map(({ configName, record }) => {
			return {
				configName,
				new: record.new,
				update: record.update,
			}
		}),
		processFailDetail: configurationImport.processFailDetail.map(
			({ configName, target }) => {
				return {
					configName,
					target: target.map(({ column, detail, row }) => ({
						column: defaultTo(column?.toString(), '-'),
						detail,
						row: defaultTo(row?.toString(), '-'),
					})),
				}
			},
		),
	}
}
