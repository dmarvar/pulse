import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /v0 routes - simple cookie check
  if (request.nextUrl.pathname.startsWith('/v0')) {
    const sessionToken = request.cookies.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/v0/:path*']
} 