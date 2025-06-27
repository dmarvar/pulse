import Link from "next/link"
import Image from "next/image"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  const getErrorMessage = (error?: string) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.'
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.'
      case 'Verification':
        return 'The verification token has expired or has already been used.'
      case 'Default':
      default:
        return 'An unexpected error occurred during authentication.'
    }
  }

  const getErrorDescription = (error?: string) => {
    switch (error) {
      case 'Configuration':
        return 'Please contact the administrator to resolve this issue.'
      case 'AccessDenied':
        return 'Please contact your administrator if you believe this is an error.'
      case 'Verification':
        return 'Please try signing in again.'
      case 'Default':
      default:
        return 'Please try again or contact support if the problem persists.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
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
        </div>

        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold mb-4 text-red-400">Authentication Error</h1>
        <p className="text-gray-300 mb-2">{getErrorMessage(params.error)}</p>
        <p className="text-gray-400 text-sm mb-8">{getErrorDescription(params.error)}</p>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/api/auth/signin"
            className="inline-block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>

        {/* Error Details for Debugging */}
        {params.error && (
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-xs">
              Error Code: <span className="text-gray-300">{params.error}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 