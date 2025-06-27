import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;
  
  if (!sessionToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  
  try {
    // Decode session token (use JWT verification in production)
    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    
    // Check if token is expired
    if (Date.now() > sessionData.expiresAt) {
      cookieStore.delete('session_token');
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    return NextResponse.json({
      authenticated: true,
      user: {
        id: sessionData.userId,
        // Add other user properties as needed
      }
    });
  } catch (error) {
    console.error('Invalid session token:', error);
    cookieStore.delete('session_token');
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
} 