'use client'

import { forwardRef } from 'react'
import { Tabs as MUITabs } from '@material-tailwind/react'
import { ITabsProps } from './interface'

const Tabs = forwardRef<HTMLDivElement, ITabsProps>(
	({ children, value }, ref) => {
		return (
			<MUITabs ref={ref} value={value}>
				{children}
			</MUITabs>
		)
	},
)

Tabs.displayName = 'Tabs'
export default Tabs
