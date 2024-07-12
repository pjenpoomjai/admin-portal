import MUIListItemButton, {
	ListItemButtonProps,
} from '@mui/material/ListItemButton'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'

export interface IListItemButton extends ListItemButtonProps {
	id?: string
}

const ListItemButton = (props: IListItemButton) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.LIST_ITEM_BUTTON)

	return (
		<MUIListItemButton {...rest} {...generateIdEmbed(id)}>
			{children}
		</MUIListItemButton>
	)
}

export default ListItemButton
