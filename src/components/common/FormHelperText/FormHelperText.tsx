import FormHelperText, {
	FormHelperTextProps,
} from '@mui/material/FormHelperText'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'

interface IFormHelperText extends FormHelperTextProps {
	id?: string
}

const IFormHelperText = (props: IFormHelperText) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.FORM_HELPER_TEXT)

	return (
		<FormHelperText {...rest} {...generateIdEmbed(id)}>
			{children}
		</FormHelperText>
	)
}
export default IFormHelperText
