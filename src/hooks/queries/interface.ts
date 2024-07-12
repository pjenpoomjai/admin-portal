import { IQueryProvider } from 'shared/adapters/interfaces'

export type QueryFunc<K extends keyof IQueryProvider, P extends object> = (
	query: IQueryProvider[K],
	extraParams?: any,
) => Promise<P>
