import { Grid } from '@mui/material'
import Button from 'components/common/Button'
import KeyboardArrowDownIcon from 'components/common/Icon/KeyboardArrowDown'
import { ISearchActionButtons } from './interface'
import Box from 'components/common/Box/Box'

const SearchActionButtons: React.FC<ISearchActionButtons> = (props) => {
	const {
		isAdvanceSearch,
		isEnabledSearch,
		handleOnClickAdvanceSearch,
		onSearch,
		onResetFormHandler,
	} = props

	return (
		<Grid container spacing={2} className="py-6">
			<Grid item xs={4} columnSpacing={2} />
			<Grid item xs={4} columnSpacing={2} className="flex justify-center">
				<Box className="mr-4">
					<Button
						id="search-transaction"
						themetype="filled"
						themesize="xs"
						onClick={onSearch}
						disabled={!isEnabledSearch}
					>
						Search
					</Button>
				</Box>
				<Box>
					<Button
						id="reset-transaction"
						themetype="outline"
						themesize="xs"
						onClick={onResetFormHandler}
					>
						Reset
					</Button>
				</Box>
			</Grid>
			<Grid item xs={4} className="flex justify-end">
				<Button
					id="show-advance-search"
					themetype="filled"
					themesize="xs"
					endIcon={
						<div
							className={`transform ${
								isAdvanceSearch ? 'rotate-180' : 'rotate-0'
							} transition-transform duration-500 ease-in-out`}
						>
							<KeyboardArrowDownIcon id="advance-search-expand" />
						</div>
					}
					onClick={handleOnClickAdvanceSearch}
				>
					Show advance search
				</Button>
			</Grid>
		</Grid>
	)
}

export default SearchActionButtons
