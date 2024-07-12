import get from 'lodash/get'
import split from 'lodash/split'

export const extractXForwardedFor = (value: string) => {
	const firstIp = get(split(value, ','), '[0]', '')
	const [ip, port] = split(firstIp, ':')
	return {
		ip,
		port,
	}
}
