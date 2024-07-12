'use client'
import FooterAuth from 'components/FooterAuth/FooterAuth'
import Box from 'components/common/Box/Box'
import ConsumeFetchResourceContainer from 'contexts/resource/consumer/fetchResource'
import HeaderContainer from 'modules/common/Header'
import IdleTimer from 'modules/common/IdleTimer'
import SidebarContainer from 'modules/common/Sidebar'
import { useEffect, useState } from 'react'
import { getEnv } from './../../servers/getEnvironment'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [env, setEnv] = useState<Record<string, string>>(null)
	useEffect(() => {
		getEnv().then((value: any) => {
			setEnv(value)
		})
	}, [])

	return (
		<>
			{env?.SESSION_IDLE_TIMEOUT && (
				<IdleTimer idleTime={parseInt(env?.SESSION_IDLE_TIMEOUT)} />
			)}
			<HeaderContainer />
			<ConsumeFetchResourceContainer />
			<Box className="flex h-[calc(100vh-65px)] w-screen">
				<SidebarContainer />
				<Box className="max-w-[1392px] w-full overflow-y-auto mx-auto flex flex-col justify-between">
					{children}
					<FooterAuth />
				</Box>
			</Box>
		</>
	)
}
