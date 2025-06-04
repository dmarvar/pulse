# Authentication Setup for CEGID PULSE

This project uses NextAuth.js (AuthJS) with Prisma for authentication. The `/v0` routes are protected and require authentication.

## Features

- 🔐 Protected `/v0` routes
- 🔧 Custom OAuth provider with PKCE support
- 💾 Prisma database adapter
- 🎨 Custom sign-in and error pages
- 🛡️ Middleware-based route protection

## Environment Setup

1. **Create a `.env` file** in the root directory:
   ```bash
   cp env.config.md .env
   ```

2. **Required Environment Variables:**
   ```bash
   # Database
   DATABASE_URL="postgresql://postgres@localhost:5432/pulseos"

   # NextAuth.js Configuration
   NEXTAUTH_SECRET="your-secret-key-here-make-it-long-and-random"
   NEXTAUTH_URL="http://localhost:3000"

   # Custom OAuth Provider with PKCE
   CUSTOM_OAUTH_CLIENT_ID="your-custom-oauth-client-id"
   CUSTOM_OAUTH_CLIENT_SECRET="your-custom-oauth-client-secret"
   CUSTOM_OAUTH_ISSUER="https://your-oauth-provider.com"
   CUSTOM_OAUTH_AUTHORIZATION_URL="https://your-oauth-provider.com/oauth/authorize"
   CUSTOM_OAUTH_TOKEN_URL="https://your-oauth-provider.com/oauth/token"
   CUSTOM_OAUTH_USERINFO_URL="https://your-oauth-provider.com/oauth/userinfo"
   ```

## Database Setup

1. **Set up your PostgreSQL database** and update the `DATABASE_URL` in your `.env` file.

2. **Push the database schema:**
   ```bash
   npm run db:push
   ```

3. **Optional: Use Prisma Studio to view your database:**
   ```bash
   npm run db:studio
   ```

## OAuth Provider Setup

### Custom OAuth Provider

For your custom OAuth provider, ensure it supports:
- OAuth 2.0 with PKCE (Proof Key for Code Exchange)
- OpenID Connect (OIDC) endpoints
- The following scopes: `openid email profile`

Update the environment variables with your provider's specific endpoints.

## Usage

### Protected Routes

All routes under `/v0/*` are automatically protected. Users will be redirected to the sign-in page if not authenticated.

### Authentication Pages

- **Sign In:** `/auth/signin`
- **Error:** `/auth/error`

### Session Management

The application uses JWT sessions for better performance and scalability.

### User Information

User information is available in the session object:
```typescript
import { auth } from "@/auth";

const session = await auth();
if (session?.user) {
  console.log(session.user.name);
  console.log(session.user.email);
  console.log(session.user.image);
}
```

## Development

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the protected route:**
   ```
   http://localhost:3000/v0
   ```

3. **You'll be redirected to sign in if not authenticated**

## Security Features

- **PKCE (Proof Key for Code Exchange)** for OAuth flows
- **CSRF protection** built into NextAuth.js
- **JWT token validation**
- **Secure cookie settings**
- **Middleware-based route protection**

## Troubleshooting

### Common Issues

1. **Database Connection Issues:**
   - Verify your `DATABASE_URL` is correct
   - Ensure PostgreSQL is running
   - Check database permissions

2. **OAuth Errors:**
   - Verify client IDs and secrets
   - Check redirect URIs match exactly
   - Ensure OAuth apps are properly configured

3. **NextAuth Secret:**
   - Generate a secure secret: `openssl rand -base64 32`
   - Never commit the `.env` file to version control

### Reset Database

If you need to reset your database:
```bash
npm run db:reset
```

## Files Structure

```
src/
├── auth.ts                    # NextAuth.js configuration
├── middleware.ts              # Route protection middleware
├── lib/
│   └── prisma.ts             # Prisma client singleton
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts   # NextAuth.js API routes
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx      # Custom sign-in page
│   │   └── error/
│   │       └── page.tsx      # Custom error page
│   └── v0/
│       └── page.tsx          # Protected page
prisma/
└── schema.prisma             # Database schema
```

## Support

For issues related to authentication, check:
1. Browser console for client-side errors
2. Server logs for authentication errors
3. Database logs for connection issues
4. OAuth provider documentation for provider-specific issues 