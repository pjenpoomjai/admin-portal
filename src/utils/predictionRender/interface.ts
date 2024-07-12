export interface IDataListPrediction<V = any, R = any> {
	validator: (value: V) => boolean
	result: R
}

export type predictionSelectUtilType = (
	dataListPrediction: IDataListPrediction[],
	validator: IDataListPrediction['result'],
	defaultResult?: any,
) => IDataListPrediction['result']
