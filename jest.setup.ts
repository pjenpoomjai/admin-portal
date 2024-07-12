import '@testing-library/jest-dom'
const { DateTime } = jest.requireActual('luxon')
const DEFAULT_DATE = '2022-01-01T00:00:00Z'

class MockDateTime extends DateTime {
	public static now() {
		return DateTime.fromISO(DEFAULT_DATE)
	}
}

jest.mock('luxon', () => ({
	...jest.requireActual('luxon'),
	DateTime: MockDateTime,
}))
