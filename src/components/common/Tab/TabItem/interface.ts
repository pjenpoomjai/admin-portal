export interface ITabItemProps {
	value: any
	className?: string
	activeClassName?: string
	disabled?: boolean
	children?: React.ReactNode
	common?: Omit<React.ComponentProps<'li'>, 'ref'>
}
