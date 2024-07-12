export interface IFieldSetProps {
	id: string
	children: React.ReactNode
	title: string
	tooltipText?: string
	isRequired?: boolean
}

export interface IRenderChildren {
	tooltipText?: string
	tooltipId?: string
	children: React.ReactNode
}
