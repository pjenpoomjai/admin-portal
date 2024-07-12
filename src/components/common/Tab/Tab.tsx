import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabs, { TabsProps } from '@mui/material/Tabs'
import classnames from 'classnames'
import { Button, IButton } from 'components/common'
import CircleIcon from 'components/common/Icon/Circle'
import IconButton from 'components/common/IconButton'
import CheveronLeft from 'public/static/images/cheveron-left.svg'
import { FC } from 'react'
import noop from 'lodash/noop'
import mergeClasses from 'utils/mergeClasses'
import useId from 'utils/useId'
import defaultClasses from './tab.module.css'
import { COMPONENT_TYPE } from 'shared/componentType'

export interface ITab extends TabProps {
	id: string
	name: string
	label?: string
	value: string
	error?: boolean
}
export interface ITabs extends TabsProps {
	id: string
	classNames?: string
	showBackIcon?: boolean
	onBack?: () => void
	title?: string
	classes?: object
	tabList?: ITab[]
	value?: string
	handleChange?: (event: React.SyntheticEvent, value: string) => void
	buttonText?: string
	primaryButtonProps?: IButton
	secondaryButtonProps?: IButton
	tertiaryButtonProps?: IButton
}

const Tab: FC<ITabs> = (props) => {
	const generateIdEmbed = useId(COMPONENT_TYPE.TAB)
	const generateLabelEmbed = useId(COMPONENT_TYPE.LABEL)
	const classes = mergeClasses(defaultClasses, props.classes)
	const {
		id,
		showBackIcon,
		title,
		classNames,
		tabList = [],
		value,
		onBack = noop,
		handleChange = noop,
		buttonText: _unusedButtonText,
		primaryButtonProps,
		secondaryButtonProps,
		tertiaryButtonProps,
		...otherProps
	} = props
	const styleButton =
		primaryButtonProps || secondaryButtonProps || tertiaryButtonProps
			? 'mr-[24px]'
			: ''
	return (
		<div className={classnames(classes.root, classNames)}>
			<div className="flex flex-row bg-white h-full overflow-y-hidden">
				{title && (
					<div className="flex pl-[24px]">
						{showBackIcon && (
							<IconButton onClick={onBack}>
								<CheveronLeft
									{...generateIdEmbed(`back-icon-${id}`)}
									className="h-[24px] w-[24px] mr-[8px] my-[16px] self-center fill-gray-900"
								/>
							</IconButton>
						)}
						<div className="flex-wrap self-center  pr-[24px]">
							<p
								{...generateLabelEmbed(`back-icon-${id}`)}
								className="text-center w-max text-xl text-gray-900 font-semibold"
							>
								{title}
							</p>
						</div>
					</div>
				)}
				<MuiTabs
					value={value}
					{...generateIdEmbed(id)}
					className="w-full overflow-y-hidden"
					onChange={handleChange}
					{...otherProps}
				>
					{tabList.map((tab: ITab) => {
						const { id, value, name, label, error, ...otherProps } = tab
						return (
							<MuiTab
								{...generateIdEmbed(id)}
								className="overflow-y-hidden text-gray-500"
								value={value}
								key={tab.id}
								label={
									<div className="overflow-y-hidden">
										<p
											{...generateLabelEmbed(`label-${id}`)}
											className="text-base font-medium"
										>
											{name}
										</p>
										{label && <p className="text-xs h-[16px]">{value}</p>}
									</div>
								}
								icon={error ? <CircleIcon id={'error'} /> : ''}
								iconPosition="end"
								{...otherProps}
							/>
						)
					})}
				</MuiTabs>
				<div
					className={classnames(
						styleButton,
						'my-[8px] h-[40px] flex items-center',
					)}
				>
					{tertiaryButtonProps && (
						<Button
							classNames={'mr-[12px]'}
							themesize={'sm'}
							themetype={'outline'}
							{...tertiaryButtonProps}
						/>
					)}
					{secondaryButtonProps && (
						<Button
							classNames={`${primaryButtonProps ? 'mr-[12px]' : ''}`}
							themesize={'sm'}
							themetype={'outline'}
							{...secondaryButtonProps}
						/>
					)}
					{primaryButtonProps && (
						<Button
							themesize={'sm'}
							themetype={'filled'}
							{...primaryButtonProps}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default Tab
