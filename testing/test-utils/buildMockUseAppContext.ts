import { getMockContextConsumer } from './getMockContextConsumer'

// dispatchAdapter
export const mockDispatchAdapter = jest.fn()
// linkAdapterCache
export const mockUpdateApi = jest.fn()
export const mockGetApi = jest.fn()
export const mockGetQueryOperator = jest.fn()
export const mockGetMutateOperator = jest.fn()
// msal
export const mockLoginRedirect = jest.fn()
export const mockHandleRedirectPromise = jest.fn()
export const mockAuthenticationResult = {}
// commonDialog
export const mockOpenCommonDialog = jest.fn()
export const mockCloseCommonDialog = jest.fn()
// loader
export const mockOpenLoader = jest.fn()
export const mockCloseLoader = jest.fn()
// persistentStore
export const mockUpsertPersistentStore = jest.fn()
// adapter
export const mockQuery = jest.fn()
export const mockLazyQuery = jest.fn()
export const mockMutation = jest.fn()

export const buildMockUseAppContext = (props: any = {}) => {
	const {
		msalProviderSelector = {},
		commonDialogContextSelector = {},
		loaderDialogContextSelector = {},
		linkAdapterCache = {},
		dispatchAdapter = mockDispatchAdapter,
		persistentStoreStore = {},
		overrideProviderConsumer = {},
		overrideContextConsumer = {},
		overrideAdapterQuery = {},
	} = props
	return {
		getProviderConsumer: jest.fn().mockImplementation((name) => {
			return getMockContextConsumer(name, {
				msal: () => ({
					useLoginRedirectSelector: () => mockLoginRedirect,
					useHandleRedirectPromiseSelector: () => mockHandleRedirectPromise,
					useAuthenticationResultSelector: () => mockAuthenticationResult,
					...msalProviderSelector,
				}),
				adapter: () => ({
					useAdapterQuerySelector: () => ({
						query: mockQuery,
						lazyQuery: mockLazyQuery,
						mutation: mockMutation,
						...overrideAdapterQuery,
					}),
				}),
				...overrideProviderConsumer,
			})
		}),
		getContextConsumer: jest.fn().mockImplementation((name) => {
			return getMockContextConsumer(name, {
				commonDialog: () => ({
					useOpenCommonDialogSelector: () => mockOpenCommonDialog,
					useCloseCommonDialogSelector: () => mockCloseCommonDialog,
					...commonDialogContextSelector,
				}),
				loader: () => ({
					useOpenLoaderSelector: () => mockOpenLoader,
					useCloseLoaderSelector: () => mockCloseCommonDialog,
					...loaderDialogContextSelector,
				}),
				persistentStore: () => ({
					useUpsertPersistentStoreSelector: () => mockUpsertPersistentStore,
					useGetPersistentStoreSelector: () => ({
						cookies: {},
					}),
					...persistentStoreStore,
				}),
				adapter: () => ({
					useAdapterStateSelector: () => ({
						updateApi: mockUpdateApi,
						getApi: mockGetApi,
						getQueryOperator: mockGetQueryOperator,
						getMutateOperator: mockGetMutateOperator,
						...linkAdapterCache,
					}),
					useDispatchAdapterSelector: () => dispatchAdapter,
				}),
				...overrideContextConsumer,
			})
		}),
	}
}
