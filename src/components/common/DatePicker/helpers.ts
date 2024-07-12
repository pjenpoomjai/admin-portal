import {
	IPredictionCustomType,
	ICustomComponent,
	ComponentCustomType,
} from './interface'

export const CUSTOM_COMPONENT: IPredictionCustomType[] = [
	{
		keyCustom: 'ActionBar',
		keyProps: 'actionBar',
		typeCustom: 'actionBar',
	},
]

export const predictionCustomProps = (
	customProps: ICustomComponent<ComponentCustomType>[],
	config: IPredictionCustomType[],
) => {
	return customProps.reduce(
		(accumulator, current) => {
			const { customComponent, customProps } = accumulator
			const currentConfig = config.find(
				(item) => item.typeCustom === current.type,
			)
			if (!currentConfig) {
				return accumulator
			}
			return {
				customComponent: Object.assign(customComponent, {
					[currentConfig.keyCustom]: current.component,
				}),
				customProps: Object.assign(customProps, {
					[currentConfig.keyProps]: current.props,
				}),
			}
		},
		{
			customComponent: {},
			customProps: {},
		},
	)
}
