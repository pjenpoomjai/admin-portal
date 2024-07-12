import { act, waitFor } from '@testing-library/react'
import { ConfigurationTab } from 'modules/configuration/importExport/constant'
import { useConfigImportExportController } from 'modules/configuration/importExport/controller'
import { useForm } from 'react-hook-form'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { renderHookClearSwrCache } from 'testing/test-utils/renderHookClearSwrCache'

jest.mock('x-core-modules/builder', () => ({ useAppContext: jest.fn() }))
jest.mock('react-hook-form', () => ({
	...jest.requireActual('react-hook-form'),
	useForm: jest.fn(),
}))

const mockUseForm = useForm as jest.Mock
const mockReset = jest.fn()
const mockGetValues = jest.fn()
const mockWatch = jest.fn().mockImplementation(() => {
	return ''
})

const mockForm = {
	control: {},
	handleSubmit: (func) => {
		return func
	},
	reset: mockReset,
	getValues: mockGetValues,
	watch: mockWatch,
}

let originalCreateObjectURL
let originalRevokeObjectURL

describe('Configuration Import Export : controller', () => {
	beforeEach(() => {
		mockUseForm.mockReturnValue(mockForm)
		originalCreateObjectURL = global.URL.createObjectURL
		originalRevokeObjectURL = global.URL.revokeObjectURL
		global.URL.createObjectURL = jest.fn()
		global.URL.revokeObjectURL = jest.fn()
	})

	afterEach(() => {
		global.URL.createObjectURL = originalCreateObjectURL
		global.URL.revokeObjectURL = originalRevokeObjectURL
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should return initial states correctly', async () => {
		// mock state
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return { data: undefined, trigger: jest.fn() }
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useConfigImportExportController(mockAppContext),
		)
		// expect
		await waitFor(() => {
			expect(result.current.selectedTab).toEqual(ConfigurationTab.DOWNLOAD)
			expect(result.current.uploadForm.processImport).toBeUndefined()
			expect(result.current.uploadForm.processFailDetailImport).toBeUndefined()
			expect(result.current.uploadForm.isDisableUpload).toEqual(true)
		})
	})

	test('Should able to change tab state', async () => {
		// mock state
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(() => {
					return { data: undefined, trigger: jest.fn() }
				}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useConfigImportExportController(mockAppContext),
		)
		// action
		expect(result.current.selectedTab).toEqual(ConfigurationTab.DOWNLOAD)
		act(() => {
			result.current.tabHandler(ConfigurationTab.UPLOAD)
		})
		// expect
		await waitFor(() => {
			expect(result.current.selectedTab).toEqual(ConfigurationTab.UPLOAD)
		})
	})

	test('Should able to download configuration', async () => {
		global.URL.revokeObjectURL = jest.fn()
		// mock state
		const mockConfigurationExport = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			overrideAdapterQuery: {
				lazyQuery: jest
					.fn()
					.mockImplementationOnce(() => {
						return { data: undefined, trigger: jest.fn() }
					})
					.mockImplementationOnce(() => {
						return { data: undefined, trigger: mockConfigurationExport }
					}),
			},
		})
		// hook
		const { result } = renderHookClearSwrCache(() =>
			useConfigImportExportController(mockAppContext),
		)
		// action
		act(() => {
			result.current.downloadForm.onSubmitDownload()
		})
		// expect
		await waitFor(() => {
			expect(mockConfigurationExport).toHaveBeenCalledWith()
		})
	})
})
