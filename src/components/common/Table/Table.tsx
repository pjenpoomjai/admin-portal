import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import MuiTable from '@mui/material/Table'
import MuiTableBody from '@mui/material/TableBody'
import MuiTableCell from '@mui/material/TableCell'
import MuiTableContainer from '@mui/material/TableContainer'
import MuiTableHead from '@mui/material/TableHead'
import MuiTableRow from '@mui/material/TableRow'
import MuiTableSortLabel from '@mui/material/TableSortLabel'
import classnames from 'classnames'
import isUndefined from 'lodash/isUndefined'
import noop from 'lodash/noop'
import dynamic from 'next/dynamic'
import { ReactElement, ReactNode } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import { EnumSortBy } from 'types/base'
import useId from 'utils/useId'
import { Checkbox } from '../Checkbox'
import { IPagination } from '../Pagination'
import defaultClasses from './table.module.css'
import { predictionSelectUtil } from 'utils/predictionRender'
import { IDataListPrediction } from 'utils/predictionRender/interface'
import { defaultTo, isNull } from 'lodash'
import { LinearSkeleton } from '../Skeleton'

const Pagination = dynamic(() => import('../Pagination'), {
	ssr: false,
})

export interface IColumn<RecordType> {
	id: string
	title?: string
	dataIndex?: string
	sortable?: boolean
	width?: number
	renderHeader?: () => ReactNode
	render?: (value: any, record: RecordType, index: number) => ReactNode
	hidden?: boolean
}

export interface ITable<RecordType> {
	id: string
	classNames?: string
	columns: IColumn<RecordType>[]
	dataSource: any[]
	paginationProps?: IPagination
	selected?: any[]
	emptyState?: ReactElement
	isLoading?: boolean
	order?: EnumSortBy
	orderBy?: string
	selectable?: boolean
	onSort?: (key: string, currOrder?: EnumSortBy) => void
	onSelect?: (record: RecordType) => void
	onSelectAll?: (checked: boolean) => void
	emptyStateWithHeader?: boolean
}

export interface ITableHead<RecordType> {
	id: string
	order?: EnumSortBy
	orderBy?: string
	dataSource: any[]
	selected?: any[]
	columns: IColumn<RecordType>[]
	selectable?: boolean
	onSort?: (key: string, currOrder?: EnumSortBy) => void
	onSelectAll?: (checked: boolean) => void
}

export interface ITableBody<RecordType> {
	id: string
	dataSource: any[]
	columns: IColumn<RecordType>[]
	selected: any[]
	selectable?: boolean
	onSelect: (record: RecordType) => void
}

const TableHead = <RecordType,>(props: ITableHead<RecordType>) => {
	const {
		id,
		columns,
		order,
		orderBy,
		dataSource,
		selected = [],
		selectable,
		onSort = noop,
		onSelectAll = noop,
	} = props
	const generateIdEmbed = useId(COMPONENT_TYPE.TABLE)
	const selectedCount = selected.length
	const rowCount = dataSource.filter((data) => {
		if (!isUndefined(data.selectable)) {
			return data.selectable
		}

		return true
	}).length

	const indeterminate = selectedCount > 0 && selectedCount < rowCount
	const checked = rowCount > 0 && selectedCount === rowCount

	const renderIcon = (columnId: string, className: string) => {
		const Icon = order === EnumSortBy.asc ? ArrowDropUpIcon : ArrowDropDownIcon
		return (
			<Icon {...{ className }} {...generateIdEmbed(`sort-by-${columnId}`)} />
		)
	}

	const renderColumnHeader = (column: IColumn<RecordType>) => {
		return column.renderHeader ? column.renderHeader() : <p>{column.title}</p>
	}

	const getMuiTableCell = (column: IColumn<RecordType>) => {
		if (column.sortable) {
			return (
				<MuiTableSortLabel
					sx={{
						'& .MuiTableSortLabel-icon': {
							width: '14.5px !important',
						},
					}}
					active={orderBy === column.dataIndex}
					direction={orderBy === column.dataIndex ? order : EnumSortBy.asc}
					onClick={() => {
						if (column.dataIndex) onSort(column.dataIndex, order)
					}}
					IconComponent={(props) => renderIcon(column.id, props.className)}
					{...generateIdEmbed(`title-${column.id}`)}
				>
					{renderColumnHeader(column)}
				</MuiTableSortLabel>
			)
		} else if (column.renderHeader) {
			return column.renderHeader()
		}
		return <p>{column.title}</p>
	}

	const renderTableCell = (columns: IColumn<RecordType>[]) => {
		return columns.map((column) => (
			<MuiTableCell width={column.width} key={column.id}>
				{getMuiTableCell(column)}
			</MuiTableCell>
		))
	}

	return (
		<MuiTableHead {...generateIdEmbed(`head-${id}`)}>
			<MuiTableRow>
				{selectable && (
					<MuiTableCell padding="checkbox">
						<Checkbox
							id="check-all"
							indeterminate={indeterminate}
							checked={checked}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								onSelectAll(event.target.checked)
							}}
							inputProps={{
								'aria-label': 'select all',
							}}
						/>
					</MuiTableCell>
				)}
				{renderTableCell(displayColumns(columns))}
			</MuiTableRow>
		</MuiTableHead>
	)
}

const TableBody = <RecordType,>(props: ITableBody<RecordType>) => {
	const { id, dataSource, columns, onSelect, selected, selectable } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.TABLE)

	return (
		<MuiTableBody {...generateIdEmbed(`body-${id}`)}>
			{dataSource.map((data, index) => {
				const isSkeletonLoading = isNull(data)
				const entries = Object.entries(defaultTo(data, {}))
				const map = new Map(entries)
				const rowSelectable = !!map.get('selectable')
				return (
					<MuiTableRow key={`body-row-${index.toString()}`}>
						{selectable && rowSelectable && (
							<MuiTableCell padding="checkbox">
								<Checkbox
									id={`select-${index}`}
									checked={selected.some((select) => select.id === data.id)}
									onClick={() => onSelect(data)}
								/>
							</MuiTableCell>
						)}
						{selectable && !rowSelectable && <MuiTableCell />}
						{displayColumns(columns).map((column, columnIndex) => {
							const render = column.render
							const dataIndex = column.dataIndex || ''
							const value = map.get(dataIndex)

							if (isSkeletonLoading) {
								return (
									<MuiTableCell
										key={`${id}-${dataIndex}-${columnIndex.toString()}`}
									>
										<LinearSkeleton />
									</MuiTableCell>
								)
							} else if (render)
								return (
									<MuiTableCell
										key={`${id}-${dataIndex}-${columnIndex.toString()}`}
									>
										{render(value, data, index)}
									</MuiTableCell>
								)
							return (
								<MuiTableCell
									key={`${id}-${dataIndex}-${columnIndex.toString()}`}
								>
									<p>{`${value as string}`}</p>
								</MuiTableCell>
							)
						})}
					</MuiTableRow>
				)
			})}
		</MuiTableBody>
	)
}

const EmptyState = ({
	classNames,
	emptyState,
}: {
	classNames: string
	emptyState?: ReactElement
}) => {
	const generateIdEmbed = useId(COMPONENT_TYPE.TABLE)
	const generateIdLabelEmbed = useId(COMPONENT_TYPE.LABEL)
	return (
		<div
			className={classnames(
				'min-h-[400px] flex flex-col justify-center items-center',
				classNames,
			)}
			{...generateIdEmbed('empty-state')}
		>
			{emptyState && (
				<>
					<p
						className="text-xl text-gray-900 mb-[10px]"
						{...generateIdLabelEmbed('empty-header')}
					>
						None of your data matched this search
					</p>
					<p
						className="text-sm text-gray-500"
						{...generateIdLabelEmbed('empty-content')}
					>
						Try another search
					</p>
				</>
			)}
		</div>
	)
}

interface ICommandContext {
	dataLength: number
	isLoading: boolean
	isEmptyHeader: boolean
}

enum DisplayType {
	DataTable = 'dataTable',
	Loading = 'loading',
	Empty = 'empty',
}

const Table = <RecordType,>(props: ITable<RecordType>) => {
	const {
		id,
		isLoading = false,
		dataSource = [],
		order = EnumSortBy.asc,
		orderBy,
		selected = [],
		columns = [],
		paginationProps,
		emptyState,
		selectable,
		onSort = noop,
		onSelect = noop,
		onSelectAll = noop,
		classNames,
		emptyStateWithHeader = false,
	} = props

	const classes = classnames(defaultClasses.root, classNames)
	const generateIdEmbed = useId(COMPONENT_TYPE.TABLE)

	if (!dataSource.length && !emptyStateWithHeader) {
		return <EmptyState classNames={classes} emptyState={emptyState} />
	}

	const renderDataTable = () => {
		return (
			<TableBody<RecordType>
				id={id}
				dataSource={dataSource}
				columns={columns}
				onSelect={onSelect}
				selected={selected}
				selectable={selectable}
			/>
		)
	}

	const renderDataLoading = () => {
		return (
			<TableBody<RecordType>
				id={id}
				dataSource={[null]}
				columns={columns}
				onSelect={noop}
				selected={[]}
			/>
		)
	}

	const renderEmpty = () => {
		return (
			<tbody>
				<td colSpan={columns.length} className="w-full">
					{emptyState}
				</td>
			</tbody>
		)
	}

	const resultComponentPrediction = {
		[DisplayType.DataTable]: renderDataTable(),
		[DisplayType.Loading]: renderDataLoading(),
		[DisplayType.Empty]: renderEmpty(),
	}

	const commandPredictions: IDataListPrediction<
		ICommandContext,
		React.ReactNode
	>[] = [
		{
			validator: ({ dataLength, isLoading }) => !!dataLength && !isLoading,
			result: DisplayType.DataTable,
		},
		{
			validator: ({ dataLength, isLoading }) => !dataLength && isLoading,
			result: DisplayType.Loading,
		},
		{
			validator: ({ dataLength, isEmptyHeader }) =>
				isEmptyHeader && !dataLength,
			result: DisplayType.Empty,
		},
	]

	const validatorPrediction: ICommandContext = {
		dataLength: dataSource.length,
		isLoading,
		isEmptyHeader: emptyStateWithHeader,
	}
	const resultType = predictionSelectUtil(
		commandPredictions,
		validatorPrediction,
	)

	return (
		<div className={classnames(classes)}>
			<MuiTableContainer className="mb-[20px]" {...generateIdEmbed(id)}>
				<MuiTable>
					<TableHead<RecordType>
						id={id}
						order={order}
						orderBy={orderBy}
						dataSource={dataSource}
						selected={selected}
						columns={columns}
						onSort={onSort}
						onSelectAll={onSelectAll}
						selectable={selectable}
					/>
					{resultComponentPrediction[resultType]}
				</MuiTable>
			</MuiTableContainer>
			{Boolean(dataSource.length) && paginationProps && (
				<Pagination {...paginationProps} classNames="h-[32px]" />
			)}
		</div>
	)
}

const displayColumns = (columns: IColumn<any>[]) => {
	return columns.filter((c) => c.hidden !== true)
}

export default Table
