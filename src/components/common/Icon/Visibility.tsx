import Visibility from '@mui/icons-material/Visibility'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IVisibility extends SvgIconProps {
	id?: string
}

const IVisibility = (props: IVisibility) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<Visibility {...rest} {...generateIdEmbed(id)}>
			{children}
		</Visibility>
	)
}

export default IVisibility
