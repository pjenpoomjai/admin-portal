export interface IAuthenMutated {
	logout: () => Promise<boolean>
	clearSession: () => Promise<boolean>
}
