import {
	Configuration,
	ProtocolMode,
	BrowserAuthOptions,
} from '@azure/msal-browser'

interface IConfigurationAuth extends Omit<BrowserAuthOptions, 'authority'> {
	authority(val: string): string
}
interface IConfiguration extends Omit<Configuration, 'auth'> {
	auth: IConfigurationAuth
}

export const msalConfig: IConfiguration = {
	auth: {
		clientId: '',
		authority: (tenentId: string) =>
			`https://login.microsoftonline.com/${tenentId}`,
		redirectUri: '',
		protocolMode: ProtocolMode.AAD,
		skipAuthorityMetadataCache: true,
	},
	cache: {
		cacheLocation: 'localStorage', // This configures where your cache will be stored
		storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
	},
}

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
	graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
}
