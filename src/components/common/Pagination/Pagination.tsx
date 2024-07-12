import MuiPagination, { PaginationProps } from '@mui/material/Pagination'
import { SelectChangeEvent } from '@mui/material/Select'
import classnames from 'classnames'
import config from 'config'
import { ReactNode } from 'react'
import noop from 'lodash/noop'
import useId from 'utils/useId'
import { Select } from '../Select'
import defaultClasses from './pagination.module.css'
import { COMPONENT_TYPE } from 'shared/componentType'
import { PaginationItem } from '@mui/material'

export interface IPagination extends PaginationProps {
	id: string
	classNames?: string
	totalRows: number
	totalPages: number
	page: number
	rowsPerPage?: number
	rowsPerPageOptions?: number[]
	onPageChange?: (event: React.ChangeEvent<unknown>, page: number) => void
	onRowsPerPageChange?: (
		event: SelectChangeEvent<number>,
		child: ReactNode,
	) => void
}

const Pagination = (props: IPagination) => {
	const classes = classnames(defaultClasses.root, props.classNames)
	const generateIdEmbed = useId(COMPONENT_TYPE.PAGINATION)
	const generateIdLabelEmbed = useId(COMPONENT_TYPE.LABEL)
	const {
		id: _unusedId,
		page,
		totalRows = 0,
		totalPages = 0,
		rowsPerPage = 0,
		rowsPerPageOptions = config.rowsPerPageOptions,
		classNames: _unusedClassName,
		onPageChange = noop,
		onRowsPerPageChange = noop,
		...otherProps
	} = props

	const maxSize = page * rowsPerPage
	const total = maxSize > totalRows ? totalRows : maxSize
	const startIndex = totalRows ? page * rowsPerPage - rowsPerPage + 1 : 0
	const lastIndex = totalRows ? total : 0

	const items = rowsPerPageOptions.map((row) => ({
		id: row,
		label: row,
		value: row,
	}))

	return (
		<div
			className={classnames(classes, 'flex items-center text-xs font-normal')}
			{...generateIdEmbed('container')}
		>
			<p
				className="mr-[11px] text-gray-600"
				{...generateIdLabelEmbed('rows-per-page')}
			>
				Rows per page
			</p>
			<Select
				id="row-per-page"
				classNames="!w-[75px] mr-auto !text-gray-500"
				value={rowsPerPage}
				items={items}
				variant="outlined"
				onChange={onRowsPerPageChange}
				checkIconClassNames="w-[16px] h-[12px]"
				{...generateIdEmbed('row-per-page')}
			/>
			<p
				className="mr-[24px] text-gray-500"
				{...generateIdLabelEmbed('result')}
			>
				Display {startIndex} to {lastIndex} of {totalRows} results
			</p>
			<MuiPagination
				className="text-xs"
				variant="outlined"
				shape="rounded"
				onChange={onPageChange}
				count={totalPages}
				page={page}
				{...otherProps}
				renderItem={(props) => {
					const testId =
						props.type === 'page' ? `page-${props.page}` : props.type
					return <PaginationItem {...props} {...generateIdEmbed(testId)} />
				}}
			/>
		</div>
	)
}

export default Pagination
