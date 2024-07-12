import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect, { SelectProps } from '@mui/material/Select'
import classnames from 'classnames'
import CheckIcon from 'components/common/Icon/Check'
import KeyboardArrowDownIcon from 'components/common/Icon/KeyboardArrowDown'
import { Control, Controller } from 'react-hook-form'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import Alert, { EnumAlertType, IAlert } from '../Alert'
import Chip from '../Chip'
import FormHelperText from '../FormHelperText'
import defaultClasses from './select.module.css'

export interface IItem {
	id: number | string
	label: number | string
	value?: string | number | readonly string[]
}

export interface ISelect<T> extends Omit<SelectProps<T>, 'error'> {
	id: string
	items: IItem[]
	classNames?: string
	themesize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
	checkIconClassNames?: string
	selectedAsChip?: boolean
	error?: string | IAlert
	helper?: string | IAlert
	chipProps?: {
		deleteChipFunc?: (item?: IItem) => void
		renderChipLabel?: (item?: IItem) => string
		classNames?: string
	}
	variant: any
}

export interface ISelectForm<T> extends ISelect<T> {
	name: string
	defaultSelectedValue?: string
	control: Control
}

const Select = <T,>(props: ISelect<T>) => {
	const {
		id,
		items = [],
		value,
		classNames,
		checkIconClassNames,
		selectedAsChip,
		chipProps,
		themesize = 'sm',
		placeholder,
		error,
		helper,
		...otherProps
	} = props

	const classes = classnames(defaultClasses.root, classNames)
	const generateIdEmbed = useId(COMPONENT_TYPE.SELECT)
	const generateHelperTextEmbedId = generateIdEmbed(id)

	const renderHelper = (error?: string | IAlert, helper?: string | IAlert) => {
		const severity = error ? EnumAlertType.error : EnumAlertType.success
		const message = error || helper

		if (!message) return null

		if (typeof message === 'string')
			return (
				<FormHelperText
					error={severity === EnumAlertType.error}
					{...generateHelperTextEmbedId}
				>
					{message}
				</FormHelperText>
			)

		return <Alert classNames="mt-[8px]" severity={severity} {...message} />
	}

	if (value && selectedAsChip) {
		const item = items.find((item) => item.value === value)
		const renderLabel = () => {
			if (chipProps?.renderChipLabel) return chipProps.renderChipLabel(item)

			return item?.label as string
		}

		return (
			<Chip
				id={props.id}
				label={renderLabel()}
				deleteFunc={() => {
					if (chipProps?.deleteChipFunc) chipProps.deleteChipFunc(item)
				}}
				classNames={chipProps?.classNames}
			></Chip>
		)
	}

	return (
		<FormControl className={classnames(classes, 'w-full', classNames)}>
			<MuiSelect
				className={classes}
				displayEmpty
				sx={{
					'& .MuiOutlinedInput-input': {
						fontSize: `var(--font-size-${themesize})`,
					},
					color: value ? 'var(--gray-900)' : 'var(--gray-500)',
				}}
				MenuProps={{
					PaperProps: {
						sx: {
							border: '1px solid var(--gray-200)',
							borderRadius: '8px',
							filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.05))',
							boxShadow: 'unset',
						},
					},
					MenuListProps: {
						sx: {
							'& .Mui-selected': {
								backgroundColor: 'var(--gray-30) !important',
								fontSize: `var(--font-size-${themesize})`,
							},
							'& .Mui-selected:hover, & .MuiMenuItem-root:hover': {
								backgroundColor: 'var(--violet-50)',
							},
							padding: 'unset',
						},
					},
				}}
				IconComponent={KeyboardArrowDownIcon}
				value={value}
				renderValue={(selected: T) => {
					if (!selected && placeholder) {
						return <>{placeholder}</>
					}

					const label = items.find((item) => item.value === value)?.label

					return <>{label}</>
				}}
				{...generateIdEmbed(props.id)}
				error={!!error}
				{...otherProps}
			>
				{items.map((item: IItem) => {
					const { id, label, value: itemValue } = item

					return (
						<MenuItem
							key={id}
							value={itemValue}
							className="flex"
							sx={{
								fontSize: `var(--font-size-${themesize}) !important`,
								lineHeight: `24px`,
								color: 'var(--gray-900)',
								borderBottom: '1px solid var(--gray-200)',
								padding: '0 14px',
								height: '40px',
								display: 'flex',
							}}
							{...generateIdEmbed(id)}
						>
							<p className="mr-auto">{label}</p>
							{itemValue === value && (
								<CheckIcon
									className={classnames(
										'text-violet-500 w-[24px] h-[24px]',
										checkIconClassNames,
									)}
								/>
							)}
						</MenuItem>
					)
				})}
			</MuiSelect>
			{renderHelper(error, helper)}
		</FormControl>
	)
}

const SelectForm = <T,>(props: ISelectForm<T>) => {
	const { name, control, defaultSelectedValue = '', ...otherProps } = props

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultSelectedValue}
			render={({
				field: { onChange, onBlur, value, name },
				fieldState: { error },
			}) => (
				<Select
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					name={name}
					error={error?.message}
					{...otherProps}
				></Select>
			)}
		/>
	)
}

export { Select, SelectForm }
