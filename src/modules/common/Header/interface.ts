export interface IHeader {}
export interface IHeaderRenderProps {
	onLogoutHandler(): void
	activeValue: string
	displayName: string
	onSelectMenuHandler(val: string): void
	menus: IMenu[]
	lastLogon: string
}

export interface IMenu {
	key: string
	value: string
	label: string
	prefixIcon?: React.ReactElement
}
