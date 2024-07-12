import ErrorSystem from 'components/ErrorSystem/ErrorSystem'
import { FC } from 'react'
import Typography from 'src/components/common/Typography'
import { useProcessingFlowMasterController } from './controller'
import TableConfigMaster from './views/TableConfigMaster/TableConfigMaster'

const Container: FC<ReturnType<typeof useProcessingFlowMasterController>> = (
	props,
) => {
	const { masterConfigData, isError, reload, handleOnClickView } = props

	const getBody = () => {
		if (masterConfigData) {
			return (
				<TableConfigMaster
					data={masterConfigData}
					handleOnClickView={handleOnClickView}
				/>
			)
		}
		if (isError) {
			return (
				<ErrorSystem
					className="w-full flex flex-col py-10 items-center bg-white rounded-xl"
					callback={() => reload()}
				/>
			)
		}
		return <></>
	}

	return (
		<div className="w-full">
			<Typography
				id="master-configuration-management"
				className="text-xl font-semibold text-indigo-500 pt-3 pb-6"
			>
				Master Configuration Management
			</Typography>
			{getBody()}
		</div>
	)
}

export default Container
