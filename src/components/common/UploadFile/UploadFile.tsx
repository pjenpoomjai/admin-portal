import Button from 'components/common/Button'
import IconButton from 'components/common/IconButton'
import noop from 'lodash/noop'
import PaperClip from 'public/static/images/paper-clip.svg'
import Delete from 'public/static/images/remove_file.svg'
import Uploading from 'public/static/images/uploading.svg'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import {
	Control,
	Controller,
	FieldValues,
	UseFormRegisterReturn,
} from 'react-hook-form'
import { COMPONENT_TYPE } from 'shared/componentType'
import useId from 'utils/useId'

export enum MaxSizeLength {
	'10MB' = 10240,
}

export interface IUploadFile {
	id: string
	classNames?: string
	error?: string
	label?: string
	value?: File[]
	isS3?: boolean
	maxSize?: number
	limitUpload?: number
	isUploading?: boolean
	isUploadFail?: boolean
	onChange?: (e: any) => void
	hideRemoveIcon?: boolean
	hideViewFile?: boolean
	register?: UseFormRegisterReturn
	onRemoveFile?: (filename: string) => void
	onRetrySubmitFile?: () => void
	onViewFile?: (value?: any) => void
	multiple?: boolean
	disabled?: boolean
}
export interface IUploadFileForm extends IUploadFile {
	name: string
	control: Control<FieldValues, any>
}

export interface IUploadFileInputRef {
	clear(): void
}

const UploadFile = forwardRef<IUploadFileInputRef, IUploadFile>(
	function UploadFileInput(props: IUploadFile, ref) {
		const {
			error,
			isUploading = false,
			isUploadFail = false,
			onChange = noop,
			value,
			maxSize = 10240, //10MB
			isS3 = false,
			hideRemoveIcon = false,
			hideViewFile = false,
			limitUpload = 10,
			onRemoveFile = noop,
			onRetrySubmitFile = noop,
			onViewFile = noop,
			multiple = false,
			disabled,
			label = 'Upload file',
			...otherProps
		} = props

		const generateIdEmbed = useId(COMPONENT_TYPE.UPLOAD_FILE)
		const generateIdLabelEmbed = useId(COMPONENT_TYPE.LABEL)
		const generateIdDivEmbed = useId(COMPONENT_TYPE.DIV)
		const fileInput = useRef<HTMLInputElement>(null)

		useImperativeHandle(
			ref,
			() => {
				return {
					clear() {
						if (fileInput.current) {
							fileInput.current.value = ''
						}
					},
				}
			},
			[],
		)

		const renderFileComponent = (
			isUploadFail: boolean,
			hideViewFile: boolean,
			hideRemoveIcon: boolean,
			fileName: string,
		) => {
			if (isUploadFail) {
				return (
					<>
						<div className="flex flex-row items-center  ">
							<div className="ml-[12px]">
								<PaperClip {...generateIdEmbed(`file-icon-${otherProps.id}`)} />
							</div>
							<div className="truncate w-[106px] mx-[8px]">{fileName}</div>
						</div>
						<div className="flex flex-1 flex-row items-center justify-end">
							<Button
								themetype={'link'}
								danger
								onClick={onRetrySubmitFile}
								id={'try-again'}
							>
								<div className="text-sm font-semibold text-rose-500 w-[174px]">
									{`Failed to upload `}
									<span className="underline text-rose-500 ">Try again</span>
								</div>
							</Button>
							{!hideRemoveIcon && (
								<IconButton
									onClick={() => onRemoveFile(fileName)}
									className="mr-[9px] p-0"
									id={'delete-file'}
								>
									<Delete {...generateIdEmbed(`delete-icon-file`)} />
								</IconButton>
							)}
						</div>
					</>
				)
			}
			return (
				<div className="flex w-full">
					<div className="flex flex-1 flex-row items-center  ">
						<div className="ml-[12px]">
							<PaperClip {...generateIdEmbed(`file-icon-${otherProps.id}`)} />
						</div>
						<div
							className="w-full mx-[8px]"
							{...generateIdDivEmbed('file-name')}
						>
							{fileName}
						</div>
					</div>
					{(!hideViewFile || !hideRemoveIcon) && (
						<div className="flex flex-row items-center justify-end">
							{!hideViewFile && (
								<Button
									themetype={'link'}
									text="View"
									onClick={onViewFile}
									id={'view'}
								/>
							)}
							{!hideRemoveIcon && (
								<IconButton
									disabled={disabled}
									onClick={() => onRemoveFile(fileName)}
									className="mr-[9px] p-0"
									id={'delete-file'}
								>
									<Delete />
								</IconButton>
							)}
						</div>
					)}
				</div>
			)
		}
		if (!isS3) {
			if (isUploading) {
				return (
					<div className="h-[42px] flex items-center justify-between rounded-[8px] border border-gray-300">
						<div className="flex w-2/5">
							<div className="ml-[12px]">
								<Uploading {...generateIdEmbed('UploadingIcon')} />
							</div>
							<div className="truncate mx-[8px]">Uploading...</div>
						</div>

						<div className="flex flex-wrap items-center justify-end">
							<div className="mr-[12px] ml-[12px]">
								<Delete {...generateIdEmbed(`delete-icon-file`)} />
							</div>
						</div>
					</div>
				)
			}
			if (value && value.length) {
				return (
					<div>
						<div className="h-[42px] flex items-center  rounded-[8px]  border border-gray-300">
							{renderFileComponent(
								isUploadFail,
								hideViewFile,
								hideRemoveIcon,
								(value[0] as File).name,
							)}
						</div>
						{!!error && (
							<p
								{...generateIdLabelEmbed('box-alert-msg')}
								className="text-xs py-[0px] text-rose-500 mt-[8px]"
							>
								{error}
							</p>
						)}
					</div>
				)
			}
		}

		return (
			<div className="flex flex-col">
				<div className="flex mb-[0px]">
					<input
						ref={fileInput}
						type="file"
						name={`input-file-${otherProps.id}`}
						id={`input-file-${otherProps.id}`}
						{...generateIdEmbed(`input-file-${otherProps.id}`)}
						className="hidden"
						accept=".xls, .xlsx"
						multiple={multiple}
						onClick={() => {}}
						onChange={(e) => {
							onChange(e.target.files)
						}}
						disabled={multiple ? value?.length === limitUpload : disabled}
					/>
					<label
						onClick={() => fileInput.current && fileInput.current.click()}
						className={`w-[113px] h-[40px] rounded-[6px] ${
							value?.length === limitUpload ? 'bg-gray-300' : 'cursor-pointer'
						} flex flex-row justify-center items-center border-gray-300 border-[1px]`}
						{...generateIdEmbed(`upload-file-${otherProps.id}`)}
					>
						<span className="text-sm font-semibold">{label}</span>
					</label>
					<div
						className="text-xs text-gray-600 ml-[16px] my-[12px]"
						{...generateIdDivEmbed(`upload-file-desc-${otherProps.id}`)}
					>
						{`Supported file types: XLS or XLSX up to ${maxSize / 1024}MB`}
					</div>
				</div>
				{!!error && (
					<p
						{...generateIdLabelEmbed('box-alert-msg')}
						className="text-xs py-[0px] text-rose-500 mt-[8px]"
					>
						{error}
					</p>
				)}
			</div>
		)
	},
)

const UploadFileForm = (props: IUploadFileForm) => {
	const { name, control, ...otherProps } = props
	return (
		<Controller
			name={name} // same as register('name)
			control={control} // react form controller
			render={({ field, fieldState: { error } }: any) => {
				return (
					<UploadFile
						value={field.value}
						onChange={field.onChange}
						error={error?.message}
						{...otherProps}
					/>
				)
			}}
		/>
	)
}

export { UploadFile, UploadFileForm }
