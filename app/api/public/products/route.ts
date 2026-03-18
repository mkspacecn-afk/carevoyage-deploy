import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 公开API - 供前台网站调用
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    const where: any = { active: true }
    if (category && category !== 'all') {
      where.category = category
    }
    
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    
    // 添加CORS头，允许前台网站访问
    return NextResponse.json(
      { success: true, data: products },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        }
      }
    )
  } catch (error) {
    console.error('Get public products error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get products' },
      { status: 500 }
    )
  }
}
