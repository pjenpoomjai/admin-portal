const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im
const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g
const htmlCtrlEntityRegex = /&(newline|tab);/gi
const nonPrintableCharactersRegex = /[^\x20-\x7E]/gim
const urlSchemeRegex = /^.+(:|&colon;)/gim
const relativeFirstCharacters = ['.', '/']

export const BLANK_URL = '/'

function isRelativeUrlWithoutProtocol(url: string): boolean {
	return relativeFirstCharacters.indexOf(url[0]) > -1
}

// adapted from https://stackoverflow.com/a/29824550/2601552
function decodeHtmlCharacters(str: string) {
	const removedNullByte = str.replace(nonPrintableCharactersRegex, '')
	return removedNullByte.replace(htmlEntitiesRegex, (_match, dec) => {
		return String.fromCharCode(dec)
	})
}

export function sanitizeUrl(url?: string): string {
	if (!url) {
		return BLANK_URL
	}

	const sanitizedUrl = decodeHtmlCharacters(url)
		.replace(htmlCtrlEntityRegex, '')
		.replace(nonPrintableCharactersRegex, '')
		.trim()

	if (!sanitizedUrl) {
		return BLANK_URL
	}

	if (isRelativeUrlWithoutProtocol(sanitizedUrl)) {
		return sanitizedUrl
	}

	const urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex)

	if (!urlSchemeParseResults) {
		return sanitizedUrl
	}

	const urlScheme = urlSchemeParseResults[0]

	if (invalidProtocolRegex.test(urlScheme)) {
		return BLANK_URL
	}

	return sanitizedUrl
}
