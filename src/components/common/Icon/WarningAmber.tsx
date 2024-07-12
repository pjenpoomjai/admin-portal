import WarningAmber from '@mui/icons-material/WarningAmber'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IWarningAmber extends SvgIconProps {
	id?: string
}

const IWarningAmber = (props: IWarningAmber) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<WarningAmber {...rest} {...generateIdEmbed(id)}>
			{children}
		</WarningAmber>
	)
}

export default IWarningAmber
