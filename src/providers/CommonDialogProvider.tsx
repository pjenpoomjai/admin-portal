import { ModelAuthen } from 'adapters/operators/models'
import { Dialog } from 'components/common/Dialog/Dialog'
import { ICommonDialogState } from 'contexts/commonDialog/interface'
import { useCallback, useMemo } from 'react'
import {
	EndpointKey,
	IHeader,
	IMutateProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { CommonDialogType } from 'src/builders'
import { sanitizeUrl } from 'utils/sanitizeUrl'
import { IContextBuilderResult, useAppContext } from 'x-core-modules/builder'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'

const useCommonDialog = () => {
	const { getContextConsumer, getProviderConsumer } = useAppContext()
	const { useCommonDialogValueSelector, useCloseCommonDialogSelector } =
		getContextConsumer<any>('commonDialog')
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const stateCommonDialog: ICommonDialogState = useCommonDialogValueSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()
	const adapter = useAdapterQuerySelector()

	const returnUrl = sanitizeUrl(
		encodeURIComponent(
			'' + window.location.pathname + '' + window.location.search + '',
		),
	)

	const isShow = useMemo(() => {
		return stateCommonDialog.open
	}, [stateCommonDialog.open])

	const onSuccessClearSession = useCallback(() => {
		closeCommonDialog()
		window.location.href = `/login?returnUrl=${returnUrl}`
	}, [closeCommonDialog, returnUrl])

	const { trigger: triggerClearSession } = adapter.mutation<
		IMutateProvider,
		QueryKey.Authen,
		ModelAuthen.Authen
	>({
		queryKey: QueryKey.Authen,
		queryFunc: async (query) => {
			return query.clearSession()
		},
		option: {
			onSuccess: () => onSuccessClearSession(),
		},
	})

	const dialogProps = useMemo(() => {
		if (stateCommonDialog.id === CommonDialogType.CONCURRENT) {
			return {
				...stateCommonDialog,
				onClick: () => {
					triggerClearSession()
				},
			}
		}
		return stateCommonDialog
	}, [stateCommonDialog, triggerClearSession])

	return {
		isShow,
		dialogProps,
	}
}

const CommonDialogProvider: IContextBuilderResult = {
	name: 'commonDialog',
	Provider: ({ children }) => {
		const { isShow, dialogProps } = useCommonDialog()

		return (
			<>
				{isShow && <Dialog {...dialogProps} />}
				{children}
			</>
		)
	},
}

export default CommonDialogProvider
