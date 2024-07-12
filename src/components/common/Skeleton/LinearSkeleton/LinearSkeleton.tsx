import { ILinearSkeletonProps } from './interface'
import classNames from 'classnames'

const LinearSkeleton = (props: ILinearSkeletonProps) => {
	const { width = 100, hight = 20 } = props
	return (
		<div className="animate-pulse">
			<div
				className={classNames(
					'bg-gray-200 rounded-full dark:bg-gray-700 mb-2 mt-2',
				)}
				style={{
					width: `${width}px`,
					height: `${hight}px`,
				}}
			/>
		</div>
	)
}

export default LinearSkeleton
