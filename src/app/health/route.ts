export async function GET() {
	const data = {
		status: 'alive',
		timestamp: Math.floor(Date.now() / 1000),
		environment: process.env.MSAL_APP_ENV,
	}

	return Response.json(data)
}
