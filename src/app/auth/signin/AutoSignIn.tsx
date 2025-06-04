"use client"

import { signIn } from "next-auth/react"
import { useEffect } from "react"

interface AutoSignInProps {
  callbackUrl: string
}

export default function AutoSignIn({ callbackUrl }: AutoSignInProps) {
  useEffect(() => {
    // Automatically trigger sign-in when component mounts
    signIn("myoauth", {
      callbackUrl,
    })
  }, [callbackUrl])

  return (
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-400">Redirecting to authentication...</p>
    </div>
  )
} 