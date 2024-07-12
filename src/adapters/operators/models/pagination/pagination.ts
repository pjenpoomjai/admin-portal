import { IDataPagination, TEmptyState } from './interface'

export class Pagination<S extends IDataPagination> {
	public static empty(state?: TEmptyState) {
		return new Pagination([], 0, 0, 0, state)
	}
	private _rowsPerPage: number
	private _total: number
	private _page: number
	private _emptyState: TEmptyState
	private _data: S[]

	constructor(
		data: S[],
		page: number,
		rowsPerPage: number,
		total: number,
		emptyState: TEmptyState = null,
	) {
		this._data = data.slice()
		this._rowsPerPage = rowsPerPage
		this._page = page
		this._total = total
		this._emptyState = emptyState
	}

	get rowsPerPage(): number {
		return this._rowsPerPage
	}

	get total(): number {
		return this._total
	}

	get page(): number {
		return this._page
	}

	get data(): S[] {
		return this._data.slice()
	}

	get emptyState(): TEmptyState {
		return this._emptyState
	}
}
