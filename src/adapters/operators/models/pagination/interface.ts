import { ErrorType } from 'adapters/error/interface'

export type TEmptyState =
	| ErrorType.DATA_NOT_FOUND
	| ErrorType.DATA_NOT_FOUND_NOT_IN_WHITELIST
	| ErrorType.DATA_NOT_FOUND_IN_WHITELIST
	| null

export interface IDataPagination {
	id: string
}
