import { NextRequest, NextResponse } from 'next/server'

export type IMiddleware = (req: NextRequest) => NextResponse | undefined
