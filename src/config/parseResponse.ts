import { PmtStatusCode, StatusCode } from 'adapters/error'
import { Response } from 'adapters/operators/models'
import { AxiosResponse } from 'axios'
import get from 'lodash/get'
import { extractFilenameFromDisposition } from 'utils/extractFilenameFromContentDisposition'

const fileContentTypes = ['text/csv', 'application/vnd.ms-excel']
const statusNotFoundList = [
	PmtStatusCode.PMT_2009,
	PmtStatusCode.PMT_2014,
	PmtStatusCode.PMT_2015,
]

export const parseResponseBody = <R>(response: AxiosResponse<Response<R>>) => {
	const isFile = fileContentTypes.some((contentType) =>
		response.headers['content-type']?.startsWith(contentType),
	)

	if (isFile && response.status === 200) {
		return {
			name: extractFilenameFromDisposition(
				response.headers['content-disposition'],
			),
			file: get(response, 'data'),
		}
	}

	const statusCode = response?.data?.status?.code
	const statusDescription = response?.data?.status?.description
	if (!statusCode || !response?.data) {
		throw new Error(`can't server connecting`)
	}

	if (statusNotFoundList.includes(statusCode as PmtStatusCode)) {
		throw Object.assign(new Error(), {
			response: {
				status: StatusCode.NOT_FOUND,
				data: { status: { code: statusCode, description: statusDescription } },
			},
		})
	}

	if (statusCode !== PmtStatusCode.PMT_1000) {
		throw Object.assign(new Error(), { response })
	}

	return isFile ? response : get(response, 'data')
}
