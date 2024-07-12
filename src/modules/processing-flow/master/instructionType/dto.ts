import { ModelMasterConfig, ModelPagination } from 'adapters/operators/models'
import get from 'lodash/get'
import { IInstructionType } from './interface'

export const mapMasterConfigInstructionType = (
	instructionTypeData: ModelPagination.Pagination<ModelMasterConfig.MasterConfigInstructionType>,
): IInstructionType[] => {
	const data = get(
		instructionTypeData,
		'data',
		[] as ModelMasterConfig.MasterConfigInstructionType[],
	)
	return data.map(({ config, timeStamp }, index) => {
		return {
			number: index + 1,
			instructionTypeId: get(config, 'instructionTypeId'),
			instructionType: get(config, 'instructionType'),
			activeStatus: get(config, 'activeStatus'),
			createdDateTime: get(timeStamp, 'createdDateTime'),
			createdBy: get(timeStamp, 'createdBy'),
			updatedDateTime: get(timeStamp, 'updatedDateTime'),
			updatedBy: get(timeStamp, 'updatedBy'),
		}
	})
}
