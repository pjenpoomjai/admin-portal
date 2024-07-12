'use client'

import React, { forwardRef } from 'react'
import TabItem from 'components/common/Tab/TabItem/TabItem'
import Typography from 'components/common/Typography/Typography'
import { ITypographyProps } from 'components/common/Typography/interface'
import { ITabItemProps } from 'components/common/Tab/TabItem/interface'

interface ITabItemTextProps extends ITabItemProps {
	id: string
	labelProps: Omit<ITypographyProps, 'id'>
	label: string
	prefixNode?: React.ReactNode
	suffixNode?: React.ReactNode
}

const TabItemText = forwardRef<HTMLLIElement, ITabItemTextProps>(
	(props, ref) => {
		const {
			id,
			labelProps,
			label,
			prefixNode = null,
			suffixNode = null,
			...rest
		} = props
		return (
			<TabItem {...rest} ref={ref}>
				<div className="flex gap-2 items-center">
					{prefixNode}
					<Typography id={`${id}-label`} {...labelProps} variant="paragraph">
						{label}
					</Typography>
					{suffixNode}
				</div>
			</TabItem>
		)
	},
)

TabItemText.displayName = 'TabItemText'
export default TabItemText
