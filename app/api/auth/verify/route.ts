import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendEmail(to: string, code: string): Promise<boolean> {
  console.log(`[EMAIL] To: ${to}, Code: ${code}`)
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, type = 'register' } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (type === 'register') {
      const existing = await prisma.customer.findUnique({
        where: { email }
      })
      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Email already registered' },
          { status: 409 }
        )
      }
    }

    await prisma.verificationCode.updateMany({
      where: { email, type, used: false },
      data: { used: true }
    })

    const code = generateCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.verificationCode.create({
      data: {
        email,
        code,
        type,
        expiresAt
      }
    })

    const sent = await sendEmail(email, code)

    if (!sent) {
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { message: 'Verification code sent' }
    })
  } catch (error) {
    console.error('Send code error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send verification code' },
      { status: 500 }
    )
  }
}
