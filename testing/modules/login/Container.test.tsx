import { act, fireEvent, render } from '@testing-library/react'
import Container from 'modules/login/Container'

describe('Login : Container', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	test('Should render successfully', () => {
		const onSubmit = jest.fn()
		const { getByTestId } = render(<Container onSubmit={onSubmit} />)

		expect(getByTestId('root-login-div')).toBeInTheDocument()
		expect(getByTestId('pymd-label-typography')).toHaveTextContent(
			'Admin portal',
		)
		expect(getByTestId('pymd-description-typography')).toHaveTextContent(
			'Payment Domain Web Admin',
		)

		const submitButton = getByTestId('sign-in-button')
		expect(submitButton).toBeInTheDocument()
		act(() => {
			fireEvent.click(submitButton)
		})
		expect(onSubmit).toHaveBeenCalledTimes(1)
	})
})
