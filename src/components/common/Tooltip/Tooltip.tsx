import { TooltipProps, Tooltip as TooltipCommon } from '@mui/material'
import { FC } from 'react'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'

interface ITooltip extends TooltipProps {
	width?: string
}

const Tooltip: FC<ITooltip> = (props) => {
	const {
		id = 'tooltip',
		title,
		children,
		placement = 'top',
		arrow = true,
		width = '200px',
		...otherProps
	} = props

	const generateIdEmbed = useId(COMPONENT_TYPE.TOOLTIP)

	return (
		<TooltipCommon
			title={title}
			id={id}
			arrow={arrow}
			placement={placement}
			{...generateIdEmbed(id)}
			{...otherProps}
			PopperProps={{
				sx: {
					'& .MuiTooltip-tooltip': {
						color: 'white',
						backgroundColor: 'var(--gray-900)',
						width: { width },
					},
					'& .MuiTooltip-arrow': {
						color: 'var(--gray-900)',
					},
				},
			}}
		>
			{children}
		</TooltipCommon>
	)
}

export default Tooltip
