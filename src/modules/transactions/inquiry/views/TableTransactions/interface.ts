import { IPagination } from 'components/common/Pagination'
import { MutableRefObject } from 'react'
import { EnumSortBy } from 'types/base'
import { ITransaction } from '../../interface'

export interface ITableTransactionsProps {
	data: ITransaction[]
	onSortDataTable: (key: string, direction: EnumSortBy) => void
	sortBy: EnumSortBy
	orderBy: string
	targetRef: MutableRefObject<any>
	paginationProps: IPagination
	handleOnDownloadTransaction: () => void
	emptyText?: string
}
