import { ICommonDialogState } from 'contexts/commonDialog/interface'
import noop from 'lodash/noop'
import { IDefaultCommonDialogBuilder } from './interface'

const defaultDialogBuilder = (
	props: IDefaultCommonDialogBuilder,
): Omit<ICommonDialogState, 'open'> => {
	const {
		id,
		title,
		desc,
		theme,
		showIcon,
		primaryButtonLabel = 'OK',
		size = 'small',
		PaperProps,
		primaryButtonOnClick = noop,
		onClose = noop,
	} = props
	const SIZE_OPTION_STYLE = {
		small: { minWidth: '386px', minHeight: '274px', borderRadius: '16px' },
		medium: { minWidth: '586px', minHeight: '274px', borderRadius: '16px' },
		large: { minWidth: '786px', minHeight: '274px', borderRadius: '16px' },
		extraLarge: {
			minWidth: '1086px',
			minHeight: '274px',
			borderRadius: '16px',
		},
	}
	return {
		id,
		theme,
		title,
		desc,
		PaperProps: {
			...PaperProps,
			style: {
				...SIZE_OPTION_STYLE[size],
				...PaperProps?.style,
			},
		},
		showIcon,
		primaryButtonProps: {
			id: 'primary-button',
			text: primaryButtonLabel,
			themetype: 'filled',
			className: '!bg-indigo-500 mx-auto',
			style: { minWidth: '125px' },
			onClick: primaryButtonOnClick,
		},
		onClose,
	}
}

export default defaultDialogBuilder
