import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /v0 routes - simple cookie check
  if (request.nextUrl.pathname.startsWith('/v0')) {
    const sessionToken = request.cookies.get('session_token')?.value;
    console.log('Middleware - checking /v0 access, session_token cookie:', sessionToken ? 'Present' : 'Missing');
    
    if (!sessionToken) {
      console.log('Middleware - no session token, redirecting to signin');
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
    
    console.log('Middleware - session token found, allowing access');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/v0/:path*']
} 