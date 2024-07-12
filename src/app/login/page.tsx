import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'
const Footer = dynamic(() => import('src/components/Footer'))

const LoginContainer = dynamic(() => import('modules/login'))

const LogIn: NextPage = () => {
	return (
		<>
			<LoginContainer></LoginContainer>
			<Footer />
		</>
	)
}

export default LogIn
