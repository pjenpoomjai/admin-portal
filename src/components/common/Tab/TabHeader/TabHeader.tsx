'use client'

import { forwardRef } from 'react'
import { TabsHeader as MUITabHeader } from '@material-tailwind/react'
import { ITabHeaderProps } from './interface'

const TabHeader = forwardRef<HTMLUListElement, ITabHeaderProps>(
	({ children, indicatorProps, className }, ref) => {
		return (
			<MUITabHeader
				placeholder={''}
				indicatorProps={indicatorProps}
				className={className}
				ref={ref}
				onPointerEnterCapture={() => {}}
				onPointerLeaveCapture={() => {}}
			>
				{children}
			</MUITabHeader>
		)
	},
)

TabHeader.displayName = 'TabHeader'
export default TabHeader
