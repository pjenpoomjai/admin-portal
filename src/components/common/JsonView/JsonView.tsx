import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { IJsonViewProps } from './interface'
import defaultClasses from './json.module.css'
import { mergeClasses } from 'utils'
import classNames from 'classnames'
import { useMemo } from 'react'
import { isJSON } from 'utils/validator'

const JsonViewer = (props: IJsonViewProps) => {
	const { src, theme = 'default' } = props
	const classes = mergeClasses(defaultClasses, {})

	const jsonSource = useMemo(() => {
		if (src && isJSON(src) && typeof src === 'string') {
			return JSON.parse(src)
		}
		return src
	}, [src])

	return (
		<div
			className={classNames(
				classes.root,
				'scroll-auto rounded-lg w-full json-view-wrapper p-3',
			)}
		>
			<JsonView theme={theme} src={jsonSource} />
		</div>
	)
}

export default JsonViewer
