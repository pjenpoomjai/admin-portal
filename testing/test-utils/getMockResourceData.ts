import { ResourceKey, ResourceStatus } from 'contexts/resource/interface'

export const getMockResourceData = (key: string) => {
	if (key === ResourceKey.Status) {
		return {
			status: ResourceStatus.Success,
			data: [
				{ value: 'PROCESSED', name: 'Processed' },
				{ value: 'REJECTED', name: 'Reject' },
			],
		}
	}
	if (key === ResourceKey.TransactionType) {
		return {
			status: ResourceStatus.Success,
			data: [
				{ value: 'ORFT', name: 'Actual Account' },
				{ value: '3RD', name: 'Other SCB' },
				{ value: 'OWN', name: 'Own account' },
				{ value: 'PP_OTHER', name: 'PromptPay Other Bank' },
				{ value: 'PP_SCB', name: 'PromptPay SCB' },
			],
		}
	}
	if (key === ResourceKey.PaymentMethod) {
		return {
			status: ResourceStatus.Success,
			data: [
				{ value: 'TRF', name: 'TRF' },
				{ value: 'TRF_INITIATE', name: 'TRF_INITIATE' },
			],
		}
	}
	if (key === ResourceKey.Classification) {
		return {
			status: ResourceStatus.Success,
			data: [
				{
					value: 'ConfirmCustomerCreditTransfer',
					name: 'ConfirmCustomerCreditTransfer',
				},
				{
					value: 'InitiateCustomerCreditTransfer',
					name: 'InitiateCustomerCreditTransfer',
				},
				{ value: 'ReversalInitiation', name: 'ReversalInitiation' },
			],
		}
	}
	if (key === ResourceKey.Service) {
		return {
			status: ResourceStatus.Success,
			data: [
				{ value: 'B_SCAN_C_20022', name: 'B scan C 20022' },
				{ value: 'C_SCAN_B_20022', name: 'C scan B 20022' },
				{ value: 'CREDIT_TRANSFER', name: 'Credit Transfer' },
				{ value: 'CROSS_BANK_BILL_PAYMENT', name: 'Crossbank bill payment' },
				{ value: 'INWARD_REMITTANCE', name: 'Inward remittance' },
				{ value: 'NORMAL_BILL_PAYMENT', name: 'Normal bill payment' },
				{ value: 'QR_PAYMENT', name: 'QR payment' },
			],
		}
	}
	return {
		status: ResourceStatus.Success,
		data: [],
	}
}
