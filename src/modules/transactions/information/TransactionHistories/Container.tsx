'use client'
import { FC } from 'react'
import { useTransactionHistoriesController } from './controller'
import { TableHistory } from './views'
import { ErrorType } from 'adapters/error'
import ErrorSystem from 'components/ErrorSystem/ErrorSystem'

const Container: FC<ReturnType<typeof useTransactionHistoriesController>> = (
	props,
) => {
	const {
		data,
		isLoading,
		handleOnClickExpandDescription,
		errorCode,
		reloadData,
	} = props

	const renderBody = () => {
		if (errorCode === ErrorType.SOMETHING_WENT_WRONG) {
			return (
				<ErrorSystem
					className="w-full flex flex-col py-10 items-center bg-white rounded-xl"
					callback={() => reloadData()}
				/>
			)
		}

		return (
			<TableHistory
				isLoading={isLoading}
				data={data}
				handleOnClickExpandDescription={handleOnClickExpandDescription}
			/>
		)
	}

	return (
		<div className="w-full my-4" style={{}}>
			{renderBody()}
		</div>
	)
}

export default Container
