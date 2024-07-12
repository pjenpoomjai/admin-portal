import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from 'components/common/Box/Box'
import Button from 'components/common/Button'
import Table from 'components/common/Table'
import Typography from 'components/common/Typography'
import { UploadFileForm } from 'components/common/UploadFile'
import { FC } from 'react'
import { IImportConfigView } from './interface'
import {
	processFailDetailImportColumns,
	processImportColumns,
} from './constant'

const ImportConfigView: FC<IImportConfigView> = (props) => {
	const {
		control,
		isDisableUpload,
		processFailDetailImport,
		processImport,
		onRemoveFile,
		onSubmitUpload,
	} = props

	return (
		<>
			<Box className="bg-white p-6 rounded-b-xl">
				<Box className="flex justify-center items-center flex-col">
					<UploadFileForm
						hideViewFile
						id="upload-file-config"
						control={control}
						name="file"
						label="Select file"
						onRemoveFile={onRemoveFile}
					/>
					<Typography
						className="text-sm text-gray-600 pt-4"
						id="make-sure-upload"
					>
						Make sure the file is from the Downloads tab before you upload.
					</Typography>
				</Box>
				<Box className="flex justify-center mt-4">
					<Button
						id="upload-config"
						className={isDisableUpload ? undefined : '!bg-indigo-500'}
						themetype="filled"
						onClick={onSubmitUpload}
						disabled={isDisableUpload}
					>
						Upload
					</Button>
				</Box>
			</Box>
			{(processImport || processFailDetailImport) && (
				<div className="mt-6 p-6 rounded-xl bg-white">
					{processImport && (
						<>
							<div className="flex items-center">
								<CheckCircleIcon className="w-[48px] h-[48px] text-teal-500" />
								<div className="ml-4">
									<Typography id="status-upload">Success</Typography>
									<Typography id="status-upload">{`Total ${processImport.length} Sheets`}</Typography>
								</div>
							</div>
							<Table
								emptyStateWithHeader
								id="table-config-result"
								classNames="mt-4"
								dataSource={processImport}
								columns={processImportColumns}
							/>
						</>
					)}
					{processFailDetailImport && (
						<>
							<div className="flex items-center">
								<CancelIcon className="w-[48px] h-[48px] text-rose-500" />
								<div className="ml-4">
									<Typography id="status-upload" className="text-rose-500">
										Could not import
									</Typography>
									<Typography id="status-upload-desc">
										Please fix the following error in your sheet and import
										again.
									</Typography>
									<Typography id="status-upload">{`Total ${processFailDetailImport.length} Sheets`}</Typography>
								</div>
							</div>
							<Table
								emptyStateWithHeader
								id="table-config-result"
								classNames="mt-4"
								dataSource={processFailDetailImport}
								columns={processFailDetailImportColumns}
							/>
						</>
					)}
				</div>
			)}
		</>
	)
}

export default ImportConfigView
