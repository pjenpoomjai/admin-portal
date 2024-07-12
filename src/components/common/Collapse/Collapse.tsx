import Collapse, { CollapseProps } from '@mui/material/Collapse'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'

interface ICollapse extends CollapseProps {
	id?: string
}

const ICollapse = (props: ICollapse) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.COLLAPSE)

	return (
		<Collapse {...rest} {...generateIdEmbed(id)}>
			{children}
		</Collapse>
	)
}
export default ICollapse
