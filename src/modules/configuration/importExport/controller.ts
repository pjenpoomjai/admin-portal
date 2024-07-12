import { Message, PmtStatusCode } from 'adapters/error'
import { DateTime } from 'luxon'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	EndpointKey,
	IHeader,
	IQueryProvider,
	QueryKey,
} from 'shared/adapters/interfaces'
import { IConfigurationImportRequest } from 'shared/adapters/interfaces/config/queries'
import { IAppContextProps } from 'shared/appContext/interfaces'
import { CommonDialogType, defaultDialogExecutors } from 'src/builders'
import { IAdapterProviderConsumer } from 'x-core-modules/provider/adapter'
import { ConfigurationTab } from './constant'
import { mapConfigurationImport } from './dto'
import {
	IConfigurationImportProcess,
	IProcessFailDetailDisplay,
	IUseFormHandle,
	IUseResourceHandler,
} from './interface'

const getErrorTitle = (error?: Message) => {
	return [PmtStatusCode.PMT_2015, PmtStatusCode.PMT_2016].includes(
		error?.rawCode,
	)
		? error.message
		: undefined
}

const getPaperProps = (status?: PmtStatusCode) => {
	if (status === PmtStatusCode.PMT_2016) {
		return {
			style: { maxWidth: '500px' },
		}
	}
	return undefined
}

const useResourceHandler = (props: IUseResourceHandler) => {
	const { getContextConsumer, getProviderConsumer } = props
	const { useOpenCommonDialogSelector, useCloseCommonDialogSelector } =
		getContextConsumer<any>('commonDialog')
	const { useAdapterQuerySelector } =
		getProviderConsumer<IAdapterProviderConsumer<EndpointKey, IHeader>>(
			'adapter',
		)
	const openCommonDialog = useOpenCommonDialogSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()
	const adapter = useAdapterQuerySelector()

	const displayErrorDialog = useCallback(
		(error?: Message) => {
			openCommonDialog(
				defaultDialogExecutors(
					CommonDialogType.SOMETHING_WENT_WRONG,
					{
						title: getErrorTitle(error),
						primaryButtonOnClick: () => {
							closeCommonDialog()
						},
						PaperProps: getPaperProps(error?.rawCode),
					},
					error?.rawCode,
				),
			)
		},
		[closeCommonDialog, openCommonDialog],
	)

	const { data: importData, trigger: triggerImport } = adapter.lazyQuery<
		IQueryProvider,
		QueryKey.Config
	>({
		queryKey: QueryKey.Config,
		queryFunc: async (query, arg: IConfigurationImportRequest) => {
			return query.configurationImport(arg)
		},
		option: {
			onError: (error: Message) => {
				displayErrorDialog(error)
			},
		},
	})

	const { trigger: triggerExport } = adapter.lazyQuery<
		IQueryProvider,
		QueryKey.Config
	>({
		queryKey: QueryKey.Config,
		queryFunc: async (query) => {
			return query.configurationExport()
		},
		option: {
			onSuccess: (data) => {
				try {
					const envFile = process.env.NODE_ENV
						? `_${process.env.NODE_ENV.toLocaleLowerCase()}`
						: ''
					const defaultName = `PYMD_configuration_${DateTime.now().toFormat(
						'yyyyMMdd',
					)}${envFile}.xls`
					const filename = data.name ? data.name : defaultName
					const blob = new Blob([data.file], {
						type: 'application/vnd.ms-excel',
					})
					const url = window.URL.createObjectURL(blob)
					const a = document.createElement('a')
					a.href = url
					a.download = filename
					document.body.appendChild(a)
					a.click()
					document.body.removeChild(a)
					window.URL.revokeObjectURL(url)
				} catch {
					displayErrorDialog()
				}
			},
			onError: () => displayErrorDialog(),
		},
	})

	const upload = useCallback(
		(request: IConfigurationImportRequest) => {
			triggerImport(request)
		},
		[triggerImport],
	)

	return {
		importData,
		upload,
		download: triggerExport,
	}
}

const useFormHandle = (props: IUseFormHandle) => {
	const { getContextConsumer, upload } = props
	const { useOpenCommonDialogSelector, useCloseCommonDialogSelector }: any =
		getContextConsumer('commonDialog')
	const { handleSubmit, watch, control, reset } = useForm<any>({
		reValidateMode: 'onSubmit',
		mode: 'all',
	})
	const file = watch('file')
	const openCommonDialog = useOpenCommonDialogSelector()
	const closeCommonDialog = useCloseCommonDialogSelector()

	const onSubmit = useCallback(
		({ file }: { file: File }) => {
			openCommonDialog({
				id: 'upload-config',
				theme: 'info',
				title: 'Upload Configuration',
				desc: `Are you sure to upload ${file[0].name}?`,
				direction: 'horizontal',
				PaperProps: {
					style: {
						minWidth: '386px',
						borderRadius: '16px',
					},
				},
				showIcon: true,
				primaryButtonProps: {
					id: 'confirm',
					text: 'Confirm',
					themetype: 'filled',
					className: '!bg-indigo-500',
					style: { minWidth: '125px' },
					onClick: () => {
						upload({ uploadFile: file })
						closeCommonDialog()
					},
				},
				secondaryButtonProps: {
					id: 'cancel',
					text: 'Cancel',
					style: { minWidth: '125px' },
					onClick: () => closeCommonDialog(),
				},
			})
		},
		[closeCommonDialog, openCommonDialog, upload],
	)

	const onRemoveFile = useCallback(() => {
		reset()
	}, [reset])

	const isDisableUpload = useMemo(() => {
		return !file
	}, [file])

	return {
		control,
		isDisableUpload,
		onRemoveFile,
		onSubmit: handleSubmit(onSubmit),
		handleSubmit,
	}
}

export const useConfigImportExportController = (props: IAppContextProps) => {
	const { getContextConsumer, getProviderConsumer } = props
	const { importData, upload, download } = useResourceHandler({
		getContextConsumer,
		getProviderConsumer,
	})
	const {
		control,
		isDisableUpload,
		onRemoveFile,
		onSubmit: onSubmitUpload,
	} = useFormHandle({
		getContextConsumer,
		upload,
	})
	const [selectedTab, setSelectedTab] = useState<ConfigurationTab>(
		ConfigurationTab.DOWNLOAD,
	)

	const tabHandler = useCallback((selected: ConfigurationTab) => {
		setSelectedTab(selected)
	}, [])

	const importResult = useMemo(() => {
		if (!importData) return undefined
		return mapConfigurationImport(importData)
	}, [importData])

	const processImport = useMemo(():
		| IConfigurationImportProcess[]
		| undefined => {
		if (importResult && importResult.process.length) return importResult.process
		return undefined
	}, [importResult])

	const processFailDetailImport = useMemo(():
		| IProcessFailDetailDisplay[]
		| undefined => {
		if (importResult && importResult.processFailDetail.length) {
			return importResult.processFailDetail.reduce(
				(accumulator, { configName, target }) => {
					if (target.length === 1) {
						const { column, detail, row } = target[0]
						return [...accumulator, { configName, row: row, column, detail }]
					}
					return [
						...accumulator,
						{
							configName,
							row: target[0].row,
							column: target[0].column,
							detail: target[0].detail,
						},
						...target.slice(1).map(({ column, detail, row }) => {
							return { configName: '', row, column, detail }
						}),
					]
				},
				[] as IProcessFailDetailDisplay[],
			)
		}
		return undefined
	}, [importResult])

	return {
		selectedTab,
		tabHandler,
		downloadForm: {
			onSubmitDownload: download,
		},
		uploadForm: {
			processImport,
			processFailDetailImport,
			isDisableUpload,
			onSubmitUpload,
			control,
			onRemoveFile,
		},
	}
}
