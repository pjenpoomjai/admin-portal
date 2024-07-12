import { FC, ReactElement } from 'react'
import ClearIcon from 'components/common/Icon/Clear'
import CheckIcon from 'components/common/Icon/Check'
import classnames from 'classnames'
import MuiChip from '@mui/material/Chip'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'

export interface IChip {
	id: string
	label?: string
	icon?: ReactElement
	deleteIcon?: ReactElement
	deleteFunc?: any
	classNames?: string
	labelSx?: object
	iconSx?: object
	deleteSx?: object
	sx?: object
	disabled?: boolean
}

const Chip: FC<IChip> = (props) => {
	const generateIdEmbed = useId(COMPONENT_TYPE.CHIP)
	const {
		label,
		icon = <CheckIcon className="fill-violet-500 w-[16px] h-[16px]" />,
		deleteIcon = (
			<ClearIcon
				className="fill-violet-500 w-[16px] h-[16px]"
				{...generateIdEmbed(`${props.id}-clear`)}
			/>
		),
		deleteFunc = () => {},
		classNames,
		labelSx,
		iconSx,
		deleteSx,
		sx,
		disabled,
	} = props

	const hideDeleteChip = !deleteIcon.props['data-id']

	return (
		<MuiChip
			label={label}
			icon={icon}
			deleteIcon={deleteIcon}
			onDelete={(event) => {
				deleteFunc(event)
			}}
			sx={{
				'& .MuiChip-label ': {
					paddingTop: '8px',
					paddingBottom: '8px',
					paddingRight: hideDeleteChip ? null : '8px',
					paddingLeft: '0px',
					borderRightWidth: hideDeleteChip ? 'inherit' : '0.5px',
					...labelSx,
				},
				'& .MuiChip-icon ': {
					marginTop: '10px',
					marginBottom: '10px',
					marginLeft: '8px',
					marginRight: '6px',
					...iconSx,
				},
				'& .MuiChip-deleteIcon ': {
					paddingTop: '10px',
					paddingBottom: '10px',
					paddingLeft: '8px',
					paddingRight: '8px',
					...deleteSx,
					width: '32px',
					height: '36px',
					margin: '0px',
				},
				...sx,
			}}
			disabled={disabled}
			className={classnames(
				'flex flex-row',
				'text-violet-500 font-medium text-sm',
				'bg-violet-100 rounded-lg h-[36px] w-fit',
				classNames,
			)}
			{...generateIdEmbed(props.id)}
		></MuiChip>
	)
}

export default Chip
