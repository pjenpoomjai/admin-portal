import {
	DomainErrorCode,
	IBuildAPIErrorPayload,
	StatusCode,
	ErrorType,
} from './interface'
import { Message, MultipleMessage } from './error'
import size from 'lodash/size'

export class ApiError {
	private _code: DomainErrorCode
	private _message: Message | MultipleMessage
	private _rawErrorCode?: string
	private _data?: any

	public static buildError(payload: IBuildAPIErrorPayload) {
		const { status, fields = [], message, code: domainError, data } = payload
		const statusCode = status?.toString() ?? ''
		let code = DomainErrorCode.UNKNOWN

		if (!isNaN(Number(status)) && Number(status) < 500) {
			switch (statusCode) {
				case StatusCode.BAD_REQUEST: {
					code = DomainErrorCode.INVALID_CONTENT
					break
				}
				case StatusCode.UNAUTHORIZED: {
					code = DomainErrorCode.UNAUTHORIZED
					break
				}
				case StatusCode.FORBIDDEN: {
					code = DomainErrorCode.FORBIDDEN
					break
				}
				case StatusCode.NOT_FOUND: {
					code = DomainErrorCode.NOT_FOUND
					break
				}
				case StatusCode.METHOD_NOT_ALLOWED: {
					code = DomainErrorCode.METHOD_NOT_ALLOWED
					break
				}
				case StatusCode.NOT_ACCEPTABLE: {
					code = DomainErrorCode.NOT_ACCEPTABLE
					break
				}
				default: {
					code = DomainErrorCode.UNKNOWN
				}
			}
		}

		if (size(fields) > 0 && fields) {
			if (Array.isArray(fields)) {
				const fieldMessages: Message[] = fields.map((field: any) => {
					const message = new Message(
						field?.message ?? field?.fieldName,
						ErrorType.EXTERNAL_ERROR,
					)
					message.refId = field?.field
					return message
				})

				return new ApiError(
					code,
					new MultipleMessage(message, fieldMessages),
					domainError,
					data,
				)
			} else {
				return new ApiError(
					code,
					new Message(fields?.code, ErrorType.EXTERNAL_ERROR),
					domainError,
					data,
				)
			}
		}

		return new ApiError(
			code,
			new Message(message, ErrorType.EXTERNAL_ERROR),
			domainError,
			data,
		)
	}

	constructor(
		code: DomainErrorCode,
		message: Message | MultipleMessage,
		errorCode?: string,
		data?: any,
	) {
		this._code = code
		this._message = message
		this._rawErrorCode = errorCode
		this._data = data
	}
	get code() {
		return this._code
	}

	set rawErrorCode(errorCode: string | undefined) {
		this._rawErrorCode = errorCode
	}

	get rawErrorCode(): string | undefined {
		return this._rawErrorCode
	}

	get message(): Message | MultipleMessage {
		return this._message
	}

	set message(msg: Message | MultipleMessage) {
		this._message = msg
	}

	get data(): any {
		return this._data
	}

	set data(d: any) {
		this._data = d
	}
}
