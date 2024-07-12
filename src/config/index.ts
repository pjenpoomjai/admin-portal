const config = {
	sessionTime: 1000 * 60 * 60 * 23,
	apiEndpoint: process.env.API_ENDPOINT,
	rowsPerPageOptions: [30, 50, 100],
	endpoint: process.env.ENDPOINT,
}

export default config
