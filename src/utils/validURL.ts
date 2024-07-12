export const validURL = (url: string): boolean => {
	const pattern = /^(http|https):\/\/[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/i
	return pattern.test(url)
}
