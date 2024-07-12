'use client'
import { containerConfiguration } from 'x-core-modules/module'
import { useConsumeIntervalRefreshTokenCheckerController } from './controller'

const ConsumeIntervalRefreshTokenCheckerContainer = containerConfiguration({
	name: 'consumeIntervalRefreshTokenChecker',
	useController: useConsumeIntervalRefreshTokenCheckerController,
	render: () => null,
})

export default ConsumeIntervalRefreshTokenCheckerContainer
