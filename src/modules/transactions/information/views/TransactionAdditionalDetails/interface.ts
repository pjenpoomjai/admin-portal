import {
	ITransactionDetailAdditionalDetails,
	ITransactionDetailAdditionalDetailsInformation,
} from '../../interface'

export interface ITransactionAdditionalDetails {
	additionalDetails: ITransactionDetailAdditionalDetails
}

export type TRenderItem = ITransactionDetailAdditionalDetailsInformation
