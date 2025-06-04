import Image from 'next/image';
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function CegidPulsePage() {
  const session = await auth();
  
  // This should not happen due to middleware, but just in case
  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Auth Header */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600/30 rounded-lg px-4 py-2">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div className="text-sm">
            <p className="text-white font-medium">{session.user.name}</p>
            <p className="text-gray-400 text-xs">{session.user.email}</p>
          </div>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Sign out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-6 py-8">
        {/* Header Section with Logo */}
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* Logo Container */}
          <div className="mb-8 p-8 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 shadow-2xl">
            <Image
              src="/Brand 1.svg"
              alt="CEGID PULSE"
              width={300}
              height={80}
              className="filter drop-shadow-lg"
              priority
            />
          </div>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-300 text-center max-w-2xl leading-relaxed">
            Empowering the future of enterprise solutions with cutting-edge AI technology
          </p>
        </div>

        {/* Feature Cards Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Agentic Platform Framework Card */}
          <div className="group">
            <div className="h-full p-8 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-600/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold ml-4 text-white group-hover:text-blue-400 transition-colors">
                  Agentic Platform Framework
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Revolutionary autonomous agent architecture that adapts and learns from enterprise workflows, 
                enabling intelligent decision-making and seamless process automation.
              </p>
              <div className="mt-6 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="text-sm font-medium">Learn more</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* AI UI Integration Card */}
          <div className="group">
            <div className="h-full p-8 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-600/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-purple-500/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold ml-4 text-white group-hover:text-purple-400 transition-colors">
                  AI UI Integration
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Intelligent user interfaces that understand context and user intent, 
                providing personalized experiences with natural language processing and adaptive design patterns.
              </p>
              <div className="mt-6 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                <span className="text-sm font-medium">Explore features</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tools Card */}
          <div className="group">
            <div className="h-full p-8 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-600/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-orange-500/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold ml-4 text-white group-hover:text-orange-400 transition-colors">
                  Tools
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Comprehensive suite of development and deployment tools designed for enterprise-grade applications, 
                featuring automated testing, monitoring, and scalable infrastructure management.
              </p>
              <div className="mt-6 flex items-center text-orange-400 group-hover:text-orange-300 transition-colors">
                <span className="text-sm font-medium">View tools</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6"></div>
          <p className="text-gray-500 text-sm">
            © 2024 CEGID PULSE. Transforming enterprise solutions through intelligent automation.
          </p>
        </div>
      </div>
    </div>
  );
}
