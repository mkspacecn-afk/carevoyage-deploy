import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hospital = await prisma.hospital.findUnique({
      where: { id: params.id },
      include: {
        services: true,
        products: {
          where: { active: true }
        }
      }
    })

    if (!hospital) {
      return NextResponse.json(
        { success: false, error: 'Hospital not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: hospital })
  } catch (error) {
    console.error('Get hospital error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get hospital' },
      { status: 500 }
    )
  }
}
