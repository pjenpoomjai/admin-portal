import { consumeContextWithConfig } from 'x-core-modules/utils'
import {
	IConsumeResourceConfig,
	IConsumeResourceProps,
	IResourceProps,
} from './interface'
import { useResourceController } from './useController'

export const consumeResource = <CP extends IConsumeResourceProps>(
	config: IConsumeResourceConfig<CP>,
) =>
	consumeContextWithConfig<IResourceProps, CP>({
		...config,
		useController: useResourceController,
	})
