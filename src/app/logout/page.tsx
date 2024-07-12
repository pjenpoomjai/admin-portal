import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'

const LogoutContainer = dynamic(() => import('modules/login/logout'))

const LogIn: NextPage = () => {
	return <LogoutContainer />
}

export default LogIn
