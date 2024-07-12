import { PmtStatusCode } from 'adapters/error'
import { ICommonDialogState } from 'contexts/commonDialog/interface'
import defaultDialogBuilder from './defaultDialogBuilder'
import {
	CommonDialogType,
	IDefaultCommonDialogBuilderExecutor,
} from './interface'

const defaultDialogBuildersExecutors = [
	{
		match: CommonDialogType.SOMETHING_WENT_WRONG,
		build: (
			props: IDefaultCommonDialogBuilderExecutor,
		): Omit<ICommonDialogState, 'open'> => {
			const { title, primaryButtonOnClick, primaryButtonLabel, PaperProps } =
				props
			return defaultDialogBuilder({
				id: CommonDialogType.SOMETHING_WENT_WRONG,
				theme: 'error',
				title: title || 'Something went wrong',
				desc: 'Please try again.',
				PaperProps,
				primaryButtonLabel,
				primaryButtonOnClick,
			})
		},
	},
	{
		match: CommonDialogType.NO_PERMISSION,
		build: (
			props: IDefaultCommonDialogBuilderExecutor,
		): Omit<ICommonDialogState, 'open'> => {
			const { primaryButtonOnClick, primaryButtonLabel } = props
			return defaultDialogBuilder({
				id: CommonDialogType.NO_PERMISSION,
				theme: 'error',
				title: 'Something went wrong',
				desc: 'Please try again.',
				primaryButtonLabel,
				primaryButtonOnClick,
			})
		},
	},
	{
		match: CommonDialogType.SESSION_EXPIRED,
		build: (
			props: IDefaultCommonDialogBuilderExecutor,
		): Omit<ICommonDialogState, 'open'> => {
			const { primaryButtonOnClick, primaryButtonLabel } = props
			return defaultDialogBuilder({
				id: CommonDialogType.SESSION_EXPIRED,
				theme: 'exclamation',
				title: 'Session expired',
				desc: 'Please log in again.',
				primaryButtonLabel,
				primaryButtonOnClick,
			})
		},
	},
	{
		match: CommonDialogType.CUSTOM_VIEW,
		build: (
			props: IDefaultCommonDialogBuilderExecutor,
		): Omit<ICommonDialogState, 'open'> => {
			const {
				primaryButtonOnClick,
				primaryButtonLabel,
				title,
				desc,
				showIcon,
				size,
				onClose,
			} = props
			return defaultDialogBuilder({
				id: CommonDialogType.CUSTOM_VIEW,
				title: title,
				showIcon,
				desc: desc,
				primaryButtonLabel,
				primaryButtonOnClick,
				size,
				onClose,
			})
		},
	},
	{
		match: CommonDialogType.WARNING,
		build: (
			props: IDefaultCommonDialogBuilderExecutor,
		): Omit<ICommonDialogState, 'open'> => {
			const { primaryButtonOnClick, primaryButtonLabel, title, desc } = props
			return defaultDialogBuilder({
				id: CommonDialogType.WARNING,
				theme: 'exclamation',
				title,
				desc,
				primaryButtonLabel,
				primaryButtonOnClick,
				onClose: (_event, reason) => {
					if (reason === 'backdropClick') primaryButtonOnClick()
				},
			})
		},
	},
	{
		match: CommonDialogType.CONCURRENT,
		build: (
			_props: IDefaultCommonDialogBuilderExecutor,
		): Omit<ICommonDialogState, 'open'> => {
			return defaultDialogBuilder({
				id: CommonDialogType.CONCURRENT,
				theme: 'warning',
				title: 'Security Logout',
				desc: 'For security purposes, your account has been automatically logged out due to a potential unauthorized login attempt detected from an another session. To regain access, please log in again.',
			})
		},
	},
]

export const defaultDialogExecutors = (
	type: CommonDialogType,
	props: IDefaultCommonDialogBuilderExecutor,
	rawCode?: PmtStatusCode | null,
) => {
	const dialogType =
		rawCode === PmtStatusCode.PMT_4011 ? CommonDialogType.CONCURRENT : type
	const executorResult = defaultDialogBuildersExecutors
		.find(({ match }) => match === dialogType)
		?.build(props)
	return executorResult ?? {}
}
