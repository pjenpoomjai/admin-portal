'use client'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import classnames from 'classnames'
import Box from 'components/common/Box/Box'
import IconButton from 'components/common/IconButton'
import { FC } from 'react'
import Collapse from 'src/components/common/Collapse'
import { ExpandLess, ExpandMore } from 'src/components/common/Icon'
import List from 'src/components/common/List'
import ListItemButton from 'src/components/common/ListItemButton'
import ListItemIcon from 'src/components/common/ListItemIcon'
import ListItemText from 'src/components/common/ListItemText'
import { IMenu, ISiderProps } from './interface'
import defaultClasses from './sider.module.css'
import Drawer from 'components/common/Drawer/Drawer'

const Sider: FC<ISiderProps> = (props) => {
	const {
		menus,
		handleOnClickMenu,
		handleOnClickOpen,
		getIsActive,
		getIsExpanded,
		isOpen = false,
	} = props
	const listItems = (menu: IMenu, key: number) => {
		const icon = getIsActive(menu) ? menu.activeIcon : menu.icon
		const isCollapsedAndSubActive =
			!getIsExpanded(menu) && menu.subMenu?.some((sub) => getIsActive(sub))
		const isParentActive = getIsActive(menu) || isCollapsedAndSubActive
		const isDisplayExpanded = getIsExpanded(menu) && isOpen
		return (
			<div key={key}>
				<ListItemButton
					disableRipple
					id={menu.dataId}
					onClick={() => handleOnClickMenu(menu)}
					className={classnames(
						defaultClasses.button,
						isParentActive ? defaultClasses.buttonActive : '',
						isDisplayExpanded ? defaultClasses.buttonParent : '',
					)}
				>
					<ListItemIcon className="min-w-[16px]">{icon}</ListItemIcon>
					{isOpen && (
						<ListItemText
							id={menu.dataId}
							className="mx-2 my-0 [&>span]:text-base"
							primary={menu.name}
						/>
					)}
					{menu.subMenu &&
						isOpen &&
						(getIsExpanded(menu) ? (
							<ExpandLess
								className="w-[16px] h-[16px]"
								id={`${menu.dataId}-expand-less`}
							/>
						) : (
							<ExpandMore
								className="w-[16px] h-[16px]"
								id={`${menu.dataId}-expand-more`}
							/>
						))}
				</ListItemButton>
				{menu.subMenu &&
					isOpen &&
					menu.subMenu.map((subMenu: IMenu, subkey: number) => {
						return (
							<Collapse
								key={`sub-menu-${subMenu.id}`}
								id={`sub-menu-${subkey}`}
								in={getIsExpanded(menu)}
								timeout="auto"
								unmountOnExit
							>
								<ListItemButton
									disableRipple
									id={subMenu.dataId}
									onClick={() => handleOnClickMenu(subMenu)}
									className={classnames(
										defaultClasses.button,
										getIsActive(subMenu) ? defaultClasses.buttonActive : '',
									)}
								>
									<ListItemText
										id={subMenu.dataId}
										className="mx-2 my-0 [&>span]:text-base ml-8"
										primary={subMenu.name}
									/>
								</ListItemButton>
							</Collapse>
						)
					})}
			</div>
		)
	}

	return (
		<Drawer
			id="menu-sider"
			variant="permanent"
			PaperProps={{ sx: { position: 'sticky', zIndex: 10 } }}
			open={isOpen}
		>
			<Box className="flex justify-end pr-2 pt-1">
				<IconButton id="drawer" onClick={handleOnClickOpen}>
					{isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
				</IconButton>
			</Box>
			<Box className={classnames('flex flex-col', isOpen ? 'w-60' : '')}>
				<List
					className={classnames(defaultClasses.root, 'pr-3')}
					id={'sidebar-menu'}
				>
					{menus.map((menu: IMenu, key: number) => listItems(menu, key))}
				</List>
			</Box>
		</Drawer>
	)
}

export default Sider
