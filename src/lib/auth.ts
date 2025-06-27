import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;
  
  console.log('getSession - sessionToken:', sessionToken ? 'Present' : 'Missing');
  
  if (!sessionToken) {
    return null;
  }
  
  try {
    // Decode session token (use JWT verification in production)
    console.log('Attempting to decode session token...');
    const sessionData = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
    console.log('Decoded session data:', sessionData);
    
    // Check if token is expired
    const now = Date.now();
    const expiresAt = sessionData.expiresAt;
    console.log('Token expiration check:', { now, expiresAt, expired: now > expiresAt });
    
    if (now > expiresAt) {
      console.log('Token expired - returning null');
      return null;
    }
    
    console.log('Token valid - returning session');
    return {
      userId: sessionData.userId,
      accessToken: sessionData.accessToken,
      refreshToken: sessionData.refreshToken,
      expiresAt: sessionData.expiresAt
    };
  } catch (error) {
    console.error('Invalid session token:', error);
    console.error('Token that failed to parse:', sessionToken);
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