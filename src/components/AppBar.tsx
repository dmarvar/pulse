import Link from 'next/link';
import Image from 'next/image';

interface UserInfo {
  name?: string;
  email?: string;
}

interface Session {
  userId: string;
  userInfo?: UserInfo;
}

interface AppBarProps {
  session: Session;
  showThemeToggle?: boolean;
  showBackButton?: boolean;
  backUrl?: string;
  showUserDetails?: boolean;
}

export default function AppBar({ 
  session, 
  showThemeToggle = false, 
  showBackButton = false, 
  backUrl = "/v0",
  showUserDetails = true 
}: AppBarProps) {
  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <div className="flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link href="/v0">
            <Image
              src="/Brand 1.svg"
              alt="Brand Logo"
              width={193}
              height={43}
              className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
        
        {/* Right side controls */}
        <div className="flex items-center gap-4">
        {/* Back Button */}
        {showBackButton && (
          <Link 
            href={backUrl}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
            title="Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        )}

        {/* Theme Toggle Button */}
        {showThemeToggle && (
          <button
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
            title="Dark theme"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>
        )}
        
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
            {session.userInfo?.name ? 
              session.userInfo.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 
              session.userId.substring(0, 2).toUpperCase()
            }
          </div>
          {showUserDetails && (
            <div className="text-sm">
              <p className="text-white font-medium leading-tight">
                {session.userInfo?.name || `User ${session.userId}`}
              </p>
              <p className="text-slate-400 text-xs leading-tight">
                {session.userInfo?.email || 'Authenticated'}
              </p>
            </div>
          )}
        </div>
        
        {/* Logout Button */}
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
            title="Sign out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </form>
        </div>
      </div>
    </div>
  );
} 