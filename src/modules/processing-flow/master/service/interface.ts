import { DateTime } from 'luxon'

export interface IService {
	number: number
	serviceId: string
	functionName: string
	systemName: string
	activeStatus: boolean
	createdDateTime: DateTime
	createdBy: string
	updatedDateTime: DateTime
	updatedBy: string
}
