import Search from '@mui/icons-material/Search'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface ISearch extends SvgIconProps {
	id?: string
}

const ISearch = (props: ISearch) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<Search {...rest} {...generateIdEmbed(id)}>
			{children}
		</Search>
	)
}

export default ISearch
