import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import classnames from 'classnames'
import FormHelperText from 'components/common/FormHelperText'
import noop from 'lodash/noop'
import CheckboxCheckedSvg from 'public/static/images/checkbox-checked.svg'
import CheckboxDisableCheckedSvg from 'public/static/images/checkbox-disable-checked.svg'
import CheckboxDisableUnCheckedSvg from 'public/static/images/checkbox-disable-unchecked.svg'
import CheckboxIndeterminateSvg from 'public/static/images/checkbox-indeterminate.svg'
import CheckboxReadOnlyCheckedSvg from 'public/static/images/checkbox-readonly-checked.svg'
import CheckboxReadOnlyNonCheckedSvg from 'public/static/images/checkbox-readonly-noncheck.svg'
import CheckboxSvg from 'public/static/images/checkbox.svg'
import {
	Control,
	Controller,
	FieldValues,
	UseFormRegisterReturn,
} from 'react-hook-form'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import defaultClasses from './checkbox.module.css'

export interface ICheckbox extends CheckboxProps {
	id: string
	error?: string
	type?: 'rectangle' | 'circle'
	classNames?: string
	label?: string
	register?: UseFormRegisterReturn
	checkId?: string
	textId?: string
	labelClass?: string
}
export interface ICheckboxForm extends ICheckbox {
	name: string
	control: Control<FieldValues, any>
}

const Checkbox = (props: ICheckbox) => {
	const {
		checked,
		label,
		error,
		disabled = false,
		type = 'rectangle',
		register = {},
		classNames,
		value,
		onChange = noop,
		checkId: _unusedCheckId,
		textId: _unusedTextId,
		labelClass,
		...otherProps
	} = props
	const classes = classnames(defaultClasses.root, classNames)
	const generateIdEmbed = useId(COMPONENT_TYPE.CHECKBOX)

	const iconSet = getIconSet(type, disabled)

	const CheckboxComponent = (
		<MuiCheckbox
			value={value}
			onChange={(event: React.ChangeEvent<HTMLInputElement>, value: any) => {
				onChange(event, value)
			}}
			className={classnames(classes, label && 'pr-[14px]')}
			checked={checked}
			disabled={disabled}
			{...iconSet}
			{...register}
			{...otherProps}
			inputProps={{
				...(otherProps?.inputProps || {}),
				...generateIdEmbed(props.id),
			}}
		></MuiCheckbox>
	)

	if (label) {
		const labelElement = (
			<div
				className={classnames(
					'pl-[12px] text-base',
					disabled ? 'text-gray-400' : 'text-gray-900',
					labelClass,
				)}
				{...generateIdEmbed(`${props.textId}-label`)}
			>
				{label}
			</div>
		)
		return (
			<FormControl variant="filled" error={!!error}>
				<FormControlLabel
					control={CheckboxComponent}
					label={labelElement}
					disableTypography={true}
					sx={{
						marginLeft: '0px',
					}}
				/>
				{error && <FormHelperText id={props.id}>{error}</FormHelperText>}
			</FormControl>
		)
	}

	return CheckboxComponent
}

const CheckboxForm = (props: ICheckboxForm) => {
	const { name, control, ...otherProps } = props
	return (
		<Controller
			name={name} // same as register('name)
			control={control} // react form controler
			render={({ field, fieldState: { error } }) => {
				return (
					<Checkbox
						value={field.value ?? []}
						onChange={field.onChange}
						error={error?.message}
						{...otherProps}
						checked={!!field.value}
					/>
				)
			}}
		/>
	)
}

const getIconSet = (type: string, disabled: boolean) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)
	if (type === 'rectangle') {
		return {
			icon: disabled ? (
				<CheckboxDisableUnCheckedSvg
					{...generateIdEmbed('CheckboxDisableUnCheckedSvg')}
				/>
			) : (
				<CheckboxSvg {...generateIdEmbed('CheckboxSvg')} />
			),
			checkedIcon: disabled ? (
				<CheckboxDisableCheckedSvg
					{...generateIdEmbed('CheckboxDisableCheckedSvg')}
				/>
			) : (
				<CheckboxCheckedSvg {...generateIdEmbed('CheckboxCheckedSvg')} />
			),
			indeterminateIcon: (
				<CheckboxIndeterminateSvg
					{...generateIdEmbed('CheckboxIndeterminateSvg')}
				/>
			),
		}
	}

	if (type === 'circle') {
		return {
			icon: (
				<CheckboxReadOnlyNonCheckedSvg
					{...generateIdEmbed('CheckboxReadOnlyNonCheckedSvg')}
				/>
			),
			checkedIcon: (
				<CheckboxReadOnlyCheckedSvg
					{...generateIdEmbed('CheckboxReadOnlyCheckedSvg')}
				/>
			),
		}
	}
	return {}
}

export { Checkbox, CheckboxForm }
