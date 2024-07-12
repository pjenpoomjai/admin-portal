import { Role } from './valueObject'

export class Authen {
	private _roles: Role[]
	private _roleName: string

	constructor(roles: Role[], roleName: string) {
		this._roles = roles
		this._roleName = roleName
	}

	get roles(): Role[] {
		return this._roles
	}

	get roleName(): string {
		return this._roleName
	}
}
