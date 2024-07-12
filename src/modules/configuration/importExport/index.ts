'use client'
import { containerConfiguration } from 'x-core-modules/module'
import Container from './Container'
import { useConfigImportExportController } from './controller'

const ConfigImportExportContainer = containerConfiguration({
	name: 'configImportExportContainer',
	useController: useConfigImportExportController,
	render: Container,
})

export default ConfigImportExportContainer
