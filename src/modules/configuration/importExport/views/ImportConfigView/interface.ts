import { Control, FieldValues } from 'react-hook-form'
import {
	IConfigurationImportProcess,
	IProcessFailDetailDisplay,
} from '../../interface'

export interface IImportConfigView {
	control: Control<FieldValues, any>
	isDisableUpload: boolean
	processImport?: IConfigurationImportProcess[]
	processFailDetailImport?: IProcessFailDetailDisplay[]
	onRemoveFile: (filename: string) => void
	onSubmitUpload: () => void
}
