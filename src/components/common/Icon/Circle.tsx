import Circle from '@mui/icons-material/Circle'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface ICircle extends SvgIconProps {
	id?: string
}

const ICircle = (props: ICircle) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<Circle {...rest} {...generateIdEmbed(id)}>
			{children}
		</Circle>
	)
}

export default ICircle
