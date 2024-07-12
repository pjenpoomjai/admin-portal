import {
	PickersDay as MuiPickersDay,
	PickersDayProps,
} from '@mui/x-date-pickers'
import { DateTime } from 'luxon'
import useId from 'utils/useId'
import { COMPONENT_TYPE } from 'shared/componentType'

export interface IPickersDayProps extends PickersDayProps<DateTime> {
	id?: string
}

const PickersDay = (props: IPickersDayProps) => {
	const { id } = props
	const generateIdEmbed = useId(COMPONENT_TYPE.DATE_PICKER)
	return <MuiPickersDay {...props} {...generateIdEmbed(id)} />
}

export default PickersDay
