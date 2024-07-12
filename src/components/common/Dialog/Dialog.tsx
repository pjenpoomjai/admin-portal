import MuiDialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import classnames from 'classnames'
import CloseCircleIcon from 'public/static/images/close-circle.svg'
import CloseDialogIcon from 'public/static/images/close-dialog-icon.svg'
import ExclamationCircleIcon from 'public/static/images/exclamationCircle.svg'
import InfoIcon from 'public/static/images/info-icon.svg'
import { FC, ReactElement, ReactNode } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import Button, { IButton } from 'src/components/common/Button'
import CheckIcon from 'src/components/common/Icon/Check'
import WarningAmberIcon from 'src/components/common/Icon/WarningAmber'
import { mergeClasses, useId } from 'utils'
import defaultClasses from './dialog.module.css'

export interface IConfirmDialog extends Omit<DialogProps, 'title'> {
	id: string
	open: boolean
	title?: ReactNode
	desc?: ReactNode
	direction?: 'vertical' | 'horizontal'
	theme?: 'info' | 'warning' | 'check' | 'exclamation' | 'error' | 'empty'
	showIcon?: boolean
	primaryButtonProps?: IButton
	secondaryButtonProps?: IButton
	classNames?: string
	isFullContent?: boolean
}

interface ICloseIconButtonProps {
	id: string
	onClick: () => void
}

export interface ICustomDialog extends Omit<DialogProps, 'content'> {
	id: string
	open: boolean
	content: ReactElement | JSX.Element | ReactNode
	title?: string
	primaryButtonProps?: IButton
	secondaryButtonProps?: IButton
	closeIconButtonProps?: ICloseIconButtonProps
	classNames?: string
}

const Dialog: FC<IConfirmDialog> = (props) => {
	const {
		id,
		open,
		title,
		desc,
		direction = 'vertical',
		theme = 'check',
		primaryButtonProps,
		secondaryButtonProps,
		classNames,
		showIcon = true,
		isFullContent = false,
		...otherProps
	} = props
	const classes = mergeClasses(defaultClasses, props.classes, classNames)
	const contentId = id + '-content'
	const titleId = id + '-title'
	const primaryBtnId = `${id}${
		primaryButtonProps?.id ? '-' + primaryButtonProps?.id : ''
	}`
	const secondaryBtnId = `${id}${
		secondaryButtonProps?.id ? '-' + secondaryButtonProps?.id : ''
	}`
	const generateIdEmbed = useId(COMPONENT_TYPE.DIALOG)
	const generateBtnIdEmbed = useId(COMPONENT_TYPE.BUTTON)
	const isStringDescription = typeof desc === 'string'

	const renderDialogContent = (direction: string) => {
		if (direction === 'vertical') {
			return (
				<div className="px-[24px] pt-[24px] py-[16px] flex flex-col break-all flex-auto overflow-auto">
					{showIcon && <div className="self-center">{iconChoice[theme]}</div>}
					<div className="self-center flex-auto w-full overflow-auto">
						{title && (
							<DialogTitle
								id={titleId}
								{...generateIdEmbed(titleId)}
								className="text-center text-lg text-gray-900 font-semibold px-0 pt-[24px] pb-[8px]"
							>
								{title}
							</DialogTitle>
						)}
						<DialogContent className="px-0 pb-[24px] w-full">
							{isStringDescription ? (
								<DialogContentText
									id={contentId}
									className="text-center text-base text-gray-500 break-words break-normal"
								>
									{desc}
								</DialogContentText>
							) : (
								desc
							)}
						</DialogContent>
					</div>
					<DialogActions className="p-0 contents pt-1">
						{primaryButtonProps && (
							<Button
								{...primaryButtonProps}
								{...generateBtnIdEmbed(primaryBtnId)}
							/>
						)}
					</DialogActions>
				</div>
			)
		}

		// Horizontal
		return (
			<>
				<div
					className={classnames(
						'flex break-all',
						isFullContent ? '' : 'p-[24px]',
					)}
				>
					{showIcon && (
						<div className="w-[44px] mr-[24px]">{iconChoice[theme]}</div>
					)}
					<div className="w-full">
						{title && (
							<DialogTitle
								id={titleId}
								{...generateIdEmbed(titleId)}
								className="px-0 pt-0 py-[8px] text-lg text-gray-900 font-semibold"
							>
								{title}
							</DialogTitle>
						)}
						<DialogContent className="px-0 py-0">
							{isStringDescription ? (
								<DialogContentText
									id={contentId}
									className="text-base text-gray-500 break-normal"
									{...generateIdEmbed(contentId)}
								>
									{desc}
								</DialogContentText>
							) : (
								desc
							)}
						</DialogContent>
					</div>
				</div>
				<div className="p-[16px] pt-[0px]">
					<DialogActions className="p-0">
						{secondaryButtonProps && (
							<Button
								{...secondaryButtonProps}
								{...generateBtnIdEmbed(secondaryBtnId)}
							/>
						)}
						{primaryButtonProps && (
							<Button
								{...primaryButtonProps}
								{...generateBtnIdEmbed(primaryBtnId)}
							/>
						)}
					</DialogActions>
				</div>
			</>
		)
	}

	return (
		<MuiDialog
			id={id}
			{...generateIdEmbed(id)}
			open={open}
			aria-labelledby={titleId}
			aria-describedby={contentId}
			classes={classes}
			PaperProps={{
				style: { borderRadius: '12px' },
			}}
			{...otherProps}
		>
			{renderDialogContent(direction)}
		</MuiDialog>
	)
}

const iconChoice = {
	info: (
		<div className="rounded-full bg-violet-100 h-[44px] w-[44px] text-center">
			<InfoIcon className="m-2.5 inline align-middle relative top-[2px]" />
		</div>
	),
	warning: (
		<div className="rounded-full bg-rose-100 h-[44px] w-[44px] text-center">
			<WarningAmberIcon className="fill-rose-500 m-2" />
		</div>
	),
	check: (
		<div className="rounded-full bg-teal-100 h-[44px] w-[44px] text-center">
			<CheckIcon className="fill-teal-400 m-2.5" />
		</div>
	),
	exclamation: <ExclamationCircleIcon className="m-2" />,
	error: <CloseCircleIcon className="m-2" />,
}

const CustomDialog: FC<ICustomDialog> = (props) => {
	const {
		id,
		open,
		content,
		title,
		classNames,
		primaryButtonProps,
		secondaryButtonProps,
		closeIconButtonProps,
		...otherProps
	} = props

	const contentId = id + '-content'
	const titleId = id + '-title'
	const primaryBtnId = `${id}${
		primaryButtonProps?.id ? '-' + primaryButtonProps?.id : ''
	}`
	const secondaryBtnId = `${id}${
		secondaryButtonProps?.id ? '-' + secondaryButtonProps?.id : ''
	}`
	const generateIdEmbed = useId(COMPONENT_TYPE.DIALOG)
	const generateIdEmbedButton = useId(COMPONENT_TYPE.BUTTON)
	const classes = mergeClasses(defaultClasses, props.classes, classNames)

	return (
		<MuiDialog
			id={id}
			{...generateIdEmbed(id)}
			open={open}
			aria-labelledby={titleId}
			aria-describedby={contentId}
			classes={classes}
			PaperProps={{
				style: { borderRadius: '12px' },
			}}
			{...otherProps}
		>
			<div className="px-[24px] pt-[24px] py-[16px] flex flex-col break-all flex-1">
				<div className="self-center flex-auto">
					<DialogTitle
						id={titleId}
						{...generateIdEmbed(titleId)}
						className="text-lg text-gray-900 font-semibold px-0 pt-[0px] pb-[16px]"
					>
						<div className="flex justify-between">
							{title}
							{closeIconButtonProps && (
								<CloseDialogIcon
									{...generateIdEmbedButton(closeIconButtonProps.id)}
									className="cursor-pointer"
									onClick={() => closeIconButtonProps.onClick()}
								/>
							)}
						</div>
					</DialogTitle>
					{content}
				</div>
				{(primaryButtonProps || secondaryButtonProps) && (
					<DialogActions className="pl-0 pt-[16px] pr-0 pb-0">
						{secondaryButtonProps && (
							<Button {...secondaryButtonProps} id={secondaryBtnId} />
						)}
						{primaryButtonProps && (
							<Button {...primaryButtonProps} id={primaryBtnId} />
						)}
					</DialogActions>
				)}
			</div>
		</MuiDialog>
	)
}

export { CustomDialog, Dialog }
