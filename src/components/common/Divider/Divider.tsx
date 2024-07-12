import MUIDivider, { DividerProps } from '@mui/material/Divider'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'

export interface ITypography extends DividerProps {
	id?: string
}

const Divider = (props: ITypography) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.DIVIDER)

	return (
		<MUIDivider {...rest} {...generateIdEmbed(id)}>
			{children}
		</MUIDivider>
	)
}

export default Divider
