import noop from 'lodash/noop'
import { IResourcesState } from './interface'
import { Resource } from './model'

export const initialState: IResourcesState = [
	{ resources: new Resource() },
	{ updateResource: noop as any, updateState: noop as any },
]
