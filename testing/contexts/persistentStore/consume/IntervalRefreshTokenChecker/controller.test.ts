import { renderHook, waitFor } from '@testing-library/react'
import { useConsumeIntervalRefreshTokenCheckerController } from 'contexts/persistentStore/consume/IntervalRefreshTokenChecker/controller'
import { useRouter } from 'next/navigation'
import { QueryKey } from 'shared/adapters/interfaces'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { findKeyCookieChunk, getCookieValueWithKeys } from 'utils/cookie'
import { diffNowWithTimestamp } from 'utils/dateTime'
import { useAppContext } from 'x-core-modules/builder/appBuilder'
import { ActionContextAdapter } from 'x-core-modules/context/adapter'

jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useRouter: jest.fn(),
}))
jest.mock('x-core-modules/builder/appBuilder', () => ({
	...jest.requireActual('x-core-modules/builder/appBuilder'),
	useAppContext: jest.fn(),
}))
jest.mock('utils/cookie', () => ({
	...jest.requireActual('utils/cookie'),
	findKeyCookieChunk: jest.fn(),
	getCookieValueWithKeys: jest.fn(),
}))
jest.mock('jose', () => ({
	decodeJwt: jest.fn().mockReturnValue({ exp: '1111' }),
}))
jest.mock('utils/dateTime', () => ({
	diffNowWithTimestamp: jest.fn(),
}))
const mockFindKeyCookieChunk = findKeyCookieChunk as jest.Mock
const mockGetCookieValueWithKeys = getCookieValueWithKeys as jest.Mock
const mockUseAppContext = useAppContext as jest.Mock
const _mockUseRouter = useRouter as jest.Mock
const mocDiffNowWithTimestamp = diffNowWithTimestamp as jest.Mock
const mockRefreshToken = jest.fn()
const mockUpsertPersistentStore = jest.fn()

describe('Interval Refresh Token Checker : controller', () => {
	beforeEach(() => {
		mockFindKeyCookieChunk.mockResolvedValue(undefined)
		mockGetCookieValueWithKeys.mockReturnValue('token')
		mocDiffNowWithTimestamp.mockReturnValue(0)
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	it('[PMD-4478] Verify PYMD web admin panel page refesh token success', async () => {
		const mockDispatchAdapter = jest.fn()
		const mockRefreshTokenValue = jest.fn().mockResolvedValue({
			accessToken: 'accessToken',
			expiresOn: 1234567,
		})
		const mockOpenCommonDialog = jest.fn()
		renderHook(() =>
			useConsumeIntervalRefreshTokenCheckerController({
				getProviderConsumer: jest.fn().mockImplementation((name: string) => {
					if (name === 'msal') {
						return {
							useRefreshTokenSelector: () => mockRefreshTokenValue,
						}
					}
					if (name === 'adapter') {
						return {
							useAdapterQuerySelector: () => ({
								query: jest.fn(),
								lazyQuery: jest.fn().mockImplementation(() => {
									return { trigger: mockRefreshToken }
								}),
								mutation: jest.fn().mockImplementation(() => {
									return { trigger: jest.fn() }
								}),
							}),
						}
					}
					return undefined
				}),
				getContextConsumer: jest.fn().mockImplementation((name: string) => {
					if (name === 'commonDialog') {
						return {
							useOpenCommonDialogSelector: () => mockOpenCommonDialog,
							useCloseCommonDialogSelector: () => jest.fn(),
						}
					}
					if (name === 'persistentStore') {
						return {
							useGetPersistentStoreSelector: () => ({ cookies: 'cookies' }),
							useUpsertPersistentStoreSelector: () => mockUpsertPersistentStore,
						}
					}
					if (name === 'adapter') {
						return {
							useDispatchAdapterSelector: () => mockDispatchAdapter,
						}
					}
					return undefined
				}),
			}),
		)
		await waitFor(() => {
			expect(mockDispatchAdapter).toHaveBeenCalledWith({
				type: ActionContextAdapter.UpdateContext,
				payload: {
					token: 'token',
				},
			})
		})
		await waitFor(
			() => {
				expect(mockUpsertPersistentStore).toHaveBeenCalledWith({
					token: 'accessToken',
					expires: 1234567,
				})
			},
			{ timeout: 3000 },
		)
		await waitFor(() => {
			expect(mockDispatchAdapter).toHaveBeenCalledWith({
				type: ActionContextAdapter.UpdateContext,
				payload: {
					token: 'accessToken',
				},
			})
		})
		await waitFor(() => {
			expect(mockRefreshToken).toHaveBeenCalledWith({
				params: {
					expires: 1234567,
				},
				payload: {
					token: 'accessToken',
				},
			})
		})
	})

	it('[PMD-4479] Verify PYMD web admin panel page refesh token failed', async () => {
		const mockDispatchAdapter = jest.fn()
		const mockRefreshTokenValue = jest.fn().mockRejectedValue(undefined)
		const mockOpenCommonDialog = jest.fn()
		renderHook(() =>
			useConsumeIntervalRefreshTokenCheckerController({
				getProviderConsumer: jest.fn().mockImplementation((name: string) => {
					if (name === 'msal') {
						return {
							useRefreshTokenSelector: () => mockRefreshTokenValue,
						}
					}
					if (name === 'adapter') {
						return {
							useAdapterQuerySelector: () => ({
								query: jest.fn(),
								lazyQuery: jest.fn().mockImplementation(() => {
									return { trigger: mockRefreshToken }
								}),
								mutation: jest.fn().mockImplementation(() => {
									return { trigger: jest.fn() }
								}),
							}),
						}
					}
					return undefined
				}),
				getContextConsumer: jest.fn().mockImplementation((name: string) => {
					if (name === 'commonDialog') {
						return {
							useOpenCommonDialogSelector: () => mockOpenCommonDialog,
							useCloseCommonDialogSelector: () => jest.fn(),
						}
					}
					if (name === 'persistentStore') {
						return {
							useGetPersistentStoreSelector: () => ({ cookies: 'cookies' }),
							useUpsertPersistentStoreSelector: () => mockUpsertPersistentStore,
						}
					}
					if (name === 'adapter') {
						return {
							useDispatchAdapterSelector: () => mockDispatchAdapter,
						}
					}
					return undefined
				}),
			}),
		)
		await waitFor(
			() => {
				expect(mockOpenCommonDialog).toHaveBeenCalled()
				expect(mockRefreshTokenValue).toHaveBeenCalled()
			},
			{ timeout: 3000 },
		)
	})
})
