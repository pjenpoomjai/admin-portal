import {
	ApiError,
	DomainErrorCode,
	ErrorType,
	Message,
	PmtStatusCode,
	StatusCode,
} from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { ModelConfiguration } from 'adapters/operators/models'
import { ConfigurationQuery } from 'adapters/operators/queries/configuration/configuration'
import {
	buildLink,
	buildMultiLink,
	endpointPymd,
	mockCorrelationId,
} from '../../__mocks__/mockConfig'
import configurationImportResponseJson from './__mocks__/configurationImportResponse.json'
import configurationImportResponseFailResponseJson from './__mocks__/configurationImportResponseFail.json'
import {
	expectConfigurationImportProcessDto,
	expectConfigurationImportProcessFailDetailDto,
} from './__mocks__/expectImportConfigurationDto'

const mockPost = jest.fn()
const mockResponseCallback = jest.fn()
const mockExceptionCallback = jest.fn()
const testVariables = {}

describe('queries: configuration', () => {
	beforeAll(() => {
		testVariables['configurationQuery'] = new ConfigurationQuery(
			buildMultiLink(
				{
					endpoints: [endpointPymd],
					context: { token: 'token' },
				},
				buildLink({ mockPost, mockResponseCallback, mockExceptionCallback }),
			),
		)
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	test('Should return correct response if call configurationExport successfully', async () => {
		const result = { file: 'data', name: 'name.xls' }
		mockResponseCallback.mockResolvedValue(result)
		const response = await testVariables[
			'configurationQuery'
		].configurationExport()
		expect(response).toEqual(result)

		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdConfigurationExport,
			{},
			{
				baseURL: endpointPymd.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
				responseType: 'arraybuffer',
			},
		)
	})

	test('Should throw error if call configurationExport un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(
			testVariables['configurationQuery'].configurationExport(),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})

	test('Should return correct response if call configurationImport successfully (PMT-1000)', async () => {
		const mockFile = new File(['test'], 'test.xls')
		const formData = new FormData()
		formData.append('uploadFile', mockFile, mockFile.name)
		mockResponseCallback.mockResolvedValue(configurationImportResponseJson)
		const response = await testVariables[
			'configurationQuery'
		].configurationImport({
			uploadFile: [mockFile],
		})
		expect(response).toEqual(
			new ModelConfiguration.ConfigurationImport(
				expectConfigurationImportProcessDto,
				[],
			),
		)

		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdConfigurationImport,
			formData,
			{
				baseURL: endpointPymd.endpoint,
				headers: {
					'content-type': 'multipart/form-data',
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should return correct response if call configurationImport successfully (PMT-2007)', async () => {
		const mockFile = new File(['test'], 'test.xls')
		const formData = new FormData()
		formData.append('uploadFile', mockFile, mockFile.name)
		mockResponseCallback.mockImplementation(() => {
			throw Object.assign(new Error(), {
				response: {
					status: StatusCode.BAD_REQUEST,
					data: configurationImportResponseFailResponseJson,
				},
			})
		})
		mockExceptionCallback.mockReturnValue(
			new ApiError(
				DomainErrorCode.UNKNOWN,
				new Message(PmtStatusCode.PMT_2007, ErrorType.SOMETHING_WENT_WRONG),
				StatusCode.BAD_REQUEST,
				configurationImportResponseFailResponseJson,
			),
		)
		const response = await testVariables[
			'configurationQuery'
		].configurationImport({
			uploadFile: [mockFile],
		})
		expect(response).toEqual(
			new ModelConfiguration.ConfigurationImport(
				[],
				expectConfigurationImportProcessFailDetailDto,
			),
		)
	})

	test('Should throw correct error if call configurationImport (PMT-2015)', async () => {
		const mockError = {
			status: {
				code: PmtStatusCode.PMT_2015,
				description:
					'The uploaded file type is not supported. Please upload a file of type: xls, xlsx',
			},
		}
		const mockFile = new File(['test'], 'test.xls')
		const formData = new FormData()
		formData.append('uploadFile', mockFile, mockFile.name)
		mockResponseCallback.mockImplementation(() => {
			throw Object.assign(new Error(), {
				response: {
					status: StatusCode.BAD_REQUEST,
					data: mockError,
				},
			})
		})
		mockExceptionCallback.mockReturnValue(
			new ApiError(
				DomainErrorCode.UNKNOWN,
				new Message(PmtStatusCode.PMT_2015, ErrorType.SOMETHING_WENT_WRONG),
				StatusCode.BAD_REQUEST,
				mockError,
			),
		)
		await expect(
			testVariables['configurationQuery'].configurationImport({
				uploadFile: [mockFile],
			}),
		).rejects.toThrow(
			new Message(
				mockError.status.description,
				ErrorType.SOMETHING_WENT_WRONG,
				PmtStatusCode.PMT_2015,
			),
		)
	})

	test('Should throw correct error if call configurationImport (PMT-2016)', async () => {
		const mockError = {
			status: {
				code: PmtStatusCode.PMT_2016,
				description:
					'The uploaded file exceeds the maximum allowed size of 10MB. Please upload a smaller file.',
			},
		}
		const mockFile = new File(['test'], 'test.xls')
		const formData = new FormData()
		formData.append('uploadFile', mockFile, mockFile.name)
		mockResponseCallback.mockImplementation(() => {
			throw Object.assign(new Error(), {
				response: {
					status: StatusCode.BAD_REQUEST,
					data: mockError,
				},
			})
		})
		mockExceptionCallback.mockReturnValue(
			new ApiError(
				DomainErrorCode.UNKNOWN,
				new Message(PmtStatusCode.PMT_2016, ErrorType.SOMETHING_WENT_WRONG),
				StatusCode.BAD_REQUEST,
				mockError,
			),
		)
		await expect(
			testVariables['configurationQuery'].configurationImport({
				uploadFile: [mockFile],
			}),
		).rejects.toThrow(
			new Message(
				mockError.status.description,
				ErrorType.SOMETHING_WENT_WRONG,
				PmtStatusCode.PMT_2016,
			),
		)
	})

	test('Should throw error if call configurationImport un-successfully', async () => {
		await expect(
			testVariables['configurationQuery'].configurationImport(),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})
})
