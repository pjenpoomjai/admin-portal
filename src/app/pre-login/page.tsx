import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'

const PreLoginContainer = dynamic(() => import('modules/login/pre-login'))

const PreLogin: NextPage = () => {
	return <PreLoginContainer />
}

export default PreLogin
