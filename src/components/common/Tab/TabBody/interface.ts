export type animation = {
	initial?: object
	mount?: object
	unmount?: object
}
export interface ITabBodyProps {
	animation?: animation
	className?: string
	children: React.ReactNode
}
