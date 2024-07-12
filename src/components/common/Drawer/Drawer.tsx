import MuiDrawer from '@mui/material/Drawer'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import { IDrawerProps } from './interface'

const Drawer = (props: IDrawerProps) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.DRAWER)

	return (
		<MuiDrawer {...generateIdEmbed(id)} {...rest}>
			{children}
		</MuiDrawer>
	)
}

export default Drawer
