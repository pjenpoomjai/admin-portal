import { ComponentProps, ElementType } from 'react'

export type ComponentCustomType = 'actionBar'
export interface IPredictionCustomType {
	keyCustom: string
	keyProps: string
	typeCustom: ComponentCustomType
}

export interface ICustomComponent<T> {
	type: T
	component: ElementType<any>
	props: ComponentProps<any>
}

export const Date_Picker_Const = {
	placeholder: 'ddmmyyyy',
	inputFormat: 'dd/MM/yyyy',
}

export const DateTime_Picker_Const = {
	placeholder: 'ddmmyyyy',
	inputFormat: 'dd/MM/yyyy HH:mm:ss',
}
