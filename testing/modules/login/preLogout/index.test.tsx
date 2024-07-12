import { renderHook } from '@testing-library/react'
import { noop } from 'lodash'
import usePreLogout from 'modules/login/preLogout/controller'
import { useRouter } from 'next/navigation'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'

jest.mock('x-core-modules/builder', () => ({
	...jest.requireActual('x-core-modules/builder'),
	useAppContext: jest.fn(),
}))
jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useRouter: jest.fn(),
}))

describe('LogoutContainer : Container Configuration', () => {
	const mockUseRouter = useRouter as jest.Mock
	const mockPush = jest.fn()

	beforeEach(() => {
		mockUseRouter.mockReturnValue({
			push: mockPush,
		})
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should call logout successfully', async () => {
		const context = buildMockUseAppContext({
			msalProviderSelector: {
				useIsAuthenticatedSelector: () => false,
				useLogoutSelector: () => noop,
			},
		})

		renderHook(() => usePreLogout(context))

		expect(mockPush).toHaveBeenCalledWith('/logout')
	})

	test('Should call azure logout successfully', async () => {
		const mockLogout = jest.fn()
		const context = buildMockUseAppContext({
			msalProviderSelector: {
				useIsAuthenticatedSelector: () => true,
				useLogoutSelector: () => mockLogout,
			},
		})

		renderHook(() => usePreLogout(context))

		expect(mockLogout).toHaveBeenCalled()
	})
})
