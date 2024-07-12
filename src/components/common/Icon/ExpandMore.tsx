import ExpandMore from '@mui/icons-material/ExpandMore'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IExpandMore extends SvgIconProps {
	id?: string
}

const IExpandMore = (props: IExpandMore) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<ExpandMore {...rest} {...generateIdEmbed(id)}>
			{children}
		</ExpandMore>
	)
}

export default IExpandMore
