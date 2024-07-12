import { BaseSyntheticEvent } from 'react'

export interface ISearchActionButtons {
	isAdvanceSearch: boolean
	isEnabledSearch: boolean
	handleOnClickAdvanceSearch: () => void
	onSearch: (e?: BaseSyntheticEvent<object, any, any>) => Promise<void>
	onResetFormHandler(): void
}
