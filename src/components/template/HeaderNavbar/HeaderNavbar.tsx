import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import Box from 'components/common/Box/Box'
import Button from 'components/common/Button/Button'
import Typography from 'components/common/Typography/Typography'
import LogoScb from 'public/static/images/logo-scb.svg'
import { IHeaderNavbarProps } from './interface'

const HeaderNavbar = (props: IHeaderNavbarProps) => {
	const { displayName, onLogout, lastLogon } = props

	return (
		<Box className="bbg-cover flex items-center bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-indigo-500 to-90% px-6 py-2">
			<Box className="flex items-center w-full">
				<LogoScb />
				<Typography id="pymd-label" className="text-xl text-white pl-4">
					Admin portal
				</Typography>
			</Box>
			<Box className="flex items-center">
				<Box className="flex flex-col items-end pr-[6px]">
					<Box className="flex w-max items-baseline">
						<Typography className="text-white w-max" id="user-name">
							{displayName}
						</Typography>
						<span className="text-white ml-[10px]">|</span>
						<Button
							id="log-out"
							variant="text"
							themetype="link"
							themesize="lg"
							className="!text-white !p-0 hover:bg-transparent"
							onClick={onLogout}
						>
							Logout
						</Button>
					</Box>
					<Typography id="last-login" className="text-gray-400 pr-[10px] w-max">
						(last login {lastLogon || '-'})
					</Typography>
				</Box>
				<AccountCircleOutlinedIcon className="text-white" fontSize="large" />
			</Box>
		</Box>
	)
}

export default HeaderNavbar
