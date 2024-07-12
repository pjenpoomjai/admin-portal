import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'
import { SvgIconProps } from '@mui/material'

interface IFileDownloadOutlined extends SvgIconProps {
	id?: string
}

const IFileDownloadOutlined = (props: IFileDownloadOutlined) => {
	const { children, id, ...rest } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.ICON)

	return (
		<FileDownloadOutlined {...rest} {...generateIdEmbed(id)}>
			{children}
		</FileDownloadOutlined>
	)
}

export default IFileDownloadOutlined
