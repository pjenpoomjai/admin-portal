export interface IUserValue {
	isAuthenticated: boolean
}

export interface IUserAction {
	updateValue: (params: IUserValue) => void
}

export type TUserState = [IUserValue, IUserAction]
