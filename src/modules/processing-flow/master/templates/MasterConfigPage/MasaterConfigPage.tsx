import Grid from '@mui/material/Grid'
import classnames from 'classnames'
import Stepper from 'components/Stepper/Stepper'
import { Button, Table } from 'components/common'
import { AutocompleteSelectAsyncForm } from 'components/common/AutocompleteSelectAsync/AutocompleteSelectAsync'
import Box from 'components/common/Box/Box'
import Typography from 'components/common/Typography/Typography'
import { FC } from 'react'
import { IMasterConfigPageProps } from './interface'
import defaultClasses from './masterConfigPage.module.css'
import ErrorSystem from 'components/ErrorSystem/ErrorSystem'
import { inputExecutors } from '../../shared/executors'
import get from 'lodash/get'
import NoResultFound from 'components/NoResultFound/NoResultFound'

const defaultClassName = 'w-full'

const MasterConfigPage: FC<IMasterConfigPageProps> = (props) => {
	const {
		stepperProps,
		searchForm,
		table,
		isFirstLoadError,
		handleOnCreate,
		refresh,
		className = defaultClassName,
	} = props

	const renderEmpty = () => {
		return (
			<NoResultFound
				className="w-full flex flex-col py-10 items-center bg-white rounded-xl"
				label="No results found."
			/>
		)
	}

	return (
		<Box className={className}>
			<Typography
				id="master-configuration-management"
				className="text-xl font-semibold text-indigo-500 pt-3 pb-6"
			>
				Master Configuration Management
			</Typography>
			<Stepper {...stepperProps} />
			<Box className="p-4 rounded-xl bg-white">
				{isFirstLoadError ? (
					<ErrorSystem
						className="w-full flex flex-col py-10 items-center bg-white rounded-xl"
						callback={() => refresh()}
					/>
				) : (
					<>
						<Grid
							container
							rowSpacing={1}
							columnSpacing={3}
							className={classnames(defaultClasses.search)}
						>
							<Grid item xs={3}>
								<AutocompleteSelectAsyncForm
									name="field"
									control={searchForm.control as any}
									defaultValue={searchForm.options[0]}
									autoCompleteProps={{
										options: searchForm.options,
										placeholder: 'Select field',
										id: 'selected-field-search',
										valueIndex: 'value',
										labelIndex: 'label',
										onChange: () => {
											searchForm.resetField('value')
										},
										debounce: 300,
										height: 35,
									}}
								/>
							</Grid>
							<Grid item xs={3}>
								{inputExecutors({
									type: get(searchForm, 'searchField.type'),
									control: searchForm.control,
								})}
							</Grid>
							<Grid item xs={3}>
								<Button
									themetype="outline"
									onClick={() => searchForm.onSearch()}
									disabled={searchForm.isDisabledSearch}
								>
									Search
								</Button>
							</Grid>
							<Grid item xs={3} className="flex justify-end">
								<Button themetype="filled" onClick={() => handleOnCreate()}>
									Create
								</Button>
							</Grid>
						</Grid>
						<Table
							emptyStateWithHeader
							classNames={classnames(defaultClasses.table, 'mt-4')}
							id="table-master-config-result"
							dataSource={table.dataSource}
							columns={table.columns}
							paginationProps={table.paginationProps}
							emptyState={renderEmpty()}
						/>
					</>
				)}
			</Box>
		</Box>
	)
}

export default MasterConfigPage
