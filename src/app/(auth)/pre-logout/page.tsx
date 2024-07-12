import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'

const PreLogoutContainer = dynamic(() => import('modules/login/preLogout'))

const LogIn: NextPage = () => {
	return <PreLogoutContainer />
}

export default LogIn
