import { act, renderHook, waitFor } from '@testing-library/react'
import useHeaderController from 'modules/common/Header/controller'
import { useRouter } from 'next/navigation'
import { PymdRole } from 'shared/constants'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { useAppContext } from 'x-core-modules/builder'

jest.mock('x-core-modules/builder', () => ({
	...jest.requireActual('x-core-modules/builder'),
	useAppContext: jest.fn(),
}))
jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useRouter: jest.fn(),
}))

const mockUseAppContext = useAppContext as jest.Mock
const mockUseRouter = useRouter as jest.Mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
const originalLocation = { ...window.location }

describe('Header : controller', () => {
	beforeEach(() => {
		delete window.location
		window.location = { ...originalLocation, replace: mockReplace }
		mockUseRouter.mockReturnValue({
			push: mockPush,
		})
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should user state correctly', async () => {
		mockUseAppContext.mockReturnValue(
			buildMockUseAppContext({
				msalProviderSelector: {
					useAccountSelector: () => null,
				},
			}),
		)
		const { result } = renderHook(() => useHeaderController())
		expect(result.current).toEqual({
			displayName: '',
			lastLogon: '',
			onLogoutHandler: expect.anything(),
		})
	})

	test('Should return initiate correctly', async () => {
		const mockName = 'JOHN DOE'
		const mockDate = '2024-02-01T09:53:37'
		mockUseAppContext.mockReturnValue(
			buildMockUseAppContext({
				persistentStoreStore: {
					useGetPersistentStoreSelector: () => ({
						cookies: {
							userInfo: JSON.stringify({
								roleName: PymdRole.TransactionManager.toLocaleLowerCase(),
								lastLogon: mockDate,
							}),
						},
					}),
				},
				msalProviderSelector: {
					useAccountSelector: () => ({
						name: mockName,
					}),
				},
			}),
		)
		const { result } = renderHook(() => useHeaderController())
		expect(result.current).toEqual({
			displayName: mockName,
			lastLogon: mockDate,
			onLogoutHandler: expect.anything(),
		})
		act(() => {
			result.current.onLogoutHandler()
		})
		await waitFor(() => {
			expect(mockReplace.mock.calls[0][0]).toEqual('/pre-logout')
		})
	})
})
