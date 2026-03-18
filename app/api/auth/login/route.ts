import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const customer = await prisma.customer.findUnique({
      where: { email }
    })

    if (!customer || !customer.password) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!customer.active) {
      return NextResponse.json(
        { success: false, error: 'Account is disabled' },
        { status: 403 }
      )
    }

    const isValid = await bcrypt.compare(password, customer.password)

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const accessToken = generateAccessToken(customer.id, customer.email)
    const refreshToken = generateRefreshToken(customer.id, customer.email)

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        customerId: customer.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        token: accessToken,
        refreshToken,
        user: {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          phone: customer.phone,
          avatar: customer.avatar,
          emailVerified: customer.emailVerified
        }
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
