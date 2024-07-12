import { LookupData } from 'adapters/operators/models/resources/valueObject/lookupData'
import { IMasterConfig, LOOK_UP_PATH } from './interface'

export const mapMasterConfig = (
	masterConfig: LookupData[],
): IMasterConfig[] => {
	return masterConfig
		.map(({ name, value }, index) => {
			return {
				number: index + 1,
				name,
				value: value,
				path: LOOK_UP_PATH[value],
			}
		})
		.filter(({ value }) => Boolean(value))
}
