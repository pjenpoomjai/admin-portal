'use client'

import { FunctionComponent } from 'react'
import { default as CommonTabs } from 'components/common/Tab/Tabs/Tabs'
import TabsHeader from 'components/common/Tab/TabHeader/TabHeader'
import TabItemText from 'components/molecules/TabItemText/TabItemText'
import TabsBody from 'components/common/Tab/TabBody/TabBody'

interface IMenuProps {
	key: string
	label: string
	value: string
	prefixIcon?: React.ReactNode
	suffixIcon?: React.ReactNode
}

interface ITabsProps {
	id: string
	children: React.ReactNode
	menus: IMenuProps[]
	activeValue: string
	onSelectMenuHandler: (value: string) => void
}

const Tabs: FunctionComponent<ITabsProps> = (props) => {
	const { id, children, menus, activeValue, onSelectMenuHandler } = props

	return (
		<CommonTabs value={activeValue} className="max-w-[40rem]">
			<TabsHeader
				className="bg-transparent"
				indicatorProps={{
					className: 'bg-gray-900/10 shadow-none !text-gray-900',
				}}
			>
				{menus.map(({ key, label, value, suffixIcon, prefixIcon }) => (
					<TabItemText
						id={id}
						className="pl-10 pr-0 text-gray-300"
						labelProps={{
							className: 'text-lg',
						}}
						key={key}
						common={{
							onClick: () => onSelectMenuHandler(value),
						}}
						activeClassName="!text-white"
						suffixNode={suffixIcon}
						prefixNode={prefixIcon}
						value={value}
						label={label}
					/>
				))}
			</TabsHeader>
			<TabsBody>{children}</TabsBody>
		</CommonTabs>
	)
}

export default Tabs
