import { TransactionTabEnum } from '../../constant'
import { ITransaction } from '../../interface'

export interface ITransactionView {
	transaction: ITransaction
	selectedTab: TransactionTabEnum
	tabHandler: (selected: TransactionTabEnum) => void
}
