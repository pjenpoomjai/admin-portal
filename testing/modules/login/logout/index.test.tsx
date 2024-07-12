import { render, waitFor } from '@testing-library/react'
import LogoutContainer from 'modules/login/logout'
import { useRouter } from 'next/navigation'
import {
	buildMockUseAppContext,
	mockDispatchAdapter,
} from 'testing/test-utils/buildMockUseAppContext'
import { useAppContext } from 'x-core-modules/builder/appBuilder'
import { ActionContextAdapter } from 'x-core-modules/context/adapter'

jest.mock('x-core-modules/builder/appBuilder', () => ({
	...jest.requireActual('x-core-modules/builder/appBuilder'),
	useAppContext: jest.fn(),
}))
jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useRouter: jest.fn(),
}))

describe('LogoutContainer : Container Configuration', () => {
	const mockUseAppContext = useAppContext as jest.Mock
	const mockUseRouter = useRouter as jest.Mock
	const mockReplace = jest.fn()

	beforeEach(() => {
		mockUseRouter.mockReturnValue({
			replace: mockReplace,
		})
	})

	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should call logout successfully', async () => {
		// mock state
		mockUseAppContext.mockReturnValue(
			buildMockUseAppContext({
				overrideAdapterQuery: {
					mutation: jest.fn().mockImplementation(({ option }) => {
						option.onSuccess()
						return { data: undefined, trigger: jest.fn() }
					}),
				},
			}),
		)
		// render
		render(<LogoutContainer />)
		// expect
		await waitFor(() => {
			expect(mockDispatchAdapter).toHaveBeenCalledWith({
				type: ActionContextAdapter.UpdateContext,
				payload: {
					token: undefined,
				},
			})
		})
		expect(mockReplace).toHaveBeenCalledWith('/login')
	})
})
