/// <reference types="next" />

import { FunctionComponent } from 'react'

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

type StaticImageData = {
	src: string
	height: number
	width: number
	placeholder?: string
}

declare module '*.png' {
	const content: StaticImageData
	export default content
}

declare module 'react18-json-view' {
	interface IContentProps {
		src: any
	}
	const content: FunctionComponent<IContentProps>
	export default content
}

declare module '*.svg' {
	const content: any
	export default content
}

declare module '*.jpg' {
	const content: StaticImageData
	export default content
}

declare module '*.jpeg' {
	const content: StaticImageData
	export default content
}

declare module '*.gif' {
	const content: StaticImageData
	export default content
}

declare module '*.webp' {
	const content: StaticImageData
	export default content
}

declare module '*.ico' {
	const content: StaticImageData
	export default content
}

declare module '*.bmp' {
	const content: StaticImageData
	export default content
}
