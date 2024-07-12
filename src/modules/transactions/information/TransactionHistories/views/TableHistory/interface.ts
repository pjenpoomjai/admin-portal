import { ReactNode } from 'react'
import { IDataTable } from '../../interface'

export interface ITableHistoryProps {
	data: IDataTable[]
	isLoading: boolean
	handleOnClickExpandDescription: (render: ReactNode) => void
}
