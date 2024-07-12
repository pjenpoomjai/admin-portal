export type orientation = 'horizontal' | 'vertical'

export interface ITabsProps {
	value: string
	children: React.ReactNode
	orientation?: orientation
	className?: string
}
