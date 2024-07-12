import { DateTime } from 'luxon'

export interface IInstructionType {
	number: number
	instructionTypeId: string
	instructionType: string
	activeStatus: boolean
	createdDateTime: DateTime
	createdBy: string
	updatedDateTime: DateTime
	updatedBy: string
}
