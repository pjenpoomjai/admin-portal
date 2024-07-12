import { DateTime } from 'luxon'

export interface ITimeoutType {
	number: number
	timeoutTypeId: string
	timeoutType: string
	timeoutValue: number
	minThreshold: number | null
	maxThreshold: number | null
	latencyOffset: number | null
	activeStatus: boolean
	createdDateTime: DateTime
	createdBy: string
	updatedDateTime: DateTime
	updatedBy: string
}
