# Environment Variables Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://postgres@localhost:5432/pulseos"

# NextAuth.js Configuration
NEXTAUTH_SECRET="your-secret-key-here-make-it-long-and-random"
NEXTAUTH_URL="http://localhost:8990"

# Custom OAuth Provider with PKCE
CUSTOM_OAUTH_CLIENT_ID="your-custom-oauth-client-id"
CUSTOM_OAUTH_CLIENT_SECRET="your-custom-oauth-client-secret"
CUSTOM_OAUTH_ISSUER="https://your-oauth-provider.com"
CUSTOM_OAUTH_AUTHORIZATION_URL="https://your-oauth-provider.com/oauth/authorize"
CUSTOM_OAUTH_TOKEN_URL="https://your-oauth-provider.com/oauth/token"
CUSTOM_OAUTH_USERINFO_URL="https://your-oauth-provider.com/oauth/userinfo"
```

## How to obtain these values:

### Custom OAuth Provider:
Replace the placeholder URLs with your actual OAuth provider's endpoints. The system supports OAuth 2.0 with PKCE (Proof Key for Code Exchange) for enhanced security.

### NEXTAUTH_SECRET:
Generate a random string (at least 32 characters). You can use:
```bash
openssl rand -base64 32
``` 