export interface ISiderProps {
	menus: IMenu[]
	handleOnClickMenu: (menu: IMenu) => void
	isOpen?: boolean
	handleOnClickOpen: () => void
	getIsActive: (menu: IMenu) => boolean
	getIsExpanded: (menu: IMenu) => boolean
}

export interface IMenu {
	id: string
	name: string
	url?: string
	dataId: string
	subMenu?: IMenu[]
	icon?: any
	activeIcon?: any
	roles?: string[]
}
