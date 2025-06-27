import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const authorization_endpoint = "https://inte-signin.cegid.com/inte-signin.cegid.com/oauth2/v2.0/authorize?p=b2c_1a_signinoidc-v2";
const client_id = process.env.CLIENT_ID ?? '';
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8990/api/auth/callback/myoauth';

export async function GET(request: NextRequest) {
  // Generate state parameter for security
  const state = Math.random().toString(36).substring(2, 15);
  
  // Store state in cookie for validation
  const cookieStore = await cookies();
  cookieStore.set('auth_state', state, { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 600 // 10 minutes
  });

  console.log({ state });
  
  // Build authorization URL
  const authParams = new URLSearchParams({
    client_id,
    response_type: 'code id_token',
    redirect_uri,
    scope: `openid ${client_id}`,
    state: state,
    response_mode: 'form_post'
  });
  
  const authUrl = `${authorization_endpoint}&${authParams.toString()}`;
  
  // Redirect to authorization server
  return NextResponse.redirect(authUrl);
} 