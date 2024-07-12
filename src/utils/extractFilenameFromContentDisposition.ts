export const extractFilenameFromDisposition = (disposition?: string | null) => {
	return disposition && disposition.includes('attachment')
		? disposition.split('filename=')[1].split(';')[0].replace(/"/g, '')
		: null
}
