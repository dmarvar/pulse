import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  
  // Clear all auth cookies
  cookieStore.delete('session_token');
  cookieStore.delete('auth_state');
  
  return NextResponse.redirect(new URL('/', request.url));
} 