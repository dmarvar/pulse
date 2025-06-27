// Custom OAuth configuration for Pulse application

// OAuth endpoints configuration
export const authorization_endpoint = "https://inte-signin.cegid.com/inte-signin.cegid.com/oauth2/v2.0/authorize?p=b2c_1a_signinoidc-v2";
export const token_endpoint = "https://inte-signin.cegid.com/inte-signin.cegid.com/oauth2/v2.0/token?p=b2c_1a_signinoidc-v2";
export const end_session_endpoint = "https://inte-signin.cegid.com/inte-signin.cegid.com/oauth2/v2.0/logout?p=b2c_1a_signinoidc-v2";
export const client_id = process.env.CLIENT_ID;
export const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8990/api/auth/callback/myoauth';
export const client_secret = process.env.CLIENT_SECRET;

// Token Service configuration
const token_service_token_endpoint = "https://inte-oauth.cegid.com/token";
const token_service_client_id = process.env.TOKEN_SERVICE_CLIENT_ID;
const token_service_client_secret = process.env.TOKEN_SERVICE_CLIENT_SECRET;

export const getTokenServiceAccessToken = async (signinAccessToken: string) => {
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
        subject_token: signinAccessToken,
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
} 