import FullPageLoader from 'components/common/Loader/FullPageLoader'
import Router from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { IContextBuilderResult, useAppContext } from 'x-core-modules/builder'
import { EnumLoaderType } from 'x-core-modules/context'

const Loader = ({
	type = EnumLoaderType.FULL_PAGE_LOADER,
}: {
	type: EnumLoaderType
}) => {
	if (type === EnumLoaderType.FULL_PAGE_LOADER) return <FullPageLoader />

	return null
}

const useLoader = (type = EnumLoaderType.FULL_PAGE_LOADER) => {
	const { getContextConsumer } = useAppContext()
	const { useLoaderQueueSelector } = getContextConsumer<any>('loader')
	const stateLoader = useLoaderQueueSelector()

	const loaderQueue = useMemo(() => {
		return stateLoader.loaderQueue
	}, [stateLoader.loaderQueue])

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const start = () => {
			setLoading(true)
		}
		const end = () => {
			setLoading(false)
		}
		Router.events.on('routeChangeStart', start)
		Router.events.on('routeChangeComplete', end)
		Router.events.on('routeChangeError', end)
		return () => {
			Router.events.off('routeChangeStart', start)
			Router.events.off('routeChangeComplete', end)
			Router.events.off('routeChangeError', end)
		}
	}, [])

	const isShow = useMemo(() => {
		return Boolean(
			loaderQueue.find((queue) => queue === EnumLoaderType.FULL_PAGE_LOADER),
		)
	}, [loaderQueue])

	return {
		type,
		isShow: isShow || loading,
	}
}

const LoaderProvider: IContextBuilderResult = {
	name: 'loaderProvider',
	Provider: ({ children }) => {
		const { type, isShow } = useLoader()

		return (
			<>
				{isShow && <Loader type={type} />}
				{children}
			</>
		)
	},
}

export default LoaderProvider
