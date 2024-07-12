import List, { ListProps } from '@mui/material/List'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'

export interface IList extends ListProps {
	id?: string
}

const CISList = (props: IList) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.LIST)

	return (
		<List {...rest} {...generateIdEmbed(id)}>
			{children}
		</List>
	)
}

export default CISList
