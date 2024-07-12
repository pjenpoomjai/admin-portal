import { IMultiLink as IRootMultiLink } from 'x-core-modules/adapter/link'
import { EndpointKey, IHeader } from 'shared/adapters/interfaces'

export type IMultiLink = IRootMultiLink<EndpointKey, IHeader>

export enum RoutePath {
	PymdLogin = '/authentication/azure',
	PymdRefresh = '/authentication/azure/refreshToken',
	PymdLogout = '/authentication/logout',
	PymdSearchTransaction = 'v1/admin-panel/transaction/inquiry',
	PymdDownloadTransaction = 'v1/admin-panel/transaction/export-list',
	PymdLookup = 'v1/admin-panel/config/lookup/inquiry',
	PymdTransactionDetail = 'v1/admin-panel/transaction/detail',
	PymdTransactionHistories = 'v1/admin-panel/transaction-history/inquiry',
	PymdTermsAndConditions = '/v1/admin-panel/terms-and-conditions',
	PymdClearSession = '/authentication/expire',
	PymdConfigurationImport = '/v1/admin-panel/configuration/import',
	PymdConfigurationExport = '/v1/admin-panel/configuration/export',
	PymdMasterConfigChannel = '/v1/admin-panel/master-configuration/channel',
	PymdMasterConfigService = '/v1/admin-panel/master-configuration/service',
	PymdMasterConfigInstructionType = '/v1/admin-panel/master-configuration/instruction-type',
	PymdMasterConfigTimeoutType = '/v1/admin-panel/master-configuration/timeout-type',
}
