export enum CookieKey {
	Token = 'token',
	Permissions = 'permissions',
}

export interface IPersistentStoreContextProps {
	cookies: any[]
}

export interface IPersistentStoreContextValue {
	cookies: Record<CookieKey, string>
}

export interface IPersistentStoreContextAction {
	updateCookieByKeyState(key: CookieKey, cookieData: string): void
	upsertCookieByItemsState(items: Record<CookieKey, string>): void
}

export interface IPersistentStoreContext {
	value: IPersistentStoreContextValue
	action: IPersistentStoreContextAction
}
