import Add from '@mui/icons-material/Add'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IAdd extends SvgIconProps {
	id?: string
}

const IAdd = (props: IAdd) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<Add {...rest} {...generateIdEmbed(id)}>
			{children}
		</Add>
	)
}

export default IAdd
