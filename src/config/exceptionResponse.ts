import { ApiError } from 'adapters/error'
import { Response } from 'adapters/operators/models'
import { AxiosResponse } from 'axios'
import defaultTo from 'lodash/defaultTo'

export const exceptionResponse = <R>(error: {
	response: AxiosResponse<R> | AxiosResponse<Response<R>>
}) => {
	const response = error?.response
	const data = (error?.response?.data as any) || {}
	const errorFields = defaultTo(
		data?.errors ?? data?.fields ?? data?.status ?? data,
		[],
	)

	return ApiError.buildError({
		status: response?.status.toString(),
		code: data?.status?.code.toString(),
		message: data?.status?.description,
		fields: errorFields,
		data,
	})
}
