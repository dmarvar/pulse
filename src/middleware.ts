import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  
  // Protect /v0 routes
  if (pathname.startsWith('/v0')) {
    if (!req.auth) {
      // Redirect to sign in page if not authenticated
      const signInUrl = new URL('/auth/signin', req.url)
      signInUrl.searchParams.set('callbackUrl', req.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Apply middleware to /v0 routes and auth routes
    '/v0/:path*',
    '/auth/:path*',
    '/api/auth/:path*'
  ]
} 