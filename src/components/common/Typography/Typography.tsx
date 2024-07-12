'use client'

import { Typography as MUITypography } from '@material-tailwind/react'
import { forwardRef } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import { ITypographyProps } from './interface'

const Typography = forwardRef<HTMLDivElement, ITypographyProps>(
	(props, ref) => {
		const { children, id, ...rest } = props
		const generateIdEmbed = useId(COMPONENT_TYPE.TYPOGRAPHY)

		return (
			<MUITypography
				placeholder={''}
				ref={ref}
				onPointerEnterCapture={() => {}}
				onPointerLeaveCapture={() => {}}
				{...rest}
				{...generateIdEmbed(id)}
			>
				{children}
			</MUITypography>
		)
	},
)

Typography.displayName = 'Typography'

export default Typography
