import { IResourceProps } from 'components/smartComponent/resourceConnector/interface'
import { consumeResource } from '../../resourceConnector'
import { ITypographyResourceProps } from './interface'
import Typography from 'components/common/Typography/Typography'
import { useMemo } from 'react'
import { toLower } from 'lodash'
import Box from 'components/common/Box/Box'

export const Render = (
	componentProps: ITypographyResourceProps,
	controllerProps: IResourceProps,
) => {
	const {
		resourcekey: _,
		notmatchlabel = '-',
		label,
		...commonProps
	} = componentProps
	const displayLabel = useMemo(() => {
		if (controllerProps.isLoading) {
			return (
				<Box className="flex">
					<svg
						className="animate-spin h-5 w-5 mr-3 text-gray-400"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-5"
							cx="12"
							cy="12"
							r="10"
							stroke="text-gray-100"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-90"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<Typography id={commonProps.id} className="text-gray-400">
						... processing
					</Typography>
				</Box>
			)
		} else if (controllerProps.isError) {
			return '-'
		}
		const resrouceLabel = controllerProps.data.find(
			(row) => toLower(row.value) === toLower(label),
		)
		return resrouceLabel ? resrouceLabel.label : notmatchlabel
	}, [label, controllerProps, notmatchlabel, commonProps.id])
	return <Typography {...commonProps}>{displayLabel}</Typography>
}

export const TypographyResource = consumeResource({
	render: Render,
})
