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
    <div className={`min-h-screen w-full bg-slate-900 text-white ${poppins.className}`}>
      <AppBar 
        session={session} 
        showThemeToggle={true}
        showUserDetails={true}
      />
      <main className="pt-20 bg-slate-900 w-full">
        <div className="bg-slate-900">
          {children}
        </div>
      </main>
      
      {/* Global Footer */}
      <footer className="bg-slate-900 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto mb-6"></div>
            <p className="text-slate-500 text-sm">
              © 2024 CEGID PULSE. Transforming enterprise solutions through intelligent automation.
            </p>
          </div>
        </div>
      </footer>
      
      <Script
        src="/CegidInAppChatBot.js"
        strategy="afterInteractive"
        data-title="Hello world"
      />
    </div>
  );
} 