'use client'

import { forwardRef } from 'react'
import { TabsBody as MUITabsBody } from '@material-tailwind/react'
import { ITabBodyProps } from './interface'

const TabBody = forwardRef<HTMLDivElement, ITabBodyProps>(
	({ children, animation, className }, ref) => {
		return (
			<MUITabsBody
				placeholder={''}
				animate={animation}
				className={className}
				ref={ref}
				onPointerEnterCapture={() => {}}
				onPointerLeaveCapture={() => {}}
			>
				{children}
			</MUITabsBody>
		)
	},
)

TabBody.displayName = 'TabBody'
export default TabBody
