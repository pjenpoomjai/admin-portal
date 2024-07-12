import Sider from 'components/template/Sider/Sider'
import { FC } from 'react'
import { ISidebar } from './interface'

const Container: FC<ISidebar> = (props) => {
	const {
		menus,
		isOpen,
		getIsActive,
		getIsExpanded,
		handleOnClickMenu,
		handleOnClickOpen,
	} = props
	return (
		<Sider
			menus={menus}
			handleOnClickMenu={handleOnClickMenu}
			isOpen={isOpen}
			getIsActive={getIsActive}
			getIsExpanded={getIsExpanded}
			handleOnClickOpen={handleOnClickOpen}
		/>
	)
}

export default Container
