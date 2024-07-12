export enum StepperType {
	TEXT = 'text',
	LINK = 'link',
}

export interface IStepper {
	type: StepperType
	label: string
	id: string
	href?: string
}

export interface IStepperProps {
	steps: IStepper[]
	className?: string
}
