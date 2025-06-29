import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;
  
  if (!sessionToken) {
    return null;
  }
  
  try {
    // Decode session token (use JWT verification in production)
    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    
    // Check if token is expired
    const now = Date.now();
    const expiresAt = sessionData.expiresAt;
    
    if (now > expiresAt) {
      return null;
    }
    
    return {
      userId: sessionData.userId,
      userInfo: sessionData.userInfo,
      accessToken: sessionData.accessToken,
      refreshToken: sessionData.refreshToken,
      expiresAt: sessionData.expiresAt
    };
  } catch (error) {
    console.error('Invalid session token:', error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error('Authentication required');
  }
  return session;
} 