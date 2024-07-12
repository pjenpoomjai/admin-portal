import { render, waitFor } from '@testing-library/react'
import PreLoginContainer from 'modules/login/pre-login'
import { useSearchParams } from 'next/navigation'
import { getEnv } from 'src/servers/getEnvironment'
import {
	buildMockUseAppContext,
	mockLoginRedirect,
} from 'testing/test-utils/buildMockUseAppContext'
import { useAppContext } from 'x-core-modules/builder'

jest.mock('x-core-modules/builder', () => ({
	...jest.requireActual('x-core-modules/builder'),
	useAppContext: jest.fn(),
}))
jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useSearchParams: jest.fn(),
}))
jest.mock('src/servers/getEnvironment', () => ({
	...jest.requireActual('src/servers/getEnvironment'),
	getEnv: jest.fn(),
}))

const mockUseAppContext = useAppContext as jest.Mock
const mockUseSearchParams = useSearchParams as jest.Mock
const mockGetEnv = getEnv as jest.Mock
const testVariables = {
	prompt: 'login',
	mockRedirectUrl: 'http://localhost',
	returnUrl: '/transactions',
}

describe('PreLoginContainer : Container Configuration', () => {
	beforeEach(() => {
		mockUseAppContext.mockReturnValue(buildMockUseAppContext())
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(undefined),
		})
		mockGetEnv.mockResolvedValue({
			MSAL_REDIRECT_URI: testVariables['mockRedirectUrl'],
		})
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should call login redirect successfully', async () => {
		// render
		render(<PreLoginContainer />)
		// expect
		await waitFor(() => {
			expect(mockLoginRedirect).toHaveBeenCalledWith({
				prompt: testVariables['prompt'],
				redirectUri: testVariables['mockRedirectUrl'],
				redirectStartPage: testVariables['mockRedirectUrl'],
			})
		})
	})

	test('Should call login redirect successfully with returnUrl', async () => {
		// mock
		mockUseAppContext.mockReturnValue(buildMockUseAppContext())
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(testVariables['returnUrl']),
		})
		// render
		render(<PreLoginContainer />)
		// expect
		await waitFor(() => {
			expect(mockLoginRedirect).toHaveBeenCalledWith({
				prompt: testVariables['prompt'],
				redirectUri: testVariables['mockRedirectUrl'],
				redirectStartPage: `${
					testVariables['mockRedirectUrl']
				}?returnUrl=${encodeURIComponent(testVariables['returnUrl'])}`,
			})
		})
	})

	test('Should not call login redirect', async () => {
		// mock
		mockUseAppContext.mockReturnValue(
			buildMockUseAppContext({
				msalProviderSelector: () => ({
					accessToken: 'token',
				}),
			}),
		)
		// render
		render(<PreLoginContainer />)
		// expect
		await waitFor(() => {
			expect(mockLoginRedirect).toHaveBeenCalledTimes(0)
		})
	})
})
