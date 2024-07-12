import { DateTime } from 'luxon'

export interface IChannel {
	number: number
	channelId: string
	channelCode: string
	channelName: string
	channelDescription: string | null
	activeStatus: boolean
	createdDateTime: DateTime
	createdBy: string
	updatedDateTime: DateTime
	updatedBy: string
}
