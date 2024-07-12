import { cloneDeep } from 'lodash'
import { IDataListPrediction, predictionSelectUtilType } from './interface'

export const predictionSelectUtil: predictionSelectUtilType = (
	dataListPrediction: IDataListPrediction[],
	validator: IDataListPrediction['result'],
	defaultResult,
) => {
	const cloneDataPrediction = cloneDeep(dataListPrediction)
	return cloneDataPrediction.reduce((acc, current, i, arr) => {
		if (current.validator(validator)) {
			arr.splice(0)
			return current.result
		}
		return acc
	}, defaultResult)
}
