import {
	transformResponseTransactionDetail,
	transformResponseTransactionsInquiry,
} from 'adapters/operators/queries/transactions/dto'
import {
	expectTransactionDetailDto,
	expectTransactionDetailDtoOnlyDetail,
	expectTransactionDetailDtoWithoutPayeePayer,
} from './__mocks__/expectTransactionDetailDto'
import {
	expectTransactionInquiryDto,
	expectTransactionInquiryDtoEmpty,
} from './__mocks__/expectTransactionInquiryDto'
import transactionDetailResponse from './__mocks__/transactionDetailResponse.json'
import transactionInquiryResponse from './__mocks__/transactionInquiryResponse.json'

describe('queries: transactions dto', () => {
	test('Should transform response from transactions inquiry correctly', () => {
		const result = transformResponseTransactionsInquiry(
			transactionInquiryResponse as any,
		)
		expect(result).toEqual(expectTransactionInquiryDto)
	})

	test('Should transform response from transactions inquiry correctly (default as empty)', () => {
		const mockEmpty = {
			...transactionInquiryResponse,
			data: undefined,
		}
		const result = transformResponseTransactionsInquiry(mockEmpty as any)
		expect(result).toEqual(expectTransactionInquiryDtoEmpty)
	})

	test('Should transform response from transactions detail correctly', () => {
		const transactionDetailResponseData = transactionDetailResponse.data
		const result = transformResponseTransactionDetail(
			transactionDetailResponseData as any,
		)
		expect(result).toEqual(expectTransactionDetailDto)
	})

	test('Should transform response from transactions detail correctly in case incoming/outgoing/debitParty/creditParty/debitPartyAgent/creditPartyAgent/additionalDetail are null', () => {
		const mockResponse = {
			...transactionDetailResponse,
			data: {
				...transactionDetailResponse.data,
				incoming: null,
				outgoing: null,
				debitParty: null,
				creditParty: null,
				debitPartyAgent: null,
				creditPartyAgent: null,
				additionalDetail: null,
			},
		}
		const transactionDetailResponseData = mockResponse.data
		const result = transformResponseTransactionDetail(
			transactionDetailResponseData as any,
		)
		expect(result).toEqual(expectTransactionDetailDtoOnlyDetail)
	})

	test('Should transform response from transactions detail correctly in case payee/payer are null', () => {
		const mockResponse = {
			...transactionDetailResponse,
			data: {
				...transactionDetailResponse.data,
				incoming: undefined,
				outgoing: undefined,
				debitParty: undefined,
				creditParty: undefined,
				debitPartyAgent: undefined,
				creditPartyAgent: undefined,
				additionalDetail: {
					...transactionDetailResponse.data.additionalDetail,
					payee: null,
					payer: null,
				},
			},
		}
		const transactionDetailResponseData = mockResponse.data
		const result = transformResponseTransactionDetail(
			transactionDetailResponseData as any,
		)
		expect(result).toEqual(expectTransactionDetailDtoWithoutPayeePayer)
	})
})
