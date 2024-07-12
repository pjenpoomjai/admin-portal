import Check from '@mui/icons-material/Check'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface ICheck extends SvgIconProps {
	id?: string
}

const ICheck = (props: ICheck) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<Check {...rest} {...generateIdEmbed(id)}>
			{children}
		</Check>
	)
}

export default ICheck
