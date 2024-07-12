import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IKeyboardArrowDown extends SvgIconProps {
	id?: string
}

const IKeyboardArrowDown = (props: IKeyboardArrowDown) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<KeyboardArrowDown {...rest} {...generateIdEmbed(id)}>
			{children}
		</KeyboardArrowDown>
	)
}

export default IKeyboardArrowDown
