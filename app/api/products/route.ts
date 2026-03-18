import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const active = searchParams.get('active')
    
    const where: any = {}
    if (category) where.category = category
    if (active !== null) where.active = active === 'true'
    
    const products = await prisma.product.findMany({
      where,
      include: {
        hospital: {
          select: {
            id: true,
            name: true,
            city: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, originalPrice, currentPrice, days, description, features, includes, schedule, hospitalId, active } = body
    
    const product = await prisma.product.create({
      data: {
        name,
        category,
        originalPrice: parseFloat(originalPrice) || 0,
        currentPrice: parseFloat(currentPrice) || 0,
        days: parseInt(days) || 0,
        description,
        features: features || [],
        includes: includes || [],
        schedule: schedule || [],
        hospitalId,
        active: active !== false
      }
    })
    
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      )
    }
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : undefined,
        currentPrice: data.currentPrice ? parseFloat(data.currentPrice) : undefined,
        days: data.days ? parseInt(data.days) : undefined,
      }
    })
    
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      )
    }
    
    await prisma.product.delete({ where: { id } })
    
    return NextResponse.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
