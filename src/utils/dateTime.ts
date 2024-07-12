import { DateTime } from 'luxon'

export const diffNowWithTimestamp = (time: number) => {
	return DateTime.fromMillis(time * 1000).diffNow().milliseconds / 1000
}
