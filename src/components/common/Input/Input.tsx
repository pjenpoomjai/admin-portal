'use client'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import classnames from 'classnames'
import flow from 'lodash/flow'
import noop from 'lodash/noop'
import {
	ChangeEvent,
	ChangeEventHandler,
	ClipboardEvent,
	ClipboardEventHandler,
	ReactNode,
	Ref,
} from 'react'
import {
	Control,
	Controller,
	ControllerRenderProps,
	FieldValues,
} from 'react-hook-form'
import { IMaskMixin } from 'react-imask'
import { COMPONENT_TYPE } from 'shared/componentType'
import { Normalization, Transform } from 'shared/components/utils'
import FormHelperText from 'src/components/common/FormHelperText'
import Visibility from 'src/components/common/Icon/Visibility'
import VisibilityOff from 'src/components/common/Icon/VisibilityOffOutlined'
import IconButton from 'src/components/common/IconButton'
import { mergeClasses, useId } from 'utils'
import { acceptCharacterInput, validateNormalize } from 'utils/normalizeInput'
import { transformTrim } from 'utils/transforms'
import Alert, { EnumAlertType, IAlert } from '../Alert'
import useInput from './controller'
import defaultClasses from './input.module.css'

export interface IInputLabel {
	label?: string
	isRequire?: boolean
	labelAdornment?: string
}
export enum EnumMaskType {
	customerId = '0-0000-00000-00-0',
	bankAccountNo = '000-0-00000-0',
	number = 'number',
	string = 'string',
}
export enum EnumTextStyleCase {
	toUpperCase = 'toUpperCase',
	toLowerCase = 'toLowerCase',
}

export interface IInput {
	id: string
	classes?: object
	classNames?: string
	field?: ControllerRenderProps<FieldValues, string>
	inputRef?: Ref<any>
	label?: ReactNode
	error?: string | IAlert
	helper?: string | IAlert
	inputLabelProps?: InputLabelProps
	outlinedInputProps?: OutlinedInputProps
	inputLabel?: IInputLabel
	// mask and maskOptional using for normally masking
	mask?: EnumMaskType
	maskOptional?: RegExp
	isUseUnmaskValue?: boolean
	scale?: number
	thousandsSeparator?: string
	radix?: string
	onChange?: (...event: any[]) => void
	onBlur?: (...event: any[]) => void
	value?: any
	normalizes?: Normalization[]
	transforms?: Transform[]
	max?: number
	min?: number
	textStyleCase?: EnumTextStyleCase
}

export interface IInputForm extends Omit<IInput, 'field'> {
	name: string
	control: Control<FieldValues, any>
	defaultValue?: string
}

type IMasked = Pick<IInput, 'mask' | 'maskOptional'>

export const getMasked = ({ mask, maskOptional }: IMasked) => {
	if (mask === EnumMaskType.number) {
		return Number
	}
	return [
		{
			mask,
		},
		{
			mask: maskOptional || /.+/,
		},
	]
}

export const MaskedStyledInput = IMaskMixin(
	({ inputRef, id, error, outlinedInputProps, passwordOption }: any) => {
		const generateIdEmbed = useId(COMPONENT_TYPE.INPUT)
		const generateDivEmbedId = useId(COMPONENT_TYPE.DIV)
		return (
			<OutlinedInput
				id={id}
				inputRef={inputRef}
				inputProps={{
					sx: { padding: '12px' },
					...generateIdEmbed(id),
				}}
				error={!!error}
				{...outlinedInputProps}
				{...(outlinedInputProps?.type === 'password' ? passwordOption : {})}
				{...generateDivEmbedId(`${id}-root`)}
			/>
		)
	},
)

const Input = (props: IInput) => {
	const classes = mergeClasses(defaultClasses, props.classes)
	const {
		id,
		inputRef,
		label,
		inputLabelProps,
		outlinedInputProps,
		field = {},
		inputLabel,
		classNames,
		onChange = noop,
		onBlur = noop,
		value,
		error,
		scale,
		thousandsSeparator,
		radix,
		mask,
		maskOptional,
		helper,
		normalizes = [acceptCharacterInput],
		transforms = [transformTrim],
		max,
		min,
		textStyleCase,
		isUseUnmaskValue = true,
	} = props
	const { showPassword, onClickShowPassword, onMouseDownPassword } = useInput()
	const generateIdEmbed = useId(COMPONENT_TYPE.INPUT)
	const generateIdDivEmbed = useId(COMPONENT_TYPE.DIV)
	const generateInputEmbedId = generateIdEmbed(id)
	const generateRootEmbedId = generateIdEmbed(`${id}-root`)
	const generateInputLabelEmbedId = generateIdEmbed('input-label-' + id)
	const overrideOutlinedInputProps: OutlinedInputProps = {
		...outlinedInputProps,
		autoComplete: 'off',
	}

	const passwordOption = {
		type: showPassword ? 'text' : 'password',
		endAdornment: (
			<InputAdornment position="end">
				<IconButton
					aria-label="toggle password visibility"
					onClick={onClickShowPassword}
					onMouseDown={onMouseDownPassword}
					edge="end"
				>
					{showPassword ? <Visibility /> : <VisibilityOff />}
				</IconButton>
			</InputAdornment>
		),
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

	const tranformTextStyleCase = (value: string): string => {
		if (!textStyleCase) return value
		return textStyleCase === EnumTextStyleCase.toUpperCase
			? value.toUpperCase()
			: value.toLowerCase()
	}

	const removeCharacterSupportUseRef = (
		charactersRemove: string,
		itemValue: string,
	): string => {
		return itemValue.replace(charactersRemove, '')
	}

	const onChangeHelper: ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e?.target?.value
		if (textStyleCase) {
			e.target.value = flow(tranformTextStyleCase)(value)
		}
		const inputType = (e.nativeEvent as any).inputType
		if (
			normalizes.length > 0 &&
			value &&
			inputType !== 'deleteContentBackward'
		) {
			const isValid = validateNormalize(normalizes, value)
			if (!isValid) {
				e.target.value = removeCharacterSupportUseRef(
					(e?.nativeEvent as any)?.data,
					value,
				)
				e.preventDefault()
				return
			}
		}
		if (onChange) {
			onChange(e)
		}
	}

	const onBlurHelper = (...rest: any[]) => {
		const internalAction = () => {
			if (overrideOutlinedInputProps?.onBlur) {
				overrideOutlinedInputProps.onBlur(rest[0])
			} else {
				onBlur(...rest)
			}
		}
		rest[0].target.value = flow(...transforms)(rest[0].target.value)
		onChange(rest[0])
		internalAction()
	}

	const onPasteHelper: ClipboardEventHandler<HTMLDivElement> = (
		e: ClipboardEvent<HTMLDivElement>,
	) => {
		const value = e.clipboardData.getData('Text')
		if (value && normalizes.length > 0) {
			const isValid = validateNormalize(
				normalizes,
				e.clipboardData.getData('Text'),
			)
			if (!isValid) {
				e.preventDefault()
				return
			}
		}
	}

	const isPasswordType = overrideOutlinedInputProps?.type === 'password'
	const passwordOptionProps = isPasswordType ? passwordOption : {}
	if (inputLabel) {
		const customStyle = inputLabel.labelAdornment ? 'flex justify-between' : ''
		return (
			<FormControl
				className={classnames(classes.root, 'w-full h-full', classNames)}
			>
				<div
					className={classnames('text-sm text-gray-600', customStyle)}
					{...generateIdDivEmbed(id)}
				>
					<div>
						{inputLabel.label}
						{inputLabel.isRequire && (
							<span className="text-rose-600 ml-[3px]">*</span>
						)}
					</div>
					{!!inputLabel.labelAdornment && (
						<div>{inputLabel.labelAdornment}</div>
					)}
				</div>

				{mask ? (
					<MaskedStyledInput
						mask={getMasked({ mask, maskOptional })}
						scale={scale}
						thousandsSeparator={thousandsSeparator}
						radix={radix}
						onAccept={(value: any, mask: any) => {
							const targetValue = isUseUnmaskValue ? mask.unmaskedValue : value
							const normalizeValues = flow(
								...transforms,
								tranformTextStyleCase,
							)(targetValue)
							if (onChange) onChange(normalizeValues)
						}}
						lazy={false}
						value={value}
						id={id}
						inputRef={inputRef}
						error={!!error}
						outlinedInputProps={{
							...overrideOutlinedInputProps,
							onBlur: (e: ChangeEvent<HTMLInputElement>) => {
								e.target.value = flow(...transforms)(e.target.value)
							},
						}}
						passwordOption={passwordOption}
						min={min}
						max={max}
					/>
				) : (
					<OutlinedInput
						id={id}
						inputRef={inputRef}
						inputProps={{
							sx: { padding: '12px' },
							...generateInputEmbedId,
						}}
						error={!!error}
						{...generateRootEmbedId}
						{...field}
						{...overrideOutlinedInputProps}
						{...passwordOptionProps}
						// onKeyUp={onKeyUpHelper}
						onChange={onChangeHelper}
						onBlur={onBlurHelper}
						onPaste={onPasteHelper}
					/>
				)}

				{renderHelper(error, helper)}
			</FormControl>
		)
	}
	return (
		<FormControl
			className={classnames(classes.root, 'w-full h-full', classNames)}
			variant="filled"
		>
			{label && (
				<InputLabel
					{...inputLabelProps}
					{...generateInputLabelEmbedId}
					htmlFor={id}
					variant="outlined"
				>
					{label}
				</InputLabel>
			)}
			<OutlinedInput
				id={id}
				inputRef={inputRef}
				inputProps={{
					sx: {
						padding: label ? '12px' : '0 12px',
					},
					...generateInputEmbedId,
				}}
				label={label}
				error={!!error}
				{...field}
				{...overrideOutlinedInputProps}
				{...generateRootEmbedId}
				{...passwordOptionProps}
				onChange={onChangeHelper}
				onBlur={onBlurHelper}
				onPaste={onPasteHelper}
			/>
			{renderHelper(error, helper)}
		</FormControl>
	)
}

const InputForm = (props: IInputForm) => {
	const {
		id,
		inputRef,
		name,
		label,
		control,
		classes,
		classNames,
		defaultValue = '',
		inputLabelProps,
		outlinedInputProps,
		helper,
		inputLabel,
		normalizes,
		mask,
		maskOptional,
		scale,
		thousandsSeparator,
		radix,
		onChange,
		transforms,
		min,
		max,
		textStyleCase,
		isUseUnmaskValue,
	} = props

	return (
		<Controller
			name={name} // same as register('name)
			control={control} // react form controler
			defaultValue={defaultValue}
			render={({ field, fieldState: { error } }) => (
				<Input
					isUseUnmaskValue={isUseUnmaskValue}
					id={id}
					classes={classes}
					inputRef={inputRef}
					transforms={transforms}
					label={label}
					classNames={classNames}
					inputLabelProps={inputLabelProps}
					outlinedInputProps={outlinedInputProps}
					error={error?.message}
					field={field}
					inputLabel={inputLabel}
					value={field.value}
					onChange={onChange || field.onChange}
					onBlur={field.onBlur}
					mask={mask}
					maskOptional={maskOptional}
					scale={scale}
					radix={radix}
					thousandsSeparator={thousandsSeparator}
					helper={helper}
					normalizes={normalizes}
					min={min}
					max={max}
					textStyleCase={textStyleCase}
				/>
			)}
		/>
	)
}

export { Input, InputForm }
