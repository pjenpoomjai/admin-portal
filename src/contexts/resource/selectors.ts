import { useCallback } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Context as UserContext } from './Context'
import { IResourcesState, IResourceModel, IResourcesValue } from './interface'

export const useGetResourceModelSelector = () =>
	useContextSelector<IResourcesState, IResourceModel>(
		UserContext,
		useCallback((state) => state[0]?.resources, []),
	)

export const useUpdateResourceModelSelector = () =>
	useContextSelector<IResourcesState, (params: IResourceModel) => void>(
		UserContext,
		useCallback((state) => state[1]?.updateResource, []),
	)

export const useUpdateResourceStateSelector = () =>
	useContextSelector<IResourcesState, (params: IResourcesValue) => void>(
		UserContext,
		useCallback((state) => state[1]?.updateState, []),
	)
