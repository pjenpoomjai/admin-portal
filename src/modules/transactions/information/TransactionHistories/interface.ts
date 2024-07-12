import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { IAdapterProvider } from 'x-core-modules/provider/adapter'

export interface IUseTransactionHistoryProps {}

export interface IUseHandleJsonView {
	getContextConsumer: IAppContextProps['getContextConsumer']
}

export interface IUseTransactionRequestProps {
	id: string
	instructionType: string
	adapter: IAdapterProvider<EndpointKey, IHeader>
}

export interface IDataTable {
	referenceId: string
	flow: string
	logDatetime: string
	event: string
	to: string
	externalCode: string
	externalDescription: string
}
