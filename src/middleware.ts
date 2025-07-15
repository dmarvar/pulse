import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect /v0 routes and /api/manager routes - simple cookie check
  if (request.nextUrl.pathname.startsWith('/v0') || 
      request.nextUrl.pathname.startsWith('/api/manager')) {
    const sessionToken = request.cookies.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/v0/:path*', '/api/manager/:path*']
} 