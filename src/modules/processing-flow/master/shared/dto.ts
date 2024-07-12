import { ModelPagination } from 'adapters/operators/models'
import { IPagination } from 'components/common/Pagination'
import get from 'lodash/get'

export const mapMasterConfigPage = (
	data: ModelPagination.Pagination<any>,
): Pick<IPagination, 'page' | 'rowsPerPage' | 'totalPages' | 'totalRows'> => {
	const total = get(data, 'total', 0)
	const rowsPerPage = get(data, 'rowsPerPage', 0)
	return {
		page: get(data, 'page', 1),
		rowsPerPage: rowsPerPage,
		totalPages: Math.ceil(total / rowsPerPage) || 1,
		totalRows: total,
	}
}
