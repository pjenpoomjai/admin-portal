import MuiAlert, { AlertProps } from '@mui/material/Alert'
import MuiAlertTitle, { AlertTitleProps } from '@mui/material/AlertTitle'
import ErrorIcon from 'public/static/images/alert-error-x.svg'
import SuccessIcon from 'public/static/images/alert-success.svg'
import WarningIcon from 'public/static/images/alert-warning.svg'
import classnames from 'classnames'
import { FC } from 'react'
import useId from 'utils/useId'
import defaultClasses from './alert.module.css'
import { COMPONENT_TYPE } from 'shared/componentType'

export enum EnumAlertType {
	success = 'success',
	error = 'error',
	warning = 'warning',
}

export interface IAlert extends AlertProps {
	severity?: EnumAlertType
	alertTitleProps?: AlertTitleProps
	classNames?: string
}

const icons = {
	success: {
		className: 'bg-teal-50',
		titleClassName: 'text-teal-700',
		messageClassName: 'text-teal-500',
		icon: <SuccessIcon />,
	},
	error: {
		className: 'bg-rose-50',
		titleClassName: 'text-rose-700',
		messageClassName: 'text-rose-600 flex-1',
		icon: <ErrorIcon />,
	},
	warning: {
		className: 'bg-yellow-50',
		titleClassName: 'text-yellow-700',
		messageClassName: 'text-yellow-600 ',
		icon: <WarningIcon />,
	},
}

const Alert: FC<IAlert> = (props) => {
	const {
		id,
		alertTitleProps,
		severity = EnumAlertType.success,
		children,
		classNames,
		...otherProps
	} = props
	const classes = classnames(defaultClasses.root, classNames)
	const { className, titleClassName, messageClassName, icon } = icons[severity]
	const generateIdEmbed = useId(COMPONENT_TYPE.ALERT)

	return (
		<MuiAlert
			className={classnames(
				classes,
				className,
				'p-[16px] text-base rounded-[8px]',
			)}
			icon={icon}
			severity={severity}
			{...generateIdEmbed(id ? `container-${id}` : 'container')}
			{...otherProps}
		>
			{alertTitleProps && (
				<MuiAlertTitle
					className={titleClassName}
					{...generateIdEmbed('title')}
					{...alertTitleProps}
				/>
			)}
			<div className={messageClassName} {...generateIdEmbed('detail')}>
				{children}
			</div>
		</MuiAlert>
	)
}

export default Alert
