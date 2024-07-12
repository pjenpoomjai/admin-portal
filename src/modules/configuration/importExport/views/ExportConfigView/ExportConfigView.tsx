import Box from 'components/common/Box/Box'
import Button from 'components/common/Button'
import { FC } from 'react'
import { IExportConfigView } from './interface'

const ExportConfigView: FC<IExportConfigView> = (props) => {
	const { onClickDownload } = props

	return (
		<Box className="bg-white p-6 rounded-b-xl">
			<Box className="flex justify-center">
				<Button
					id="download-config"
					themetype="filled"
					onClick={onClickDownload}
				>
					Download
				</Button>
			</Box>
		</Box>
	)
}

export default ExportConfigView
