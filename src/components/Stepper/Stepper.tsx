import Typography from 'components/common/Typography'
import Link from 'next/link'
import { FC } from 'react'
import KeyboardArrowDownIcon from 'components/common/Icon/KeyboardArrowDown'
import { IStepperProps, IStepper, StepperType } from './interface'

const defaultClassName = 'flex items-center pb-6'

const renderStep = (step: IStepper) => {
	if (step.type === StepperType.TEXT) {
		return (
			<Typography id={step.id} className="text-indigo-500">
				{step.label}
			</Typography>
		)
	}

	return (
		<Link href={step.href}>
			<Typography id={step.id} className="hover:underline text-gray-400">
				{step.label}
			</Typography>
		</Link>
	)
}

const Stepper: FC<IStepperProps> = ({
	steps,
	className = defaultClassName,
}) => {
	const stepCount = steps.length

	return (
		<div className={className}>
			{steps.map((step, index) => {
				return (
					<>
						{renderStep(step)}
						{index !== stepCount - 1 && (
							<KeyboardArrowDownIcon className="transform -rotate-90" />
						)}
					</>
				)
			})}
		</div>
	)
}

export default Stepper
