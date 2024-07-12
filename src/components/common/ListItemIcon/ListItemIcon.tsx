import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'

interface IListItemIcon extends ListItemIconProps {
	id?: string
}

const IListItemIcon = (props: IListItemIcon) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.LIST_ITEM_ICON)

	return (
		<ListItemIcon {...rest} {...generateIdEmbed(id)}>
			{children}
		</ListItemIcon>
	)
}
export default IListItemIcon
