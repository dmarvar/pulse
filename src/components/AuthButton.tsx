'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AuthButton() {
  const { authenticated, loading, signIn, signOut, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (authenticated) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, {user?.id || 'User'}
        </span>
        <button
          onClick={signOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signIn}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Sign In
    </button>
  );
} 