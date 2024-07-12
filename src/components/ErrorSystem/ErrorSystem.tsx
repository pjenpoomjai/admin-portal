import { Button } from 'components/common'
import Box from 'components/common/Box/Box'
import noop from 'lodash/noop'
import Image from 'next/image'
import noPermission from 'public/static/images/no-permission.png'
import { FC } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import WarningAmberIcon from 'src/components/common/Icon/WarningAmber'
import Typography from 'src/components/common/Typography'
import useId from 'utils/useId'
import { ErrorType, IErrorSystem } from './interface'

const ErrorSystem: FC<IErrorSystem> = (props) => {
	const {
		type = ErrorType.SOMETHING_WENT_WRONG,
		callback = noop,
		...rest
	} = props
	const id = useId(COMPONENT_TYPE.DIV)(`error-${type}`)
	const idImg = useId(COMPONENT_TYPE.IMAGE)(`error-${type}`)

	if (type === ErrorType.SOMETHING_WENT_WRONG) {
		return (
			<Box {...rest} {...id}>
				<div>
					<div className="rounded-full bg-rose-100 h-[132px] w-[132px] text-center">
						<WarningAmberIcon className="fill-rose-500 h-[72px] w-[72px] m-6" />
					</div>
				</div>
				<Typography id={`error-${type}`} className="pt-6 text-xl">
					Something went wrong
				</Typography>
				<Typography id={`error-desc-${type}`} className="pt-2 text-gray-500">
					Please try again
				</Typography>
				<Button
					id={`error-${type}`}
					themetype="filled"
					onClick={callback}
					className="mt-4 w-32 !bg-indigo-500"
				>
					Retry
				</Button>
			</Box>
		)
	}

	return (
		<Box {...rest} {...id}>
			<Image priority src={noPermission} alt="noPermission" {...idImg} />
			<Typography id={`error-${type}`} className="pt-6 text-xl">
				No permission
			</Typography>
			<Typography id={`error-desc-${type}`} className="pt-2 text-gray-500">
				Sorry, you are not authorized to access this page.
			</Typography>
		</Box>
	)
}

export default ErrorSystem
