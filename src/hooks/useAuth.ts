'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  [key: string]: unknown;
}

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  user?: User;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
    loading: true
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      
      setAuthState({
        authenticated: data.authenticated,
        loading: false,
        user: data.user
      });
    } catch (error) {
      console.error('Authentication check failed:', error);
      setAuthState({
        authenticated: false,
        loading: false
      });
    }
  };

  const signIn = () => {
    window.location.href = '/api/auth/signin';
  };

  const signOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return {
    ...authState,
    signIn,
    signOut,
    checkAuth
  };
} 