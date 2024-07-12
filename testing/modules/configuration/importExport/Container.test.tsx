import { render } from '@testing-library/react'
import Container from 'modules/configuration/importExport/Container'
import { ConfigurationTab } from 'modules/configuration/importExport/constant'
import { useForm } from 'react-hook-form'
import { QueryKey } from 'shared/adapters/interfaces'
import { buildMockUseAppContext } from 'testing/test-utils/buildMockUseAppContext'
import { useAppContext } from 'x-core-modules/builder'

jest.mock('x-core-modules/builder', () => ({
	...jest.requireActual('x-core-modules/builder'),
	useAppContext: jest.fn(),
}))

const mockUseAppContext = useAppContext as jest.Mock

const mockPostImport = jest.fn()
const mockPostExport = jest.fn()

describe('Configuration Import Export : Container', () => {
	afterEach(() => {
		jest.resetModules()
		jest.clearAllMocks()
	})

	test('Should render successfully initiate state (export tab)', () => {
		// mock state
		const getQueryOperator = jest.fn().mockReturnValue({
			[QueryKey.Config]: {
				configurationImport: mockPostImport,
				configurationExport: mockPostExport,
			},
		})
		const mockAppContext = buildMockUseAppContext({
			linkAdapterCache: {
				getQueryOperator,
			},
		})
		mockUseAppContext.mockReturnValue(mockAppContext)
		const { baseElement } = render(<div></div>, {
			wrapper: () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { control } = useForm<any>()

				return (
					<Container
						{...mockAppContext}
						selectedTab={ConfigurationTab.DOWNLOAD}
						tabHandler={jest.fn()}
						downloadForm={{
							onSubmitDownload: jest.fn(),
						}}
						uploadForm={{
							processImport: undefined,
							processFailDetailImport: undefined,
							isDisableUpload: true,
							onSubmitUpload: jest.fn(),
							control: control,
							onRemoveFile: jest.fn(),
						}}
					/>
				)
			},
		})
		expect(baseElement).toMatchSnapshot()
	})

	test('Should render successfully initiate state (import tab)', () => {
		// mock state
		const getQueryOperator = jest.fn().mockReturnValue({
			[QueryKey.Config]: {
				configurationImport: mockPostImport,
				configurationExport: mockPostExport,
			},
		})
		const mockAppContext = buildMockUseAppContext({
			linkAdapterCache: {
				getQueryOperator,
			},
		})
		mockUseAppContext.mockReturnValue(mockAppContext)
		const { baseElement } = render(<div></div>, {
			wrapper: () => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { control } = useForm<any>()

				return (
					<Container
						{...mockAppContext}
						selectedTab={ConfigurationTab.UPLOAD}
						tabHandler={jest.fn()}
						downloadForm={{
							onSubmitDownload: jest.fn(),
						}}
						uploadForm={{
							processImport: undefined,
							processFailDetailImport: undefined,
							isDisableUpload: true,
							onSubmitUpload: jest.fn(),
							control: control,
							onRemoveFile: jest.fn(),
						}}
					/>
				)
			},
		})
		expect(baseElement).toMatchSnapshot()
	})
})
