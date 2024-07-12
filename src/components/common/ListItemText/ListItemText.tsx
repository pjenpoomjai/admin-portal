import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'

interface IListItemText extends ListItemTextProps {
	id?: string
}

const IListItemText = (props: IListItemText) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.LIST_ITEM_TEXT)

	return (
		<ListItemText {...rest} {...generateIdEmbed(id)}>
			{children}
		</ListItemText>
	)
}
export default IListItemText
