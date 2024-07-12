import { IMenu } from 'components/template/Sider/interface'

export interface ISidebar {
	menus: IMenu[]
	isOpen: boolean
	handleOnClickMenu: (menu: IMenu) => void
	handleOnClickOpen: () => void
	getIsActive: (menu: IMenu) => boolean
	getIsExpanded: (menu: IMenu) => boolean
}
