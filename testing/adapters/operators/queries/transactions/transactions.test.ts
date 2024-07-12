import {
	ApiError,
	DomainErrorCode,
	ErrorType,
	Message,
	PmtStatusCode,
	StatusCode,
} from 'adapters/error'
import { RoutePath } from 'adapters/operators/interface'
import { ModelPagination } from 'adapters/operators/models'
import { TransactionsQuery } from 'adapters/operators/queries/transactions/transactions'
import {
	buildLink,
	buildMultiLink,
	endpointPymd,
	mockCorrelationId,
} from '../../__mocks__/mockConfig'
import transactionDetailResponse from './__mocks__/transactionDetailResponse.json'
import transactionInquiryResponse from './__mocks__/transactionInquiryResponse.json'

const mockPost = jest.fn()
const mockResponseCallback = jest.fn()
const mockExceptionCallback = jest.fn()
const testVariables = {}

describe('queries: transactions', () => {
	beforeAll(() => {
		testVariables['mockInquiryRequest'] = {
			pageSize: 10,
			pageNumber: 1,
		}
		testVariables['transactionsQuery'] = new TransactionsQuery(
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

	test('Should return response if call inquiry successfully', async () => {
		mockResponseCallback.mockResolvedValue(transactionInquiryResponse)
		const response = await testVariables['transactionsQuery'].inquiry(
			testVariables['mockInquiryRequest'],
		)
		expect(response).toBeTruthy()
		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdSearchTransaction,
			testVariables['mockInquiryRequest'],
			{
				baseURL: endpointPymd.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should return as empty if get PMT_2009 from calling inquiry', async () => {
		mockResponseCallback.mockImplementation(() => {
			throw Object.assign(new Error(), {
				response: {
					status: StatusCode.NOT_FOUND,
					data: { status: { code: PmtStatusCode.PMT_2009 } },
				},
			})
		})
		mockExceptionCallback.mockReturnValue(
			new ApiError(
				DomainErrorCode.UNKNOWN,
				new Message(PmtStatusCode.PMT_2009, ErrorType.DATA_NOT_FOUND),
				'200',
			),
		)
		const response = await testVariables['transactionsQuery'].inquiry(
			testVariables['mockInquiryRequest'],
		)
		expect(response).toEqual(
			ModelPagination.Pagination.empty(ErrorType.DATA_NOT_FOUND),
		)
	})

	test('Should return as empty if get PMT_2014 from calling inquiry', async () => {
		mockResponseCallback.mockImplementation(() => {
			throw Object.assign(new Error(), {
				response: {
					status: StatusCode.NOT_FOUND,
					data: { status: { code: PmtStatusCode.PMT_2014 } },
				},
			})
		})
		mockExceptionCallback.mockReturnValue(
			new ApiError(
				DomainErrorCode.UNKNOWN,
				new Message(PmtStatusCode.PMT_2014, ErrorType.DATA_NOT_FOUND),
				'200',
			),
		)
		const response = await testVariables['transactionsQuery'].inquiry(
			testVariables['mockInquiryRequest'],
		)
		expect(response).toEqual(
			ModelPagination.Pagination.empty(
				ErrorType.DATA_NOT_FOUND_NOT_IN_WHITELIST,
			),
		)
	})

	test('Should return as empty if get PMT_2015 from calling inquiry', async () => {
		mockResponseCallback.mockImplementation(() => {
			throw Object.assign(new Error(), {
				response: {
					status: StatusCode.NOT_FOUND,
					data: { status: { code: PmtStatusCode.PMT_2015 } },
				},
			})
		})
		mockExceptionCallback.mockReturnValue(
			new ApiError(
				DomainErrorCode.UNKNOWN,
				new Message(PmtStatusCode.PMT_2015, ErrorType.DATA_NOT_FOUND),
				'200',
			),
		)
		const response = await testVariables['transactionsQuery'].inquiry(
			testVariables['mockInquiryRequest'],
		)
		expect(response).toEqual(
			ModelPagination.Pagination.empty(ErrorType.DATA_NOT_FOUND_IN_WHITELIST),
		)
	})

	test('Should throw error if call inquiry un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(
			testVariables['transactionsQuery'].inquiry(
				testVariables['mockInquiryRequest'],
			),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})

	test('Should return response if call downloadInquiry successfully', async () => {
		const mockCsv = {
			name: 'test.csv',
			file: 'column1,column2\nvalue1,value2',
		}
		mockResponseCallback.mockResolvedValue(mockCsv)
		const response = await testVariables['transactionsQuery'].downloadInquiry({
			amountTo: 0,
			amountFrom: 1000,
		})
		expect(response).toEqual(mockCsv)
		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdDownloadTransaction,
			{ amountTo: 0, amountFrom: 1000 },
			{
				baseURL: endpointPymd.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should throw error if call downloadInquiry un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(
			testVariables['transactionsQuery'].downloadInquiry({
				amountTo: 0,
				amountFrom: 1000,
			}),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})

	test('Should return response if call getDetail successfully', async () => {
		mockResponseCallback.mockResolvedValue(transactionDetailResponse)
		const response = await testVariables['transactionsQuery'].getDetail({
			requestId: '64bc0071-459f-47b1-8daa-c13f53be0028',
			instructionType: 'BILL_PAYMENT',
		})
		expect(response).toBeTruthy()
		expect(mockPost).toHaveBeenCalledWith(
			RoutePath.PymdTransactionDetail,
			{
				requestId: '64bc0071-459f-47b1-8daa-c13f53be0028',
				instructionType: 'BILL_PAYMENT',
			},
			{
				baseURL: endpointPymd.endpoint,
				headers: {
					correlationId: mockCorrelationId,
				},
			},
		)
	})

	test('Should throw as data not found if get PMT_2009 from calling getDetail', async () => {
		mockResponseCallback.mockImplementation(() => {
			throw Object.assign(new Error(), {
				response: {
					status: StatusCode.NOT_FOUND,
					data: { status: { code: PmtStatusCode.PMT_2009 } },
				},
			})
		})
		mockExceptionCallback.mockReturnValue(
			new ApiError(
				DomainErrorCode.UNKNOWN,
				new Message(PmtStatusCode.PMT_2009, ErrorType.DATA_NOT_FOUND),
				'200',
			),
		)
		await expect(
			testVariables['transactionsQuery'].getDetail({
				requestId: '64bc0071-459f-47b1-8daa-c13f53be0028',
				instructionType: 'BILL_PAYMENT',
			}),
		).rejects.toThrow(new Message('Data Not Found', ErrorType.DATA_NOT_FOUND))
	})

	test('Should throw error if call getDetail un-successfully', async () => {
		mockPost.mockRejectedValue(new Error())
		await expect(
			testVariables['transactionsQuery'].getDetail({
				requestId: '64bc0071-459f-47b1-8daa-c13f53be0028',
				instructionType: 'BILL_PAYMENT',
			}),
		).rejects.toThrow(
			new Message('something went wrong', ErrorType.SOMETHING_WENT_WRONG),
		)
	})
})
