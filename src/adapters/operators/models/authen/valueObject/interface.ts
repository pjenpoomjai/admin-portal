export interface IRoleDetail {
	name: string
	paths: string[]
}

export enum RoleType {
	Function = 'function',
	Product = 'product',
	BankEntity = 'bankEntity',
}
