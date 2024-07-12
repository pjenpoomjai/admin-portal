'use client'
import Box from 'components/common/Box/Box'
import Typography from 'src/components/common/Typography'
import NoPermissionImage from 'public/static/images/no-permission.svg'

const UnauthorizedPage = () => {
	return (
		<Box className="m-auto">
			<Box className="m-auto mt-20 w-fit text-center">
				<NoPermissionImage />
				<Typography id={`error-unauthorized`} className="pt-6 text-xl">
					No permission
				</Typography>
				<Typography
					id={`error-desc-unauthorized`}
					className="pt-2 text-gray-500"
				>
					Sorry, you are not authorized to access this page
				</Typography>
			</Box>
		</Box>
	)
}

export default UnauthorizedPage
