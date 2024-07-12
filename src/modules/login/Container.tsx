import { Typography } from 'components/common'
import Button from 'components/common/Button'
import Background from 'public/static/images/background.svg'
import LogoScb from 'public/static/images/logo-scb.svg'
import { FC } from 'react'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'
import { ILogin } from './interface'

const Container: FC<ILogin> = ({ onSubmit }) => {
	return (
		<div {...useId(COMPONENT_TYPE.DIV)('root-login')}>
			<div className="flex justify-center items-center h-full w-full min-h-screen absolute overflow-hidden top-0 left-0">
				<Background className="w-full h-full absolute -z-10 bg-gray-900" />
				<div className="w-80 px-10 py-20 bg-gray-30 rounded shadow-md bg-black bg-opacity-7">
					<div className="mb-12 flex flex-col items-center">
						<div className="flex flex-row gap-3 items-center pr-6">
							<LogoScb />
							<Typography id="pymd-label" className="text-2xl text-violet-900">
								Admin portal
							</Typography>
						</div>
						<Typography id="pymd-description" className="pt-2">
							Payment Domain Web Admin
						</Typography>
					</div>
					<Button
						id="sign-in"
						onClick={onSubmit}
						themetype="filled"
						fullWidth
						style={{
							background:
								'linear-gradient(270deg, #3E2069 0%, #6F3CA2 30%, #5745C1 70%, #642AB5 100%)',
						}}
					>
						Sign in
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Container
