import { EndpointKey, IHeader } from 'shared/adapters/interfaces'
import { v4 as uuidv4 } from 'uuid'

export const linkConfig = [
	{
		key: EndpointKey.portal,
		versioning: '',
		endpoint: '/api',
		parseHeader: (ctx: IHeader) => {
			return {
				correlationId: uuidv4(),
				authorization: ctx.token ? `Bearer ${ctx.token}` : undefined,
			}
		},
	},
	{
		key: EndpointKey.pymd,
		versioning: '',
		endpoint: '/pymd',
		parseHeader: (ctx: IHeader) => {
			return {
				correlationId: uuidv4(),
				authorization: ctx.token ? `Bearer ${ctx.token}` : undefined,
			}
		},
	},
]
