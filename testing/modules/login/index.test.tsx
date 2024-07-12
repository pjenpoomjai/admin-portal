import { act, fireEvent, render, waitFor } from '@testing-library/react'
import CommonDialogContext from 'contexts/commonDialog/Context'
import LoginContainer from 'modules/login'
import { useSearchParams } from 'next/navigation'
import CommonDialogProvider from 'providers/CommonDialogProvider'
import {
	buildMockUseAppContext,
	mockHandleRedirectPromise,
} from 'testing/test-utils/buildMockUseAppContext'
import { useAppContext } from 'x-core-modules/builder/appBuilder'

jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useSearchParams: jest.fn(),
}))
jest.mock('x-core-modules/builder/appBuilder', () => ({
	...jest.requireActual('x-core-modules/builder/appBuilder'),
	useAppContext: jest.fn(),
}))
jest.mock('config/msal', () => ({
	msalConfig: {
		auth: {
			redirectUri: '',
		},
	},
}))

const mockUseAppContext = useAppContext as jest.Mock
const mockUseSearchParams = useSearchParams as jest.Mock

describe('LoginContainer : Container Configuration', () => {
	beforeEach(() => {
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(undefined),
		})
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should render successfully', () => {
		mockUseAppContext.mockReturnValue(
			buildMockUseAppContext({
				overrideAdapterQuery: {
					lazyQuery: jest.fn().mockImplementation(() => {
						return { data: undefined, error: undefined, trigger: jest.fn() }
					}),
				},
			}),
		)
		const { baseElement } = render(<LoginContainer />)
		expect(baseElement).toMatchSnapshot()
		expect(mockHandleRedirectPromise).toHaveBeenCalled()
	})

	test('Should display error dialog if authentication failed', async () => {
		// mock state
		const token = '0e798be3-45b4-45a8-8042-efa6c5407286'
		const expiresOn = 1706866713618
		const authenticationResult = {
			accessToken: token,
			expiresOn,
		}
		mockUseAppContext.mockReturnValue(
			buildMockUseAppContext({
				msalProviderSelector: {
					useAuthenticationResultSelector: () => authenticationResult,
				},
				commonDialogContextSelector: CommonDialogContext.selector,
				overrideAdapterQuery: {
					lazyQuery: jest
						.fn()
						.mockImplementationOnce(({ option }) => {
							option.onError(new Error())
							return { data: undefined, error: undefined, trigger: jest.fn() }
						})
						.mockImplementation(() => {
							return { data: undefined, error: undefined, trigger: jest.fn() }
						}),
					mutation: jest.fn().mockImplementation(() => {
						return { trigger: jest.fn() }
					}),
				},
			}),
		)
		// render
		const { getByTestId, queryByTestId, baseElement } = render(
			<CommonDialogContext.Provider>
				<CommonDialogProvider.Provider>
					<LoginContainer />
				</CommonDialogProvider.Provider>
			</CommonDialogContext.Provider>,
		)
		// expect
		await waitFor(() => {
			expect(getByTestId('no-permission-title-dialog')).toBeInTheDocument()
		})
		expect(baseElement).toMatchSnapshot()

		const closeDialogButton = getByTestId('no-permission-primary-button-button')
		expect(closeDialogButton).toBeInTheDocument()
		act(() => {
			fireEvent.click(closeDialogButton)
		})

		await waitFor(() => {
			expect(queryByTestId('no-permission-title-dialog')).toBeNull()
		})
		expect(baseElement).toMatchSnapshot()
		expect(mockHandleRedirectPromise).not.toHaveBeenCalled()
	})
})
