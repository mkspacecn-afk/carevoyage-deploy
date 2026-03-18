import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAccessToken } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const payload = verifyAccessToken(token)

    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = { customerId: payload.userId }
    if (status) where.status = status

    const orders = await prisma.order.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            category: true,
            days: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    console.error('Get user orders error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get orders' },
      { status: 500 }
    )
  }
}
