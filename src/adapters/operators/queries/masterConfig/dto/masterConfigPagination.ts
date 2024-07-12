import { ModelPagination } from 'adapters/operators/models'
import { MasterConfig } from 'adapters/operators/models/masterConfig'
import { get } from 'lodash'
import { IMasterConfigPagination } from '../interface'

export const transformMasterConfigPagination =
	<T extends IMasterConfigPagination>(masterConfig: T) =>
	<C, D extends MasterConfig<C>>(data: D[]) => {
		return new ModelPagination.Pagination(
			data,
			get(masterConfig, 'pageNo'),
			get(masterConfig, 'pageLimit'),
			get(masterConfig, 'totalRow'),
		)
	}
