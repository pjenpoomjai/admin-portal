import ExpandLess from '@mui/icons-material/ExpandLess'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IExpandLess extends SvgIconProps {
	id?: string
}

const IExpandLess = (props: IExpandLess) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<ExpandLess {...rest} {...generateIdEmbed(id)}>
			{children}
		</ExpandLess>
	)
}

export default IExpandLess
