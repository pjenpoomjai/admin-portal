import { NextRequest } from 'next/server'
import transactionDetail from './transactionDetail.json'

export async function POST(_req: NextRequest) {
	const data = transactionDetail as any
	return Response.json({
		status: {
			code: 200,
			description: '',
		},
		data,
	})
}
