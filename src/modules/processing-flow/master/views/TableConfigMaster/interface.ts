import { IMasterConfig } from '../../interface'

export interface ITableMasterProps {
	data: IMasterConfig[]
	handleOnClickView: (value: string) => void
}
