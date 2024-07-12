const authEndpointProxyPattern =
	/^http:\/\/auth\.scb-payment-domain-cloud(-dev|-alpha|-staging|-pt|-preprod|-prod)?\.(svc.cluster.local):8080$/

const authEndpointProxyRegex = new RegExp(authEndpointProxyPattern)

export enum TargetType {
	AUTH_ENDPOINT_PROXY = 'AUTH_ENDPOINT_PROXY',
}

const executors = [
	{
		type: TargetType.AUTH_ENDPOINT_PROXY,
		match: authEndpointProxyRegex,
	},
]

const validateBaseUrlExecutors = (path: string, targetType: string) => {
	const executorFound = executors.find(
		({ match, type }) => match.test(path) && targetType === type,
	)
	return Boolean(executorFound)
}

export const validateBaseUrl = (path: string, targetType: string) => {
	if (validateBaseUrlExecutors(path, targetType)) {
		return path
	}
	throw new Error('invalid path')
}
