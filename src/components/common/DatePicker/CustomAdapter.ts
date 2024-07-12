import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DateTime, Info } from 'luxon'

export class CustomLuxonAdapter extends AdapterLuxon {
	public getWeekdays = (): string[] => {
		const weekDays = Info.weekdaysFormat('narrow', { locale: this.locale })
		const sunday = weekDays.splice(6, 1)
		weekDays.unshift(sunday[0])
		return weekDays
	}

	public startOfWeek = (value: DateTime) => {
		return value.startOf('week').minus({ day: 1 })
	}

	public getWeekArray = (date: DateTime) => {
		const start = date.startOf('month').startOf('week')
		const { days } = date
			.endOf('month')
			.endOf('week')
			.diff(start, 'days')
			.toObject()

		const weeks: DateTime[][] = []
		new Array<number>(Math.round(days))
			.fill(0)
			.map((_, i) => i)
			.map((day) => start.plus({ days: day }))
			.forEach((v, i) => {
				if (i === 0) {
					weeks.push([v.minus({ day: 1 })])
				}
				if ((i + 1) % 7 === 0 && i + 1 > 6) {
					weeks.push([v])
					return
				}

				weeks[weeks.length - 1].push(v)
			})
		const lastWeek = weeks[weeks.length - 1]
		if (lastWeek.length !== 7) {
			const additionalLastWeek = new Array(7 - lastWeek.length)
				.fill(0)
				.map((_, i) => i + 1)
				.map((v) => {
					return lastWeek[lastWeek.length - 1].plus({ day: v })
				})
			weeks[weeks.length - 1] = lastWeek.concat(additionalLastWeek)
		}

		return weeks
	}
}
