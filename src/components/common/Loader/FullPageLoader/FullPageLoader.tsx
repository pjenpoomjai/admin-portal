import { FC } from 'react'
import { mergeClasses, useId } from 'utils'
import defaultClasses from './fullPageLoader.module.css'
import { COMPONENT_TYPE } from 'shared/componentType'

interface IFullPageLoader {
	classes?: object
	classNames?: string
}

const FullPageLoader: FC<IFullPageLoader> = (props) => {
	const classes = mergeClasses(defaultClasses, props.classes)
	const generateIdEmbed = useId

	return (
		<div {...generateIdEmbed(COMPONENT_TYPE.DIV)} className={classes.root}>
			<svg
				{...generateIdEmbed(COMPONENT_TYPE.IMAGE)}
				className="fixed top-1/2 left-1/2 z-[1000]"
				viewBox="0 0 100 100"
			>
				<clipPath id="clip">
					<path d="M 50 0 a 50 50 0 0 1 0 100 50 50 0 0 1 0 -100 v 8 a 42 42 0 0 0 0 84 42 42 0 0 0 0 -84" />
				</clipPath>

				<foreignObject
					x="0"
					y="0"
					width="100"
					height="100"
					clipPath="url(#clip)"
				>
					<div className={classes.gradient} />
				</foreignObject>
			</svg>
			<div
				className="fixed inset-0 z-[999] h-full"
				{...generateIdEmbed(COMPONENT_TYPE.MASK)}
			/>
		</div>
	)
}

export default FullPageLoader
