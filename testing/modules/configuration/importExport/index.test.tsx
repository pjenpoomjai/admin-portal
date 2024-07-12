import { act, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorType, Message, PmtStatusCode } from 'adapters/error'
import { CommonDialogContext } from 'contexts/commonDialog'
import ImportExportContainer from 'modules/configuration/importExport'
import CommonDialogProvider from 'providers/CommonDialogProvider'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { useAppContext } from 'x-core-modules/builder/appBuilder'

jest.mock('x-core-modules/builder/appBuilder', () => ({
	...jest.requireActual('x-core-modules/builder/appBuilder'),
	useAppContext: jest.fn(),
}))

const mockUseAppContext = useAppContext as jest.Mock

describe('ImportExportContainer : Container Configuration', () => {
	afterEach(() => {
		jest.resetModules()
		jest.resetAllMocks()
	})

	test('Should able import configuration', async () => {
		// mock state
		const mockFile = new File(['test'], 'test.xls')
		const mockLazyQueryImport = jest.fn()
		const mockConfigurationImport = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			commonDialogContextSelector: CommonDialogContext.selector,
			overrideAdapterQuery: {
				lazyQuery: jest.fn().mockImplementation(({ queryFunc }) => {
					queryFunc({
						configurationImport: mockLazyQueryImport,
						configurationExport: jest.fn(),
					})
					return { data: undefined, trigger: mockConfigurationImport }
				}),
				mutation: jest.fn().mockImplementation(() => {
					return { trigger: jest.fn() }
				}),
			},
		})
		mockUseAppContext.mockReturnValue(mockAppContext)
		// render
		const { getByTestId, queryByTestId } = render(
			<CommonDialogContext.Provider>
				<CommonDialogProvider.Provider>
					<ImportExportContainer />
				</CommonDialogProvider.Provider>
			</CommonDialogContext.Provider>,
		)
		// expect
		expect(getByTestId('download-config-button')).toBeEnabled()
		expect(queryByTestId('upload-config-button')).toBeNull()

		// act
		act(() => {
			fireEvent.click(getByTestId('upload-tab'))
		})
		// expect
		await waitFor(() => {
			expect(getByTestId('upload-config-button')).toBeDisabled()
		})
		expect(queryByTestId('download-config-button')).toBeNull()
		// act
		act(() => {
			userEvent.upload(
				getByTestId('input-file-upload-file-config-upload-file'),
				mockFile,
			)
		})
		// expect
		await waitFor(() => {
			expect(getByTestId('delete-file-icon-button')).toBeInTheDocument()
		})

		// act
		act(() => {
			userEvent.click(getByTestId('delete-file-icon-button'))
		})
		// expect
		await waitFor(() => {
			expect(queryByTestId('delete-file-icon-button')).toBeNull()
		})

		// act
		act(() => {
			userEvent.upload(
				getByTestId('input-file-upload-file-config-upload-file'),
				mockFile,
			)
		})
		// expect
		await waitFor(() => {
			expect(getByTestId('upload-config-button')).toBeEnabled()
		})

		// act
		act(() => {
			userEvent.click(getByTestId('upload-config-button'))
		})
		// expect
		await waitFor(() => {
			expect(getByTestId('upload-config-title-dialog')).toBeInTheDocument()
		})

		// act
		act(() => {
			userEvent.click(getByTestId('upload-config-cancel-button'))
		})
		// expect
		await waitFor(() => {
			expect(queryByTestId('upload-config-title-dialog')).toBeNull()
		})

		// act
		act(() => {
			userEvent.click(getByTestId('upload-config-button'))
		})
		// expect
		await waitFor(() => {
			expect(getByTestId('upload-config-title-dialog')).toBeInTheDocument()
		})

		// act
		act(() => {
			userEvent.click(getByTestId('upload-config-confirm-button'))
		})
		// expect
		await waitFor(() => {
			expect(mockConfigurationImport).toHaveBeenCalledTimes(1)
		})
	})

	test('Should able import configuration in case PMT-2015 or PMT-2016', async () => {
		// mock state
		const mockConfigurationImport = jest.fn()
		const mockAppContext = buildMockUseAppContext({
			commonDialogContextSelector: CommonDialogContext.selector,
			overrideAdapterQuery: {
				lazyQuery: jest
					.fn()
					.mockImplementationOnce(({ option }) => {
						option.onError(
							new Message(
								'The uploaded file type is not supported. Please upload a file of type: xls, xlsx',
								ErrorType.SOMETHING_WENT_WRONG,
								PmtStatusCode.PMT_2015,
							),
						)
						return { data: undefined, trigger: mockConfigurationImport }
					})
					.mockImplementation(() => {
						return { data: undefined, trigger: mockConfigurationImport }
					}),
				mutation: jest.fn().mockImplementation(() => {
					return { trigger: jest.fn() }
				}),
			},
		})
		mockUseAppContext.mockReturnValue(mockAppContext)
		// render
		const { getByTestId, queryByTestId } = render(
			<CommonDialogContext.Provider>
				<CommonDialogProvider.Provider>
					<ImportExportContainer />
				</CommonDialogProvider.Provider>
			</CommonDialogContext.Provider>,
		)
		// expect
		await waitFor(() => {
			expect(
				getByTestId('something-went-wrong-title-dialog'),
			).toBeInTheDocument()
		})

		// act
		act(() => {
			userEvent.click(getByTestId('something-went-wrong-primary-button-button'))
		})
		// expect
		await waitFor(() => {
			expect(queryByTestId('something-went-wrong-title-dialog')).toBeNull()
		})
	})
})
