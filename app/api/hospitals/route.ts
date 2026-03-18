import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const active = searchParams.get('active')
    
    const where: any = {}
    if (city) where.city = city
    if (active !== null) where.active = active === 'true'
    
    const hospitals = await prisma.hospital.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ success: true, data: hospitals })
  } catch (error) {
    console.error('Get hospitals error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get hospitals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, nameEn, nameZh, city, specialty, description, imageUrl, address, phone, website } = body
    
    const hospital = await prisma.hospital.create({
      data: {
        name,
        nameEn,
        nameZh,
        city,
        specialty: specialty || [],
        description,
        imageUrl,
        address,
        phone,
        website
      }
    })
    
    return NextResponse.json({ success: true, data: hospital })
  } catch (error) {
    console.error('Create hospital error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create hospital' },
      { status: 500 }
    )
  }
}
