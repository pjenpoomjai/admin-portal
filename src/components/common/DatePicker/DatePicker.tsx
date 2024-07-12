'use client'
import { FormControl, TextFieldProps } from '@mui/material'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import classnames from 'classnames'
import KeyboardArrowDownIcon from 'components/common/Icon/KeyboardArrowDown'
import { cloneDeep } from 'lodash'
import noop from 'lodash/noop'
import { DateTime } from 'luxon'
import CalendarIcon from 'public/static/images/calendar.svg'
import { FC, useCallback, useMemo, useRef, useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { COMPONENT_TYPE } from 'shared/componentType'
import mergeClasses from 'utils/mergeClasses'
import useId from 'utils/useId'
import Alert, { EnumAlertType, IAlert } from '../Alert'
import Chip from '../Chip'
import FormHelperText from '../FormHelperText/FormHelperText'
import { IInput, IInputLabel } from '../Input'
import inputClasses from '../Input/input.module.css'
import { CustomLuxonAdapter } from './CustomAdapter'
import PickersDay, { IPickersDayProps } from './PickersDay'
import defaultClasses from './datepicker.module.css'
import { CUSTOM_COMPONENT, predictionCustomProps } from './helpers'
import {
	ComponentCustomType,
	DateTime_Picker_Const,
	Date_Picker_Const,
	ICustomComponent,
} from './interface'

export interface IDatePicker {
	id: string
	type?: 'Date' | 'DateTime'
	label?: string
	classNames?: string
	classes?: object
	onChange?: (value: any) => void
	inputProps: IInput
	value?: DateTime | null
	disabled?: boolean
	editableInput?: boolean
	inputLabel?: IInputLabel
	validateFormatDate?: (value: string) => DateTime | null
	customComponents?: ICustomComponent<ComponentCustomType>[]
	selectedAsChip?: boolean
	textFieldInputProps?: TextFieldProps
	chipProps?: {
		deleteChipFunc?: (value?: DateTime | null) => void
		renderChipLabel?: (value?: DateTime | null) => string
		classNames?: string
	}
	renderDay?(props: IPickersDayProps): JSX.Element
	minDate?: DateTime
	maxDate?: DateTime
	disableFuture?: boolean
	disablePast?: boolean
	disableHighlightToday?: boolean
	defaultDisplayValue?: string
	error?: string | IAlert
	helper?: string | IAlert
}

const DatePicker: FC<IDatePicker> = (props) => {
	const generateIdEmbed = useId(COMPONENT_TYPE.DATE_PICKER)
	const generateIdEmbedInput = useId(COMPONENT_TYPE.INPUT)
	const classes = mergeClasses(defaultClasses, props.classes)
	const [isOpenCalendar, setIsOpenCalendar] = useState(false)
	const popper = useRef<any>(null)

	const {
		id,
		classNames,
		label,
		onChange = noop,
		inputProps,
		customComponents = [],
		value,
		disabled,
		inputLabel,
		selectedAsChip,
		chipProps,
		textFieldInputProps,
		renderDay,
		type = 'Date',
		...otherProps
	} = props

	const DATE_FORMAT =
		type === 'Date'
			? Date_Picker_Const.inputFormat
			: DateTime_Picker_Const.inputFormat

	// For handle when date is wrong format and DatePicker attempt navigate existing date
	// Ex. when 03 May 202, DatePicker will navigate to 31 Dec 1899 when open calendar
	const valuePicker = useMemo(() => {
		if (typeof value === 'string') {
			if (isOpenCalendar && value) {
				return DateTime.fromISO(value).isValid ? value : ''
			}
		}
		return value
	}, [isOpenCalendar, value])

	const WrapperComponent = useCallback(
		(props: any) => (
			<CalendarIcon
				{...generateIdEmbed(`${id}-open`)}
				id={`${id}-open`}
				{...props}
			/>
		),
		[id, generateIdEmbed],
	)

	if (value && selectedAsChip) {
		const renderLabel = () => {
			if (chipProps?.renderChipLabel) return chipProps.renderChipLabel(value)
			if (value instanceof DateTime)
				return value.toFormat(Date_Picker_Const.inputFormat)

			return DateTime.fromISO(value).toFormat(Date_Picker_Const.inputFormat)
		}

		return (
			<Chip
				id={props.id}
				label={renderLabel()}
				deleteFunc={() => {
					if (chipProps?.deleteChipFunc) chipProps.deleteChipFunc(value)
				}}
				classNames={chipProps?.classNames}
			></Chip>
		)
	}

	const customComponent = predictionCustomProps(
		customComponents,
		CUSTOM_COMPONENT,
	)

	const renderHelper = (error?: string | IAlert, helper?: string | IAlert) => {
		const severity = error ? EnumAlertType.error : EnumAlertType.success
		const message = error || helper

		if (!message) return null

		if (typeof message === 'string')
			return (
				<FormHelperText
					error={severity === EnumAlertType.error}
					className={classnames(
						'text-sm',
						severity === EnumAlertType.error
							? '!text-rose-500'
							: 'text-gray-900',
					)}
					{...generateIdEmbed(`${id}-helper`)}
					id={id}
				>
					{message}
				</FormHelperText>
			)

		return (
			<Alert
				id={`${generateIdEmbed}-${id}-helper`}
				classNames="mt-[8px]"
				severity={severity}
				{...message}
			/>
		)
	}

	const slotsRenderDay = ({ day, ...other }: IPickersDayProps) => {
		return (
			<PickersDay
				{...other}
				day={day}
				id={`${id}-${day?.toFormat('dd-MM-yy')}`}
			/>
		)
	}

	const DateInputComponent = type === 'Date' ? MuiDatePicker : MuiDateTimePicker

	return (
		<FormControl
			className={classnames(
				inputClasses.root,
				classes.root,
				'w-full h-full',
				classNames,
			)}
		>
			{inputLabel?.label && (
				<div className="text-sm text-gray-600">
					<div>
						{inputLabel.label}
						{inputLabel.isRequire && (
							<span className="text-rose-600 ml-[3px]">*</span>
						)}
					</div>
				</div>
			)}

			<LocalizationProvider dateAdapter={CustomLuxonAdapter}>
				<DateInputComponent
					{...generateIdEmbed(id)}
					label={label}
					value={valuePicker}
					disabled={disabled}
					views={
						type === 'Date'
							? undefined
							: (['hours', 'minutes', 'seconds'] as any)
					}
					onChange={noop}
					onAccept={(value) => {
						if (value) {
							onChange(value)
						}
					}}
					format={DATE_FORMAT}
					slots={{
						switchViewIcon: KeyboardArrowDownIcon,
						openPickerIcon: WrapperComponent,
						day: renderDay || slotsRenderDay,
						...customComponent.customComponent,
					}}
					slotProps={{
						switchViewButton: {
							...generateIdEmbed(`${id}-select-year`),
							sx: {
								color: 'var(--gray-900)',
								'& svg': {
									height: '16px',
									width: '16px',
								},
								'&:hover': {
									backgroundColor: 'var(--violet-50)',
								},
							},
						},
						rightArrowIcon: {
							...generateIdEmbed(`${id}-next-month`),
							sx: {
								color: 'var(--gray-900)',
								padding: '0',
								'&:hover': {
									backgroundColor: 'var(--violet-50)',
								},
							},
						},
						leftArrowIcon: {
							...generateIdEmbed(`${id}-previous-month`),
							sx: {
								color: 'var(--gray-900)',
								padding: '0',
								'&:hover': {
									backgroundColor: 'var(--violet-50)',
								},
							},
						},
						desktopPaper: {
							sx: {
								boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)',
								borderRadius: '8px',
								'& .MuiPickersCalendarHeader-labelContainer': {
									fontSize: 'var(--font-size-base)',
									color: 'var(--gray-900)',
								},
								'& .MuiDayPicker-header .MuiTypography-caption': {
									fontSize: 'var(--font-size-sm)',
									color: 'var(--gray-400)',
								},
								'& .MuiPickersDay-root, .PrivatePickersYear-root': {
									fontSize: 'var(--font-size-sm)',
									color: 'var(--gray-400)',
								},
								'& .Mui-disabled': {
									color: 'var(--gray-200)',
								},
								'& .MuiPickersDay-today': {
									color: 'var(--gray-900)',
									border: '1px solid var(--violet-500)',
								},
								'& .MuiPickersDay-dayWithMargin:hover': {
									backgroundColor: 'var(--violet-50)',
									color: 'var(--gray-600)',
								},
								'& .PrivatePickersYear-yearButton:hover': {
									backgroundColor: 'var(--violet-50)',
									color: 'var(--gray-600)',
								},
								'& .Mui-selected, .Mui-selected:hover': {
									backgroundColor: 'var(--violet-500) !important',
									color: 'var(--gray-30) !important',
								},
								'& .PrivatePickersSlideTransition-root': {
									minHeight: '200px !important',
								},
								'& .MuiDialogActions-root .MuiButtonBase-root': {
									color: 'var(--violet-500)',
								},
								'& .MuiDialogActions-root .MuiButtonBase-root:hover': {
									backgroundColor: 'var(--violet-50)',
								},
							},
						},
						popper: {
							anchorEl: () => popper.current,
						},
						textField: {
							variant: 'outlined',
							autoComplete: 'off',
							className: classnames(inputClasses.root, inputProps.classNames),
							inputRef: (ref) => {
								if (ref) {
									popper.current = ref
								}
							},
							onBlur: (e: any) => {
								const inputValue = e?.target?.value
								const inputDate =
									type === 'Date'
										? DateTime.fromFormat(inputValue, 'dd/MM/yyyy')
										: DateTime.fromFormat(inputValue, 'dd/MM/yyyy HH:mm:ss')
								if (inputDate.isValid) {
									if (props?.maxDate && inputDate > props?.maxDate) {
										onChange(cloneDeep(props.maxDate))
									} else if (props?.minDate && inputDate < props?.minDate) {
										onChange(cloneDeep(props.minDate))
									} else {
										onChange(inputDate)
									}
								} else {
									onChange(null)
								}
							},
							value: valuePicker,
							onChange: noop,
							error: !!inputProps.error,
							...textFieldInputProps,
							...generateIdEmbedInput(id),
						},
						...customComponent.customProps,
					}}
					{...otherProps}
					onOpen={() => {
						setIsOpenCalendar(true)
					}}
					onClose={() => setIsOpenCalendar(false)}
				/>
			</LocalizationProvider>
			{renderHelper(inputProps.error, inputProps.helper)}
		</FormControl>
	)
}

export interface IDatePickerForm extends Partial<IDatePicker> {
	id: string
	name: string
	control: Control<FieldValues, any>
	defaultValue?: string
	type?: 'Date' | 'DateTime'
}

const DatePickerForm: FC<IDatePickerForm> = (props) => {
	const { name, control, defaultValue, inputProps, type, ...otherProps } = props
	return (
		<Controller
			name={name} // same as register('name)
			control={control} // react form controller
			defaultValue={defaultValue}
			render={({ field, fieldState: { error } }: any) => {
				return (
					<DatePicker
						type={type}
						value={field.value ?? null}
						onChange={field.onChange}
						{...otherProps}
						inputProps={{
							id: 'date-picker',
							field,
							error: error?.message,
							...inputProps,
						}}
					/>
				)
			}}
		/>
	)
}

export { DatePicker, DatePickerForm }
