import { Message } from 'adapters/error/error'
import {
	EndpointKey,
	IHeader,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { ITermsAndConditionsRequest } from 'shared/adapters/interfaces/termsAndConditions/queries'
import { CommonDialogType, defaultDialogExecutors } from 'src/builders'
import { useAppContext } from 'x-core-modules/builder'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'
import { mapTermsAndConditions } from './dto'
import { IUseFooterAuth, IUseResourceHandler } from './interface'

const useResourceHandler = (props: IUseResourceHandler) => {
	const {
		openCommonDialog,
		closeCommonDialog,
		adapter,
		renderTermsAndConditions,
	} = props

	const { trigger: triggerTermsAndConditions } = adapter.lazyQuery<
		IQueryProvider,
		QueryKey.TermsAndConditions
	>({
		queryKey: QueryKey.TermsAndConditions,
		queryFunc: async (query, arg: ITermsAndConditionsRequest) => {
			return query.getTermsAndConditions(arg)
		},
		option: {
			onSuccess: (data) => {
				openCommonDialog(
					defaultDialogExecutors(CommonDialogType.CUSTOM_VIEW, {
						primaryButtonOnClick: () => {
							closeCommonDialog()
						},
						primaryButtonLabel: 'Close',
						showIcon: false,
						size: 'extraLarge',
						title: 'Terms and Conditions',
						desc: renderTermsAndConditions(mapTermsAndConditions(data)),
						onClose: (_event, reason) => {
							if (reason === 'backdropClick') closeCommonDialog()
						},
					}),
				)
			},
			onError: (error: Message) => {
				openCommonDialog(
					defaultDialogExecutors(
						CommonDialogType.SOMETHING_WENT_WRONG,
						{
							primaryButtonOnClick: () => {
								closeCommonDialog()
							},
						},
						error.rawCode,
					),
				)
			},
		},
	})

	return {
		triggerTermsAndConditions,
	}
}

export const useFooterAuth = (props: IUseFooterAuth) => {
	const { renderTermsAndConditions } = props
	const { getContextConsumer, getProviderConsumer } = useAppContext()
	const { useOpenCommonDialogSelector, useCloseCommonDialogSelector } =
		getContextConsumer<any>('commonDialog')
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const openCommonDialog = useOpenCommonDialogSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()
	const adapter = useAdapterQuerySelector()

	const { triggerTermsAndConditions } = useResourceHandler({
		adapter,
		openCommonDialog,
		closeCommonDialog,
		renderTermsAndConditions,
	})

	return {
		triggerTermsAndConditions,
	}
}
