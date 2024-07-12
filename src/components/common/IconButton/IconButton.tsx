import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'

export interface IIconButtonProps extends IconButtonProps {
	id?: string
}

const IIconButton = (props: IIconButtonProps) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON_BUTTON)

	return (
		<IconButton {...rest} {...generateIdEmbed(id)}>
			{children}
		</IconButton>
	)
}
export default IIconButton
