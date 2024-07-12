import MuiButton, { ButtonProps } from '@mui/material/Button'
import classnames from 'classnames'
import { FC } from 'react'
import useId from 'utils/useId'
import {
	icon,
	themeColorSx,
	themeFontSize,
	themeSizeClassName,
} from './ThemeConfig'
import { COMPONENT_TYPE } from 'shared/componentType'

export interface IButton extends ButtonProps {
	id?: string
	text?: string
	// Check with figma board
	themetype?: 'filled' | 'outline' | 'pill' | 'link'
	themesize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
	starticon?: 'search' | 'download' | 'add' | 'check'
	endicon?: 'search' | 'download' | 'add' | 'check'
	danger?: boolean // red button theme
	classNames?: string
	additionalSx?: object
}

const Button: FC<IButton> = (props) => {
	const {
		id = 'button',
		text = '',
		themetype = 'outline',
		themesize = 'base',
		starticon,
		endicon,
		variant = 'contained', // default by mui are text
		classNames,
		additionalSx = {},
		children,
		danger,
		...otherProps
	} = props

	const fontSize = themeFontSize[themesize]

	const renderStartIcon = () => {
		if (starticon) return icon[starticon]
	}

	const renderEndIcon = () => {
		if (endicon) return icon[endicon]
	}

	const generateIdEmbed = useId(COMPONENT_TYPE.BUTTON)

	const sx = {
		boxShadow: 'unset',
		...(danger
			? themeColorSx[themetype].danger
			: themeColorSx[themetype].normal),
		...additionalSx,
	}
	return (
		<MuiButton
			id={id}
			startIcon={renderStartIcon()}
			endIcon={renderEndIcon()}
			variant={variant}
			className={classnames(
				fontSize,
				'font-semibold',
				classNames,
				themeSizeClassName[themesize],
			)}
			sx={sx}
			{...generateIdEmbed(id)}
			{...otherProps}
		>
			{text || children}
		</MuiButton>
	)
}

export default Button
