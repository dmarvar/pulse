import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Poppins } from "next/font/google";
import { ReactNode } from 'react';
import AppBar from '@/components/AppBar';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface V0LayoutProps {
  children: ReactNode;
}

export default async function V0Layout({ children }: V0LayoutProps) {
  const session = await getSession();
  
  // This should not happen due to middleware, but just in case
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className={`min-h-screen bg-slate-900 text-white ${poppins.className}`}>
      <AppBar 
        session={session} 
        showThemeToggle={true}
        showUserDetails={true}
      />
      <div className="pt-20">
        {children}
      </div>
      <Script
        src="/CegidInAppChatBot.js"
        strategy="afterInteractive"
        data-title="Hello world"
      />
    </div>
  );
} 