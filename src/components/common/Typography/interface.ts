import { ElementType } from 'react'

export type variant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'lead'
	| 'paragraph'
	| 'small'
export type colors =
	| 'blue-gray'
	| 'gray'
	| 'brown'
	| 'deep-orange'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'light-green'
	| 'green'
	| 'teal'
	| 'cyan'
	| 'light-blue'
	| 'blue'
	| 'indigo'
	| 'deep-purple'
	| 'purple'
	| 'pink'
	| 'red'
export type color = 'inherit' | 'current' | 'black' | 'white' | colors

export interface ITypographyProps {
	id: string
	disabled?: boolean
	variant?: variant
	color?: color
	textGradient?: boolean
	as?: ElementType
	className?: string
	children?: React.ReactNode
	style?: object
}
