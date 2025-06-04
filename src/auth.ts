import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import type { OAuthConfig, OIDCConfig } from "next-auth/providers"


const MyPKCEOAuthProvider = {
  id: "myoauth",
  name: "My OAuth Provider",
  type: "oauth",
  authorization: {
    // url: "https://inte-oauth.cegid.com/authorize",
    url: "https://inte-oauth.cegid.com/authorize",
    params: {
      scope: "business-os-inte.build.rw business-os-inte.request.rw offline_access",
      response_type: "code",
    },
  },
  // token: "https://inte-signin.cegid.com/inte-signin.cegid.com/oauth2/v2.0/token?p=b2c_1a_signinoidc-v2",
  token: "https://inte-oauth.cegid.com/token",
  // Use your custom userinfo endpoint to mock what the OAuth provider doesn't provide
  userinfo: `${process.env.NEXTAUTH_URL}/api/auth/userinfo`,

  // IMPORTANT: You must set `checks: ["pkce"]`
  checks: ["pkce"],

  clientId: process.env.CUSTOM_OAUTH_CLIENT_ID!,
  clientSecret: process.env.CUSTOM_OAUTH_CLIENT_SECRET!,
  

  async profile(profile) {
    console.log('🔍 Profile:', profile)
    return {
      id: profile.sub ?? "no-id",
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },
} satisfies OAuthConfig<any>


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    MyPKCEOAuthProvider,
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}) 