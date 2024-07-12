import Typography from 'components/common/Typography'
import { FC } from 'react'
import version from 'utils/version'

const Footer: FC = () => {
	return (
		<div className="fixed bottom-0 mx-auto bg-transparent w-full text-center flex justify-center py-6">
			<Typography id="copyright" className="text-gray-30 text-xs">
				Copyright ©2024 Produced by SCB Tech X
			</Typography>
			<Typography id="separator1" className="text-gray-30 text-xs px-2">
				|
			</Typography>
			<Typography id="version" className="text-gray-30 text-xs">
				Version {version}
			</Typography>
		</div>
	)
}

export default Footer
