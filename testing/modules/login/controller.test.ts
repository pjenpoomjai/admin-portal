import { renderHook, waitFor } from '@testing-library/react'
import useLogIn from 'modules/login/controller'
import { useSearchParams } from 'next/navigation'
import { CommonDialogType } from 'src/builders'
import {
	buildMockUseAppContext,
	mockDispatchAdapter,
	mockLoginRedirect,
	mockOpenCommonDialog,
	mockUpsertPersistentStore,
} from 'testing/test-utils/buildMockUseAppContext'
import { ActionContextAdapter } from 'x-core-modules/context/adapter'

jest.mock('x-core-modules/builder', () => ({ useAppContext: jest.fn() }))
jest.mock('config/msal', () => ({
	msalConfig: {
		auth: {
			redirectUri: '',
		},
	},
}))
jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useSearchParams: jest.fn(),
}))
const mockUseSearchParams = useSearchParams as jest.Mock

describe('Login : controller', () => {
	beforeEach(() => {
		window = Object.create(window)
		Object.defineProperty(window, 'location', {
			value: { href: '/' },
			writable: true,
		})
		mockUseSearchParams.mockReturnValue({
			get: jest.fn(),
		})
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('able to call onSubmit', async () => {
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return { data: undefined, trigger: jest.fn() }
				}),
			},
		})
		const { result } = renderHook(() => useLogIn(mockAppContext))
		result.current.onSubmit()
		await waitFor(() => {
			expect(window.location.href).toEqual('/pre-login')
		})
	})

	test('able to call onSubmit with returnUrl', async () => {
		const mockReturnUrl = '/transactions'
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(mockReturnUrl),
		})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return { data: undefined, trigger: jest.fn() }
				}),
			},
		})
		const { result } = renderHook(() => useLogIn(mockAppContext))
		result.current.onSubmit()
		await waitFor(() => {
			expect(window.location.href).toEqual(
				`/pre-login?returnUrl=${encodeURIComponent(mockReturnUrl)}`,
			)
		})
	})

	test('Should set up current logged-in user correctly (with existing token)', () => {
		// mock state
		const token = '0e798be3-45b4-45a8-8042-efa6c5407286'
		const expiresOn = 1706866713618
		const authenticationResult = {
			accessToken: token,
			expiresOn,
		}
		const mockAuthWithAzure = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return { data: undefined, trigger: mockAuthWithAzure }
				}),
			},
			msalProviderSelector: {
				useAuthenticationResultSelector: () => authenticationResult,
			},
		})
		// hook
		renderHook(() => useLogIn(mockAppContext))
		// expect
		expect(mockDispatchAdapter).toHaveBeenCalledWith({
			payload: { token },
			type: ActionContextAdapter.UpdateContext,
		})
		expect(mockUpsertPersistentStore).toHaveBeenCalledWith({
			token,
			expires: expiresOn,
		})
		expect(mockAuthWithAzure).toHaveBeenCalledWith({
			params: {
				expires: expiresOn,
			},
			payload: {
				token,
			},
		})
		expect(mockOpenCommonDialog).toHaveBeenCalledTimes(0)
		expect(mockLoginRedirect).toHaveBeenCalledTimes(0)
	})

	test('Should navigate to search transaction page after pass authentication', async () => {
		// mock state
		const token = '0e798be3-45b4-45a8-8042-efa6c5407286'
		const expiresOn = 1706866713618
		const authenticationResult = {
			accessToken: token,
			expiresOn,
		}
		const mockAuthWithAzure = jest.fn().mockResolvedValue({})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ option }) => {
					option.onSuccess({})
					return { data: undefined, trigger: mockAuthWithAzure }
				}),
			},
			msalProviderSelector: {
				useAuthenticationResultSelector: () => authenticationResult,
			},
		})
		// hook
		renderHook(() => useLogIn(mockAppContext))
		// expect
		await waitFor(() => {
			expect(window.location.href).toEqual('/transactions')
		})
	})

	test('Should navigate to returnUrl after pass authentication', async () => {
		const returnUrl = '/transactions/123'
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(returnUrl),
		})
		// mock state
		const token = '0e798be3-45b4-45a8-8042-efa6c5407286'
		const expiresOn = 1706866713618
		const authenticationResult = {
			accessToken: token,
			expiresOn,
		}
		const mockAuthWithAzure = jest.fn().mockResolvedValue({})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ option }) => {
					option.onSuccess({})
					return { data: undefined, trigger: mockAuthWithAzure }
				}),
			},
			msalProviderSelector: {
				useAuthenticationResultSelector: () => authenticationResult,
			},
		})
		// hook
		renderHook(() => useLogIn(mockAppContext))
		// expect
		await waitFor(() => {
			expect(window.location.href).toEqual(returnUrl)
		})
	})

	test('Should navigate to returnUrl after pass authentication (origin within returnUrl)', async () => {
		window = Object.create(window)
		Object.defineProperty(window, 'location', {
			value: { href: 'http://example.com', origin: 'http://example.com' },
			writable: true,
		})
		const returnUrl = 'http://example.com/transactions/123'
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(returnUrl),
		})
		// mock state
		const token = '0e798be3-45b4-45a8-8042-efa6c5407286'
		const expiresOn = 1706866713618
		const authenticationResult = {
			accessToken: token,
			expiresOn,
		}
		const mockAuthWithAzure = jest.fn().mockResolvedValue({})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ option }) => {
					option.onSuccess({})
					return { data: undefined, trigger: mockAuthWithAzure }
				}),
			},
			msalProviderSelector: {
				useAuthenticationResultSelector: () => authenticationResult,
			},
		})
		// hook
		renderHook(() => useLogIn(mockAppContext))
		// expect
		await waitFor(() => {
			expect(window.location.href).toEqual(returnUrl)
		})
	})

	test('Should navigate to search transaction page after pass authentication (wrong origin within returnUrl)', async () => {
		window = Object.create(window)
		Object.defineProperty(window, 'location', {
			value: { href: '/', origin: 'http://example.com' },
			writable: true,
		})
		const returnUrl = 'http://example-test.com/transactions/123'
		mockUseSearchParams.mockReturnValue({
			get: jest.fn().mockReturnValue(returnUrl),
		})
		// mock state
		const token = '0e798be3-45b4-45a8-8042-efa6c5407286'
		const expiresOn = 1706866713618
		const authenticationResult = {
			accessToken: token,
			expiresOn,
		}
		const mockAuthWithAzure = jest.fn().mockResolvedValue({})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ option }) => {
					option.onSuccess({})
					return { data: undefined, trigger: mockAuthWithAzure }
				}),
			},
			msalProviderSelector: {
				useAuthenticationResultSelector: () => authenticationResult,
			},
		})
		// hook
		renderHook(() => useLogIn(mockAppContext))
		// expect
		await waitFor(() => {
			expect(window.location.href).toEqual('/transactions')
		})
	})

	test('Should set value of error dialog if authentication failed', async () => {
		// mock state
		const token = '0e798be3-45b4-45a8-8042-efa6c5407286'
		const expiresOn = 1706866713618
		const authenticationResult = {
			accessToken: token,
			expiresOn,
		}
		const mockAuthWithAzure = jest.fn().mockResolvedValue(undefined)
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ option }) => {
					option.onError(new Error())
					return { data: undefined, trigger: mockAuthWithAzure }
				}),
			},
			msalProviderSelector: {
				useAuthenticationResultSelector: () => authenticationResult,
			},
		})
		// hook
		renderHook(() => useLogIn(mockAppContext))
		// expect
		expect(mockDispatchAdapter).toHaveBeenCalledWith({
			payload: { token },
			type: ActionContextAdapter.UpdateContext,
		})
		expect(mockUpsertPersistentStore).toHaveBeenCalledWith({
			token,
			expires: expiresOn,
		})

		await waitFor(() => {
			expect(mockOpenCommonDialog).toHaveBeenCalledWith(
				expect.objectContaining({ id: CommonDialogType.NO_PERMISSION }),
			)
		})

		expect(mockLoginRedirect).toHaveBeenCalledTimes(0)
	})

	test('Should navigate to configuration page after pass authentication with configuration manager role', async () => {
		// mock state
		const token = '0e798be3-45b4-45a8-8042-efa6c5407286'
		const expiresOn = 1706866713618
		const authenticationResult = {
			accessToken: token,
			expiresOn,
		}
		const mockAuthWithAzure = jest.fn().mockResolvedValue({
			roleName: 'Configuration manager',
		})
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ option }) => {
					option.onSuccess({
						roleName: 'Configuration manager',
					})
					return { data: undefined, trigger: mockAuthWithAzure }
				}),
			},
			msalProviderSelector: {
				useAuthenticationResultSelector: () => authenticationResult,
			},
		})
		// hook
		renderHook(() => useLogIn(mockAppContext))
		// expect
		await waitFor(() => {
			expect(window.location.href).toEqual('/processing-flow/master')
		})
	})
})
