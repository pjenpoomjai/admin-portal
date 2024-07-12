import { CommonProps } from '@mui/material/OverridableComponent'

export enum ErrorType {
	PERMISSION = 'permission',
	SOMETHING_WENT_WRONG = 'somethingWentWrong',
}

export interface IErrorSystem extends CommonProps {
	type?: ErrorType
	callback?: () => void
}
