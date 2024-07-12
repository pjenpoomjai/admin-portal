import { ModelMasterConfig } from 'adapters/operators/models'
import { IMasterConfigTimestamp } from '../interface'
import { DateTime } from 'luxon'
import { transformDateToISO } from 'utils/common/transformDate'
import get from 'lodash/get'

export const transformResponseMasterConfigTimeStampInquiry = <
	T extends IMasterConfigTimestamp,
>(
	data: T,
): ModelMasterConfig.MasterConfigTimeStamp => {
	return new ModelMasterConfig.MasterConfigTimeStamp(
		DateTime.fromISO(transformDateToISO(get(data, 'createdDateTime'))),
		get(data, 'createdBy'),
		DateTime.fromISO(transformDateToISO(get(data, 'updatedDateTime'))),
		get(data, 'updatedBy'),
	)
}
