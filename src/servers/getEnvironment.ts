'use server'

export async function getEnv() {
	return {
		MSAL_CLIENT_ID: process.env.MSAL_CLIENT_ID,
		MSAL_REDIRECT_URI: process.env.MSAL_REDIRECT_URI,
		MSAL_TENANT_ID: process.env.MSAL_TENANT_ID,
		SESSION_IDLE_TIMEOUT: process.env.SESSION_IDLE_TIMEOUT || 15,
	}
}
