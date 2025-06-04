import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

// Helper to decode a JWT (without verifying signature)
function decodeJwt(token: string) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    // Add padding if needed
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((payload.length + 3) % 4)
    const json = Buffer.from(base64, 'base64').toString('utf8')
    return JSON.parse(json)
  } catch (e) {
    console.error('Failed to decode JWT:', e)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the Authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    // Extract the token (this would be the access token from your OAuth provider)
    const token = authHeader.substring(7)

    // Decode the token if it's a JWT
    const decoded = decodeJwt(token)
    if (decoded) {
      console.log('🪪 Decoded JWT payload:', JSON.stringify(decoded, null, 2))
    } else {
      console.log('ℹ️ Token is not a JWT or could not be decoded')
    }

    // Return user profile in standard OAuth userinfo format
    const userinfo = {
      sub: decoded.sub,
    }

    return NextResponse.json(userinfo)
    
  } catch (error) {
    console.error('Userinfo endpoint error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Some OAuth implementations use POST for userinfo
  return GET(request)
} 