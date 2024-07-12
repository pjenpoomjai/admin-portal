'use client'

import { forwardRef } from 'react'
import { Tab as MUITab } from '@material-tailwind/react'
import { ITabItemProps } from './interface'

const TabItem = forwardRef<HTMLLIElement, ITabItemProps>(
	({ children, value, disabled, activeClassName, className, common }, ref) => {
		return (
			<MUITab
				placeholder={''}
				ref={ref}
				disabled={disabled}
				value={value}
				activeClassName={activeClassName}
				className={className}
				onPointerEnterCapture={() => {}}
				onPointerLeaveCapture={() => {}}
				{...common}
			>
				{children}
			</MUITab>
		)
	},
)

TabItem.displayName = 'TabItem'
export default TabItem
