import PersonIcon from '@mui/icons-material/Person'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IPerson extends SvgIconProps {
	id?: string
}

const IPerson = (props: IPerson) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<PersonIcon {...rest} {...generateIdEmbed(id)}>
			{children}
		</PersonIcon>
	)
}

export default IPerson
