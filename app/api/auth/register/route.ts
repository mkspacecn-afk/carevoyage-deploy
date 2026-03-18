import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone, code } = body

    if (!email || !password || !code) {
      return NextResponse.json(
        { success: false, error: 'Email, password and verification code are required' },
        { status: 400 }
      )
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        type: 'register',
        used: false,
        expiresAt: { gt: new Date() }
      }
    })

    if (!verificationCode) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification code' },
        { status: 400 }
      )
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: { email }
    })

    if (existingCustomer) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const customer = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        emailVerified: true
      }
    })

    await prisma.verificationCode.update({
      where: { id: verificationCode.id },
      data: { used: true }
    })

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
    }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    )
  }
}
