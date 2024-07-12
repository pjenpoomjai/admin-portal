import { NextRequest } from "next/server";
import transactions from './transaction.json'


export async function POST(req: NextRequest) {
    const body = await req.json()
    const size = body.pageSize
    const offset = body.pageNumber * size

    const dataFiltered = (transactions as any).slice(offset, offset + size)
    return Response.json({ 
        status: {
            code: 200,
            description: ""
        },
        data: dataFiltered,
        pageNo: offset,
        pageLimit: size,
        totalRow: transactions.length
    })
}