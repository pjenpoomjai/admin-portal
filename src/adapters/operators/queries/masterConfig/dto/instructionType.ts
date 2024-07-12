import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import defaultTo from 'lodash/defaultTo'
import get from 'lodash/get'
import { IMasterConfigInstructionTypeDataResponse } from '../interface'
import { transformMasterConfigPagination } from './masterConfigPagination'
import { transformResponseMasterConfigTimeStampInquiry } from './masterConfigTimeStamp'

export const transformResponseMasterConfigInstructionTypeInquiry = (
	response: IMasterConfigInstructionTypeDataResponse,
): ModelPagination.Pagination<ModelMasterConfig.MasterConfigInstructionType> => {
	const { data: instructionTypes } = response
	const transformDataToPagination = transformMasterConfigPagination(response)
	const data = defaultTo(instructionTypes, []).map((instructionType) => {
		const information = new ModelMasterConfig.InstructionTypeInfo(
			get(instructionType, 'instructionTypeId'),
			get(instructionType, 'instructionType'),
			get(instructionType, 'activeStatus'),
		)
		const timestamp =
			transformResponseMasterConfigTimeStampInquiry(instructionType)

		const id = get(instructionType, 'instructionTypeId')

		return new ModelMasterConfig.MasterConfigInstructionType(
			id,
			information,
			timestamp,
		)
	})

	return transformDataToPagination(data)
}
