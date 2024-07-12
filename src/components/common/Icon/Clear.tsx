import Clear from '@mui/icons-material/Clear'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IClear extends SvgIconProps {
	id?: string
}

const IClear = (props: IClear) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<Clear {...rest} {...generateIdEmbed(id)}>
			{children}
		</Clear>
	)
}

export default IClear
