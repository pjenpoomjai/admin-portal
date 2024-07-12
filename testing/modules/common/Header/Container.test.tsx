import { act, fireEvent, render } from '@testing-library/react'
import Container from 'modules/common/Header/Container'

describe('Header : Container', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Should render successfully', () => {
		const onLogoutHandler = jest.fn()
		const { baseElement, getByTestId } = render(
			Container({
				displayName: 'JOHN DOE',
				lastLogon: '2024-02-01T09:53:37',
				onLogoutHandler,
			}),
		)
		expect(baseElement).toMatchSnapshot()
		act(() => {
			fireEvent.click(getByTestId('log-out-button'))
		})
		expect(onLogoutHandler).toHaveBeenCalledTimes(1)
	})
})
