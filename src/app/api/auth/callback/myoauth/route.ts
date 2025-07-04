import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const token_endpoint = process.env.TOKEN_ENDPOINT ?? '';
const client_id = process.env.CLIENT_ID ?? '';
const client_secret = process.env.CLIENT_SECRET ?? '';
const redirect_uri = process.env.REDIRECT_URI ?? '';

// Token Service
const token_service_token_endpoint = process.env.TOKEN_SERVICE_TOKEN_ENDPOINT ?? '';
const token_service_client_id = process.env.TOKEN_SERVICE_CLIENT_ID ?? '';
const token_service_client_secret = process.env.TOKEN_SERVICE_CLIENT_SECRET ?? '';

const getTokenServiceAccessToken = async (token: string) => {
  try {
    const credentials = Buffer.from(`${token_service_client_id}:${token_service_client_secret}`).toString('base64');
    
    const response = await fetch(token_service_token_endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
        subject_token: token,
        scope: 'business-os-inte.build.rw business-os-inte.request.rw offline_access'
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status} ${response.statusText} - ${JSON.stringify(result)}`);
    }
    
    return result;
  } catch (error) {
    console.error('Error exchanging token with Token Service:', error);
    throw error;
  }
};

const getSigninAccessToken = async (code: string) => {
  const response = await fetch(token_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code'
    })
  });
  return response.json();
};

// Helper function to decode JWT token to extract user information
const decodeJWT = (token: string) => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = Buffer.from(payload, 'base64url').toString();
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Helper function to create session token (implement with JWT)
async function createSessionToken(sessionData: {
  userId: string;
  userInfo: {
    id: string;
    name: string;
    email: string | null;
  };
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}) {
  // For now, return a simple encoded string
  // You should use JWT here for production
  return Buffer.from(JSON.stringify(sessionData)).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const code = formData.get('code') as string;
    const state = formData.get('state') as string;
    const error = formData.get('error') as string;
    const error_description = formData.get('error_description') as string;
    
    const cookieStore = await cookies();
    
    // Check for errors from the authorization server
    if (error) {
      console.error('OAuth error:', error, error_description);
      return NextResponse.redirect(new URL('/?error=' + encodeURIComponent(error_description || error), request.url));
    }
    
    // Validate state parameter (CSRF protection)
    const storedState = cookieStore.get('auth_state')?.value;
    if (!state || state !== storedState) {
      console.error('Invalid state parameter');
      return NextResponse.redirect(new URL('/?error=invalid_state', request.url));
    }
    
    // If we have an authorization code, exchange it for tokens
    if (code) {
      const tokenResponse = await getSigninAccessToken(code);
      const { access_token, id_token } = tokenResponse;
      
      // Extract user information from id_token
      let userInfo = { id: 'user-id', name: 'User', email: null };
      if (id_token) {
        const decodedIdToken = decodeJWT(id_token);
        if (decodedIdToken) {
          userInfo = {
            id: decodedIdToken.sub || decodedIdToken.oid || 'user-id',
            name: decodedIdToken.name || decodedIdToken.given_name || 'User',
            email: decodedIdToken.email || decodedIdToken.emails?.[0] || null
          };
        }
      }
      
      // Exchange the Sign In access token for a Token Service access token
      const tokenServiceResponse = await getTokenServiceAccessToken(access_token);
      
      // Create session token (you could use JWT here)
      const sessionData = {
        userId: userInfo.id,
        userInfo: userInfo,
        accessToken: tokenServiceResponse.access_token,
        refreshToken: tokenServiceResponse.refresh_token,
        expiresAt: Date.now() + (tokenServiceResponse.expires_in * 1000)
      };
      
      const sessionToken = await createSessionToken(sessionData);
      
      // Clear the state cookie first
      cookieStore.delete('auth_state');
      
      // Create HTML response that redirects (cookie set via headers)
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authentication Successful</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: 'Poppins', 'Roboto', sans-serif; 
              background: #0f172a;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: rgba(30, 41, 59, 0.6);
              border-radius: 1rem;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(148, 163, 184, 0.2);
            }
            .spinner {
              border: 3px solid rgba(148, 163, 184, 0.3);
              border-top: 3px solid #2563eb;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 1rem;
            }
            h2 {
              color: white;
              margin-bottom: 0.5rem;
            }
            p {
              color: #cbd5e1;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h2>Authentication Successful!</h2>
            <p>Redirecting to CEGID PULSE...</p>
          </div>
          <script>
            // Redirect after a short delay to ensure cookie is processed
            setTimeout(function() {
              window.location.href = '/v0';
            }, 1000);
          </script>
        </body>
        </html>
      `;
      
      // Create response with secure cookie settings
      const response = new Response(htmlContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Set-Cookie': `session_token=${sessionToken}; Path=/; Max-Age=${24 * 60 * 60}; HttpOnly; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''} SameSite=Lax`
        },
      });
      
      return response;
    }
    
    // No valid response
    console.error('No valid authentication response received');
    return NextResponse.redirect(new URL('/?error=invalid_response', request.url));
    
  } catch (error) {
    console.error('Error in OAuth callback:', error);
    return NextResponse.redirect(new URL('/?error=callback_error', request.url));
  }
} 