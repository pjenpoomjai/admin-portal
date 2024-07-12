import { IRoleDetail, RoleType } from './interface'

export class Role {
	private _id: string
	private _detail: IRoleDetail
	private _type: RoleType
	private _subRoles?: Role[]

	constructor(
		id: string,
		detail: IRoleDetail,
		type: RoleType,
		subRoles: Role[] = [],
	) {
		this._id = id
		this._detail = detail
		this._type = type
		this._subRoles = subRoles?.slice()
	}

	public get id(): string {
		return this._id
	}

	public get detail(): IRoleDetail {
		return this._detail
	}

	public get type(): RoleType {
		return this._type
	}

	public get subRoles(): Role[] {
		return this._subRoles.slice()
	}
}
