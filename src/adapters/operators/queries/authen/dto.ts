import { ModelAuthen } from 'adapters/operators/models'
import { RoleType } from 'adapters/operators/models/authen/valueObject/interface'
import get from 'lodash/get'
import isNil from 'lodash/isNil'

export const transformResponseWithAzureModel = (
	resultApi: any,
): ModelAuthen.Authen => {
	const data = get(resultApi, 'data', null)
	const predictConfigFields = [
		{
			fieldPath: 'function',
			type: RoleType.Function,
			id: 'functionId',
			name: 'functionName',
			path: 'functionPath',
		},
		{
			fieldPath: 'product',
			type: RoleType.Product,
			id: 'productId',
			name: 'productName',
			path: 'functionPath',
		},
		{
			fieldPath: 'bankEntity',
			type: RoleType.BankEntity,
			id: 'bankEntityId',
			name: 'bankEntityName',
		},
	]

	const roles = predictConfigFields
		.filter(({ fieldPath }) => {
			return !isNil(get(data, fieldPath))
		})
		.map(({ fieldPath, type, id, name }) => {
			const rowData: any = get(data, fieldPath)
			return new ModelAuthen.Role(get(rowData, id), get(rowData, name), type)
		})
	const roleName = get(data, 'roleName')
	const instance = new ModelAuthen.Authen(roles, roleName)
	return instance
}
