import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, country, service, message } = body

    if (!name || !email || !service) {
      return NextResponse.json(
        { success: false, error: 'Name, email and service are required' },
        { status: 400 }
      )
    }

    const consultation = await prisma.consultation.create({
      data: {
        name,
        email,
        phone,
        country,
        service,
        message,
        status: 'pending'
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consultation submitted successfully',
        data: { id: consultation.id }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Consultation creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit consultation' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where = status ? { status } : {}

    const consultations = await prisma.consultation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return NextResponse.json({ success: true, data: consultations })
  } catch (error) {
    console.error('Consultation fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}
