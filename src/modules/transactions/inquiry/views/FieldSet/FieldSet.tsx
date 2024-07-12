import { Typography } from 'components/common'
import Box from 'components/common/Box/Box'
import Tooltip from 'components/common/Tooltip/Tooltip'
import React, { FunctionComponent } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import { IFieldSetProps, IRenderChildren } from './interface'

const WrapperComponent = React.forwardRef((props: any, ref: any) => {
	return (
		<div {...props} ref={ref}>
			{props.children}
		</div>
	)
})

const RenderChildren = (props: IRenderChildren) => {
	const { children, tooltipText, tooltipId } = props
	const generatedIdTooltipEmbeded = useId(COMPONENT_TYPE.TOOLTIP)
	if (tooltipText) {
		return (
			<Tooltip
				title={tooltipText}
				placement="bottom"
				width="120px"
				{...generatedIdTooltipEmbeded(tooltipId)}
			>
				<WrapperComponent className="flex flex-1">{children}</WrapperComponent>
			</Tooltip>
		)
	}
	return <Box className="flex flex-1">{children}</Box>
}

const FieldSet: FunctionComponent<IFieldSetProps> = (props) => {
	const { id, children, title, tooltipText, isRequired } = props
	return (
		<Box className="flex flex-row">
			<Typography id={id} variant="small" className="w-[140px] pr-2">
				{title}
				{isRequired && <span className="text-rose-600 ml-[3px]">*</span>} :
			</Typography>
			<RenderChildren tooltipId={id} tooltipText={tooltipText}>
				{children}
			</RenderChildren>
		</Box>
	)
}

export default FieldSet
