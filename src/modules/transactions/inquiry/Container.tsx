import { ErrorType } from 'adapters/error'
import { Divider } from 'components/common'
import { FC } from 'react'
import Typography from 'src/components/common/Typography'
import { useTransactionsInquiryController } from './controller'
import SearchActionButtons from './views/SearchActionButtons/SearchActionButtons'
import SearchForm from './views/SearchForm/SearchForm'
import TableTransactions from './views/TableTransactions/TableTransactions'

const Container: FC<ReturnType<typeof useTransactionsInquiryController>> = (
	props,
) => {
	const {
		control,
		isAdvanceSearch,
		table,
		options,
		targetRef,
		errorInquiry,
		emptyText,
		handleOnClickAdvanceSearch,
		onSearch,
		isIdleQuery,
		isSearched,
		isMutatingTransactions,
		isEnabledSearch,
		resetFormHandler,
		handleOnDownloadTransaction,
		onChangeValidate,
	} = props

	return (
		<div className="w-full">
			<Typography
				id="search-transactions"
				className="text-xl font-semibold text-indigo-500 pb-6"
			>
				Transactions
			</Typography>
			<div className="flex items-center pb-6">
				<Typography id="transaction-search-step" className="text-indigo-500">
					Transactions Search
				</Typography>
			</div>
			<div
				style={{ backgroundColor: 'white' }}
				className="px-4 py-2 rounded-xl"
			>
				<Typography id="search-transactions" variant="paragraph">
					Search transactions
				</Typography>
				<Divider className="mt-2 mb-6" />
				<SearchForm
					control={control}
					isAdvanceSearch={isAdvanceSearch}
					options={options}
					onChangeValidate={onChangeValidate}
				/>
				<SearchActionButtons
					onResetFormHandler={resetFormHandler}
					isEnabledSearch={isEnabledSearch}
					isAdvanceSearch={isAdvanceSearch}
					handleOnClickAdvanceSearch={handleOnClickAdvanceSearch}
					onSearch={onSearch}
				/>
			</div>
			<div
				style={{ backgroundColor: 'white' }}
				className="px-4 my-2 rounded-xl"
			>
				{!isIdleQuery &&
					!isMutatingTransactions &&
					isSearched &&
					errorInquiry !== ErrorType.SOMETHING_WENT_WRONG && (
						<TableTransactions
							{...table}
							targetRef={targetRef}
							emptyText={emptyText}
							handleOnDownloadTransaction={handleOnDownloadTransaction}
						/>
					)}
			</div>
		</div>
	)
}

export default Container
