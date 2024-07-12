import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ReactElement } from 'react'
import AppConfig from 'src/appConfig/AppConfig'
import '../styles/globals.css'
import '../styles/theme.css'

export const metadata: Metadata = {
	title: 'Admin Portal',
}

export default function RootLayout({
	children,
}: Readonly<{ children: ReactElement }>) {
	const cookie = cookies()

	return (
		<html lang="en">
			<body>
				<AppConfig cookies={cookie}>{children}</AppConfig>
			</body>
		</html>
	)
}
