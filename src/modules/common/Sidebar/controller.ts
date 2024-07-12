import { IMenu } from 'components/template/Sider/interface'
import get from 'lodash/get'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { MENU_OPTIONS } from 'shared/components/constants'

const useSiderController = (props) => {
	const { getContextConsumer } = props
	const pathname = usePathname()
	const { push } = useRouter()
	const [isOpen, setIsOpen] = useState(true)
	const [expandedItem, setExpandedItem] = useState<string[]>([])
	const { useGetPersistentStoreSelector } =
		getContextConsumer('persistentStore')
	const persistentStore = useGetPersistentStoreSelector()

	useEffect(() => {
		const firstExpanded = MENU_OPTIONS.find(({ subMenu }) => {
			return (
				subMenu &&
				subMenu.length > 0 &&
				subMenu.some((subMenu) => pathname.startsWith(subMenu.url))
			)
		})
		if (firstExpanded) {
			setExpandedItem([firstExpanded.id])
		}
	}, [pathname])

	const userInfo: any = useMemo(() => {
		const userInfo = get(persistentStore, 'cookies.userInfo', '')
		try {
			return JSON.parse(userInfo)
		} catch (e) {
			return {}
		}
	}, [persistentStore])

	const menus = useMemo(() => {
		return MENU_OPTIONS.filter((option) => {
			return option.roles.some((role) => {
				return userInfo?.roleName
					?.toLocaleLowerCase()
					.includes(role.toLocaleLowerCase())
			})
		})
	}, [userInfo])

	const handleOnClickOpen = useCallback(() => {
		setIsOpen((prev) => !prev)
	}, [])

	const getIsActive = useCallback(
		(menu: IMenu) => {
			if (isOpen) {
				return pathname.startsWith(menu.url)
			}
			if (menu.subMenu && menu.subMenu.length > 0) {
				return menu.subMenu.some((subMenu) => pathname.startsWith(subMenu.url))
			}
			return pathname.startsWith(menu.url)
		},
		[isOpen, pathname],
	)

	const getIsExpanded = useCallback(
		(menu: IMenu) => {
			return expandedItem.includes(menu.id)
		},
		[expandedItem],
	)

	const handleOnClickExpand = useCallback(
		(id: string) => {
			if (expandedItem.includes(id)) {
				setExpandedItem((prev) => {
					return prev.filter((item) => item !== id)
				})
			} else {
				setExpandedItem((prev) => {
					return [...prev, id]
				})
			}
		},
		[expandedItem],
	)

	const handleOnClickMenu = useCallback(
		(menu: IMenu) => {
			if (menu.url) {
				push(menu.url)
				return
			}
			if (isOpen) {
				handleOnClickExpand(menu.id)
				return
			}
			setIsOpen(true)
			if (!expandedItem.includes(menu.id)) {
				handleOnClickExpand(menu.id)
			}
		},
		[expandedItem, handleOnClickExpand, isOpen, push],
	)

	return {
		menus,
		isOpen,
		getIsActive,
		getIsExpanded,
		handleOnClickOpen,
		handleOnClickMenu,
	}
}

export default useSiderController
