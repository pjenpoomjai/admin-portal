import classnames from 'classnames'
import NoResultFound from 'components/NoResultFound/NoResultFound'
import { Button, Table, Typography } from 'components/common'
import defaultTo from 'lodash/defaultTo'
import { DateTime } from 'luxon'
import { FC } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import { JsonView } from 'components/common/JsonView'
import useId from 'utils/useId'
import { ITableHistoryProps } from './interface'
import defaultClasses from './tableHistory.module.css'

enum ColumKey {
	REFERENCE_ID = 'reference-id',
	FLOW = 'flow',
	LOG_DATETIME = 'log-datetime',
	EVENT = 'event',
	TO = 'to',
	EXTERNAL_CODE = 'external-code',
	EXTERNAL_DESCRIPTION = 'external-description',
}

const TableHistory: FC<ITableHistoryProps> = (props) => {
	const { data, isLoading, handleOnClickExpandDescription } = props
	const columns = [
		{
			id: ColumKey.REFERENCE_ID,
			title: 'Reference Id',
			dataIndex: 'referenceId',
			render: (value: string, _, index: number) => {
				return (
					<Typography variant="small" id={`${ColumKey.REFERENCE_ID}-${index}`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.FLOW,
			title: 'Flow',
			dataIndex: 'flow',
			render: (value: string, _, index: number) => {
				return (
					<Typography variant="small" id={`${ColumKey.FLOW}-${index}`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.LOG_DATETIME,
			title: 'Log date time',
			dataIndex: 'logDatetime',
			render: (value: string, _, index: number) => {
				return (
					<Typography variant="small" id={`${ColumKey.LOG_DATETIME}-${index}`}>
						{value
							? DateTime.fromISO(value).toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")
							: '-'}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.EVENT,
			title: 'Event',
			dataIndex: 'event',
			render: (value: string, _, index: number) => {
				return (
					<Typography variant="small" id={`${ColumKey.EVENT}-${index}`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.TO,
			title: 'To',
			dataIndex: 'to',
			render: (value: string, _, index: number) => {
				return (
					<Typography variant="small" id={`${ColumKey.TO}-${index}`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.EXTERNAL_CODE,
			title: 'External code',
			dataIndex: 'externalCode',
			render: (value: string, _, index: number) => {
				return (
					<Typography variant="small" id={`${ColumKey.EXTERNAL_CODE}-${index}`}>
						{defaultTo(value, '-')}
					</Typography>
				)
			},
		},
		{
			id: ColumKey.EXTERNAL_DESCRIPTION,
			title: 'External description',
			dataIndex: 'externalDescription',
			width: 150,
			render: (value: string, _, index: number) => {
				if (!value) {
					return null
				}
				const JsonCmp = <JsonView theme="winter-is-coming" src={value} />
				return (
					<Button
						className="pt-1"
						onClick={() => handleOnClickExpandDescription(JsonCmp)}
						id={`${ColumKey.EXTERNAL_DESCRIPTION}-${index}`}
					>
						<Typography
							variant="small"
							id={`${ColumKey.EXTERNAL_CODE}-${index}`}
						>
							View
						</Typography>
					</Button>
				)
			},
		},
	]

	const generateIdEmbed = useId(COMPONENT_TYPE.DIV)
	const renderEmpty = () => {
		return (
			<NoResultFound className="w-full flex flex-col py-10 items-center bg-white rounded-xl" />
		)
	}

	return (
		<div {...generateIdEmbed('history-wrapper-table')} className="py-6">
			<Table
				isLoading={isLoading}
				id="transaction-history"
				classNames={classnames(defaultClasses.root, 'mx-6')}
				columns={columns}
				dataSource={data}
				emptyStateWithHeader={true}
				emptyState={renderEmpty()}
			/>
		</div>
	)
}

export default TableHistory
