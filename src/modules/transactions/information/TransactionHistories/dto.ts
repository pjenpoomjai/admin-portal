import { ModelHistories } from 'adapters/operators/models'
import { defaultTo, isNil } from 'lodash'
import { IDataTable } from './interface'

export const transformResponseToTableDisplay = (
	data: ModelHistories.History | null,
): IDataTable[] => {
	if (isNil(data)) {
		return []
	}

	return data.logDetails.map((log) => {
		return {
			referenceId: data.referenceId,
			flow: data.flow,
			logDatetime: log.logDateTime,
			event: defaultTo(log.information.event, ''),
			to: defaultTo(log.information.to, ''),
			externalCode: defaultTo(log.externalCode, ''),
			externalDescription: defaultTo(log.externalDescription, ''),
		}
	})
}
