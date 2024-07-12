import defaultTo from 'lodash/defaultTo'
import { ILookupData, ILookupDataResponse } from './interface'
import get from 'lodash/get'
import { LookupData } from 'adapters/operators/models/resources'
import { LookupDataType } from 'adapters/operators/models/resources/interface'
import { ModelResources } from 'adapters/operators/models'
import { toLower } from 'lodash'

export const transformResponseWithResourceModel = (
	response: ILookupDataResponse,
) => {
	const lookupDataList = defaultTo(get(response, 'data'), [])
		.filter((row: ILookupData) => {
			const lookupType: string = get(row, 'lookupType')
			const listOfValue = Object.values(LookupDataType).map((type: any) =>
				toLower(type),
			)
			return listOfValue.includes(
				toLower(lookupType) as unknown as LookupDataType,
			)
		})
		.map((row: ILookupData) => {
			const lookupType = get(row, 'lookupType')
			return new LookupData(
				lookupType as unknown as LookupDataType,
				get(row, 'lookupName'),
				get(row, 'lookupValue'),
			)
		})

	return new ModelResources.Resources('01', lookupDataList)
}
