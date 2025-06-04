import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Image from "next/image"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}) {
  const session = await auth()
  const params = await searchParams
  
  // Redirect if already signed in
  if (session) {
    redirect(params.callbackUrl || '/v0')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 shadow-2xl">
            <Image
              src="/Brand 1.svg"
              alt="CEGID PULSE"
              width={200}
              height={60}
              className="filter drop-shadow-lg"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold mt-6 mb-2">Welcome to CEGID PULSE</h1>
          <p className="text-gray-400">Sign in to access the platform</p>
        </div>

        {/* Error Message */}
        {params.error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">
              {params.error === 'OAuthSignin' && 'Error occurred during OAuth sign-in'}
              {params.error === 'OAuthCallback' && 'Error occurred during OAuth callback'}
              {params.error === 'OAuthCreateAccount' && 'Error creating OAuth account'}
              {params.error === 'EmailCreateAccount' && 'Error creating email account'}
              {params.error === 'Callback' && 'Error occurred during callback'}
              {params.error === 'OAuthAccountNotLinked' && 'OAuth account not linked to existing account'}
              {params.error === 'EmailSignin' && 'Error occurred during email sign-in'}
              {params.error === 'CredentialsSignin' && 'Invalid credentials'}
              {params.error === 'SessionRequired' && 'Session required'}
              {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 'Callback', 'OAuthAccountNotLinked', 'EmailSignin', 'CredentialsSignin', 'SessionRequired'].includes(params.error) && 'An error occurred during authentication'}
            </p>
          </div>
        )}

        {/* Sign-in Options */}
        <div className="space-y-4">
          {/* Custom OAuth Provider */}
          <form
            action={async () => {
              "use server"
              await signIn("myoauth", {
                redirectTo: params.callbackUrl || "/v0",
              })
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Continue with OAuth
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
} 