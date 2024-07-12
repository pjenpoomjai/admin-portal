import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IVisibilityOffOutlined extends SvgIconProps {
	id?: string
}

const IVisibilityOffOutlined = (props: IVisibilityOffOutlined) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<VisibilityOffOutlined {...rest} {...generateIdEmbed(id)}>
			{children}
		</VisibilityOffOutlined>
	)
}

export default IVisibilityOffOutlined
