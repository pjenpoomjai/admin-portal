'use client'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import MuiCircularProgress from '@mui/material/CircularProgress'
import MuiTextField from '@mui/material/TextField'
import { FilterOptionsState } from '@mui/material/useAutocomplete'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import classnames from 'classnames'
import FormHelperText from 'components/common/FormHelperText'
import CheckIcon from 'components/common/Icon/Check'
import KeyboardArrowDownIcon from 'components/common/Icon/KeyboardArrowDown'
import _debounce from 'lodash/debounce'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import Alert, { EnumAlertType, IAlert } from '../Alert'
import Chip from '../Chip'
import defaultClasses from './autocompleteSelectAsync.module.css'
import MuiAutocomplete, {
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
	AutocompleteRenderInputParams,
	AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete'
import {
	FocusEventHandler,
	HTMLAttributes,
	ReactNode,
	SyntheticEvent,
	useRef,
} from 'react'
import {
	Control,
	Controller,
	FieldPath,
	FieldValues,
	RegisterOptions,
} from 'react-hook-form'
import flow from 'lodash/flow'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import { EnumMaskType, getMasked } from '../Input/Input'
import { Normalization, Transform } from 'shared/components/utils'
import { IMaskMixin } from 'react-imask'
import { OutlinedInput } from '@mui/material'
import { transformTrim } from 'utils/transforms'
import { AutocompleteInputChangeReason } from './interface'
import { acceptCharacterInput, validateNormalize } from 'utils/normalizeInput'
import useAutocompleteSelectAsync from './controller'

export const MaskedStyledInput = IMaskMixin(
	({ inputRef, id, error, outlinedInputProps, endAdornment }: any) => {
		const generateIdEmbed = useId(COMPONENT_TYPE.INPUT)
		return (
			<OutlinedInput
				inputRef={inputRef}
				className="w-full !pr-[35px]"
				disabled={outlinedInputProps?.disabled}
				inputProps={{
					...generateIdEmbed(id),
					...outlinedInputProps,
					className: 'p-0 min-h-[29px]',
				}}
				endAdornment={endAdornment}
				error={!!error}
			/>
		)
	},
)

export interface IAutocompleteSelectAsync<T> {
	id: string
	options: T[]
	disabled?: boolean
	loading?: boolean
	placeholder?: string
	valueIndex: keyof T
	labelIndex: keyof T
	displayLabelIndex?: keyof T
	additionalLabelIndex?: keyof T
	freeSolo?: boolean
	error?: string | IAlert
	helper?: string | IAlert
	debounce?: number
	value?: T
	classNames?: string
	classNameContainer?: string
	selectedAsChip?: boolean
	labelProps?: {
		label?: string
		isRequire?: boolean
	}
	height?: number
	themesize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
	disableClearable?: boolean
	trigger?: (
		event: SyntheticEvent,
		value?: string,
		reason?: AutocompleteInputChangeReason,
	) => void
	onChange?: (
		event: SyntheticEvent<Element, Event>,
		value: string | T | null,
		reason: AutocompleteChangeReason,
		details?: AutocompleteChangeDetails<T>,
	) => void
	onBlur?: FocusEventHandler<HTMLDivElement>
	onInputChange?: (
		event: SyntheticEvent<Element, Event>,
		value: string,
		reason: AutocompleteInputChangeReason,
	) => void
	chipProps?: {
		deleteChipFunc?: (value?: T) => void
		renderChipLabel?: (value?: T) => string
		classNames?: string
	}
	filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[]
	onOpen?: any
	isOptionEqualToValue?: (option: T, value: T) => boolean
	multiple?: boolean
	renderTags?: (tagValue: any, getTagProps: any) => any
	renderInputLabel?: string
	renderInput?: (params: any) => JSX.Element
	renderOption?: (
		props: HTMLAttributes<HTMLLIElement>,
		option: T,
		state: AutocompleteRenderOptionState,
	) => ReactNode | undefined
	noOptionsText?: string
	mask?: EnumMaskType
	maskOptional?: RegExp
	transforms?: Transform[]
	normalizes?: Normalization[]
}

const AutocompleteSelectAsync = <T,>(props: IAutocompleteSelectAsync<T>) => {
	const {
		id,
		loading,
		placeholder,
		error,
		helper,
		labelIndex,
		valueIndex,
		displayLabelIndex,
		additionalLabelIndex,
		value = '',
		themesize = 'base',
		debounce = 0,
		trigger,
		onBlur,
		classNames,
		classNameContainer,
		selectedAsChip,
		chipProps,
		options,
		labelProps,
		height = 48,
		filterOptions,
		onOpen,
		multiple,
		mask,
		maskOptional,
		transforms = [transformTrim],
		noOptionsText = 'No results found.',
		normalizes = [acceptCharacterInput],
		renderInputLabel,
		...otherProps
	} = props
	const activityMaskOnBlur = useRef(false)
	const { open, ref, setOpen, setPosition } = useAutocompleteSelectAsync()
	const generateIdEmbed = useId(COMPONENT_TYPE.AUTOCOMPLETE_SELECT_ASYNC)
	const theme = {
		xs: {
			input: 'xs',
			list: 'xs',
		},
		sm: {
			input: 'sm',
			list: 'xs',
		},
		base: {
			input: 'base',
			list: 'sm',
		},
		lg: {
			input: 'lg',
			list: 'base',
		},
		xl: {
			input: 'xl',
			list: 'base',
		},
	}

	const renderHelper = (error?: string | IAlert, helper?: string | IAlert) => {
		const severity = error ? EnumAlertType.error : EnumAlertType.success
		const message = error || helper

		if (!message) return null

		if (typeof message === 'string')
			return (
				<FormHelperText
					error={severity === EnumAlertType.error}
					className={classnames(
						'text-xs',
						severity === EnumAlertType.error
							? '!text-rose-500'
							: '!text-gray-900',
					)}
					{...generateIdEmbed(`${id}-helper`)}
				>
					{message}
				</FormHelperText>
			)

		return (
			<Alert
				id={`${id}-helper`}
				classNames="mt-[8px]"
				severity={severity}
				{...message}
			/>
		)
	}

	if (value && selectedAsChip && !multiple) {
		const item = options.find((option) => option[valueIndex] === value)
		const renderLabel = () => {
			if (chipProps?.renderChipLabel) return chipProps.renderChipLabel(item)

			return item ? (item[labelIndex] as string) : ''
		}

		return (
			<Chip
				id={`${generateIdEmbed}-${id}`}
				label={renderLabel()}
				deleteFunc={() => {
					if (chipProps?.deleteChipFunc) chipProps.deleteChipFunc(item)
				}}
				classNames={chipProps?.classNames}
			></Chip>
		)
	}

	const renderMask = (
		params: AutocompleteRenderInputParams,
		endAdornment: JSX.Element,
	) => {
		const {
			inputProps: { ref, onChange, value, ...rest },
		}: any = params
		return (
			<div ref={params.InputProps.ref}>
				<MaskedStyledInput
					mask={getMasked({ mask, maskOptional })}
					onAccept={(_value: any, _mask: any) => {
						const normalizeValues = flow(...transforms)(_mask.unmaskedValue)
						if (onChange && activityMaskOnBlur.current === true) {
							onChange({
								target: { value: normalizeValues },
							})
						}
					}}
					inputRef={ref}
					scale={0}
					lazy={false}
					id={id}
					value={value}
					error={!!error}
					endAdornment={endAdornment}
					outlinedInputProps={{
						placeholder: placeholder,
						className: classnames(params.InputProps.className, 'w-full'),
						...rest,
						autoComplete: 'off',
						onKeyPress: (e: any) => {
							renderOnkeyPress(e)
						},
						onPaste: (e: any) => {
							activityMaskOnBlur.current = true
							onChange({
								target: { value: e.target.value },
							})
						},
						onKeyDown: (e: any) => {
							if (e.code === 'Backspace') {
								activityMaskOnBlur.current = true
							}
						},
						onBlur: (e: any) => {
							e.target.value = flow(...transforms)(e.target.value)
							activityMaskOnBlur.current = false
							if (trigger) {
								trigger(e, e.target.value, 'blur')
							}
						},
					}}
				/>
			</div>
		)
	}

	const renderOnkeyPress = (e: any) => {
		activityMaskOnBlur.current = true
		if (e.key === 'Enter') {
			if (trigger) {
				trigger(e, e.target.value, 'enter')
			}
			setOpen(false)
		}
	}

	const renderInput = (
		params: AutocompleteRenderInputParams,
		label?: string,
	) => {
		const endAdornment = (
			<div {...generateIdEmbed(`${id}-open`)}>
				{loading ? (
					<MuiCircularProgress
						className="mr-[12px] mt-1"
						color="inherit"
						size={12}
					/>
				) : (
					params.InputProps.endAdornment
				)}
			</div>
		)
		if (mask) return renderMask(params, endAdornment)
		return (
			<MuiTextField
				{...params}
				variant="outlined"
				placeholder={placeholder}
				hiddenLabel={!label}
				label={label}
				error={!!error}
				InputProps={{
					...params.InputProps,
					componentsProps: {
						input: {
							...generateIdEmbed(`${id}-input`),
							autoComplete: 'off',
						},
					},
					endAdornment: endAdornment,
				}}
				sx={{
					'.MuiOutlinedInput-root': {
						height: `${height}px`,
						padding: '0px !important',
					},
					'& .MuiOutlinedInput-root .MuiOutlinedInput-input': {
						paddingLeft: '0',
						paddingRight: '0',
						color: 'var(--gray-900)',
						fontSize: `var(--font-size-${theme[themesize].input})`,
					},
					'& .MuiOutlinedInput-root .MuiOutlinedInput-input::placeholder': {
						color: 'var(--gray-400)',
						opacity: 1,
					},
					'.MuiOutlinedInput-notchedOutline': {
						borderRadius: '8px',
						border: '1px solid var(--gray-300)',
						padding: '0 12px',
					},
					'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: 'var(--violet-500)',
					},
					'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
						{
							borderColor: 'var(--violet-500)',
							// boxShadow: '0px 0px 0px 2px var(--violet-300)',
						},
					'.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
						borderColor: 'var(--rose-500)',
					},
					'& .MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline':
						{
							borderColor: 'var(--rose-500)',
						},
					'& .MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline':
						{
							borderColor: 'var(--rose-500)',
							// boxShadow: '0px 0px 0px 2px var(--rose-300)',
						},
					'& .MuiOutlinedInput-root.Mui-disabled': {
						backgroundColor: 'var(--gray-100)',
					},
					'& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-input::placeholder':
						{
							color: 'var(--gray-500)',
							opacity: 1,
						},
					'& .MuiAutocomplete-endAdornment': {
						paddingRight: '0',
						position: 'absolute',
					},
				}}
			/>
		)
	}

	return (
		<div className={classNameContainer}>
			{labelProps && (
				<div
					className="w-full text-xs text-gray-600 mb-[4px]"
					{...generateIdEmbed(`${id}-label`)}
				>
					{labelProps.label}
					{labelProps.isRequire && (
						<span className="text-rose-600 ml-[3px]">*</span>
					)}
				</div>
			)}
			<MuiAutocomplete
				className={classnames(classNames, defaultClasses.root)}
				open={open}
				value={value}
				options={options}
				loading={loading}
				multiple={multiple}
				noOptionsText={noOptionsText}
				onOpen={() => {
					setOpen(true)
					if (onOpen) onOpen()
				}}
				onClose={() => {
					setOpen(false)
				}}
				blurOnSelect
				disableClearable={false}
				isOptionEqualToValue={(option, value) => {
					return option[valueIndex as any] === value[valueIndex as any]
				}}
				getOptionLabel={(option) => {
					if (typeof option === 'string') return option
					if (!option) return ''
					return `${option[labelIndex] as string}`
				}}
				sx={{
					height: `${height}px`,
				}}
				componentsProps={{
					paper: {
						sx: {
							border: '1px solid var(--gray-200)',
							borderRadius: '8px',
							filter: 'drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.1))',
							boxShadow: 'unset',
							'.MuiAutocomplete-listbox': {
								padding: 0,
							},
							'.MuiAutocomplete-listbox .MuiAutocomplete-option:last-child': {
								borderBottom: 'unset',
							},
						},
					},
				}}
				ListboxProps={{
					onScroll: (event: SyntheticEvent) => {
						const target = event.currentTarget
						const { clientHeight, scrollTop, scrollHeight } = target
						const top = scrollTop + clientHeight

						if (Math.ceil(top) >= scrollHeight) {
							if (trigger) trigger(event)

							setPosition(scrollTop)
						}
					},
					// @ts-ignore
					ref,
				}}
				onInputChange={_debounce(
					(
						event: SyntheticEvent,
						val: string,
						reason: AutocompleteInputChangeReason,
					) => {
						if (trigger && reason === 'input') trigger(event, val, reason)
					},
					debounce,
				)}
				onKeyDown={(e: any) => {
					const keyFillIn = e.key
					if (normalizes.length > 0 && keyFillIn) {
						const isValid = validateNormalize(normalizes, keyFillIn)
						if (!isValid) {
							e.preventDefault()
							return
						}
					}
				}}
				onPaste={(e: any) => {
					const value = e.clipboardData.getData('Text')
					if (value && normalizes.length > 0) {
						const isValid = validateNormalize(normalizes, value)
						if (!isValid) {
							e.preventDefault()
							return
						}
					}
				}}
				onBlur={onBlur}
				popupIcon={<KeyboardArrowDownIcon />}
				filterOptions={filterOptions}
				renderOption={(
					props: HTMLAttributes<HTMLLIElement>,
					option: T,
					state: AutocompleteRenderOptionState,
				) => {
					const { inputValue, selected } = state
					const matches = match(option[labelIndex] as string, inputValue, {
						insideWords: true,
					})
					const parts = parse(option[labelIndex] as string, matches)
					const isDisable = (option as any)?.disabled
					if (isDisable) {
						delete props.onClick
					}
					const currentIndex = options.findIndex((op) => {
						return isEqual((option as any).value, (op as any).value)
					})
					const optionIndex = currentIndex > -1 ? currentIndex : 0
					return (
						<li
							{...props}
							key={(option as any).id}
							className={classnames(
								props.className,
								isDisable
									? 'text-gray-300'
									: 'flex h-fit px-[12px] py-[8px] border-b-[1px] border-gray-200 border-solid hover:bg-violet-50 [&>div]:text-gray-900 [&>div]:hover:text-gray-500',
							)}
							{...generateIdEmbed(`${id}-${option[labelIndex] as string}`)}
						>
							{additionalLabelIndex ? (
								<div className={`text-${theme[themesize].list} flex flex-col`}>
									<span {...generateIdEmbed(`${id}-label-${optionIndex}`)}>{`${
										option[displayLabelIndex || labelIndex] as string
									}`}</span>
									<span
										{...generateIdEmbed(
											`${id}-label-additional-${optionIndex}`,
										)}
										className="text-xs text-gray-500"
									>
										{isNil(option[additionalLabelIndex])
											? ''
											: (option[additionalLabelIndex] as string)}
									</span>
								</div>
							) : (
								<div className={`text-${theme[themesize].list}`}>
									{parts.map((part, index) => {
										return (
											<span
												{...generateIdEmbed(
													`${id}-label-${optionIndex}-${index}`,
												)}
												key={`${id}-label-${optionIndex}`}
												style={{
													fontWeight: part.highlight ? 900 : 100,
												}}
											>
												{part.text}
											</span>
										)
									})}
								</div>
							)}
							{selected ? (
								<CheckIcon className="w-[24px] h-[24px] ml-auto text-violet-500" />
							) : null}
						</li>
					)
				}}
				renderInput={(params) => {
					return renderInput(params, renderInputLabel)
				}}
				{...generateIdEmbed(`${id}-root`)}
				{...otherProps}
			/>
			{renderHelper(error, helper)}
		</div>
	)
}

export interface IAutocompleteSelectAsyncForm<T> {
	name: string
	control: Control<FieldValues, any>
	defaultValue?: any
	rules?: Omit<
		RegisterOptions<FieldValues, FieldPath<FieldValues>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
	autoCompleteProps: Omit<IAutocompleteSelectAsync<T>, 'value'>
	onChange?: (props: any) => any
}
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const AutocompleteSelectAsyncForm = <T,>(
	props: IAutocompleteSelectAsyncForm<T>,
) => {
	const {
		name,
		control,
		rules,
		defaultValue,
		autoCompleteProps,
		...otherProps
	} = props

	return (
		<Controller
			rules={rules}
			name={name} // same as register('name)
			control={control} // react form controler
			defaultValue={defaultValue}
			render={({ field, fieldState: { error } }: any) => {
				const onChange = (
					event: SyntheticEvent<Element, Event>,
					value: string | T | null,
					reason: AutocompleteChangeReason,
					details?: AutocompleteChangeDetails<T>,
				) => {
					if (autoCompleteProps.onChange)
						autoCompleteProps.onChange(event, value, reason, details)

					field.onChange(value)
				}

				return (
					<AutocompleteSelectAsync<T>
						{...autoCompleteProps}
						value={field.value}
						onChange={onChange}
						{...otherProps}
						error={error?.message}
						onBlur={field.onBlur}
					/>
				)
			}}
		/>
	)
}

export { AutocompleteSelectAsync, AutocompleteSelectAsyncForm }
