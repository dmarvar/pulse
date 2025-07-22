import Image from 'next/image';

export default function CegidPulsePage() {
  return (
    <div className="container mx-auto px-6">
        {/* Header Section with Logo */}
        <div className="flex flex-col items-center justify-center min-h-[45vh]">
          {/* Logo Container */}
          <div className="mb-8 p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 shadow-2xl">
            <Image
              src="/Brand 1.svg"
              alt="CEGID PULSE"
              width={364}
              height={78}
              className="filter drop-shadow-lg"
              priority
            />
          </div>
          
          {/* Subtitle */}
          <p className="text-xl text-slate-300 text-center max-w-2xl leading-relaxed">
            Empowering the future of enterprise solutions with cutting-edge AI technology
          </p>
        </div>

        {/* Feature Cards Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Architectural Agentic Patterns Card */}
          <div className="group">
            <a href="/v0/architecture" className="block h-full">
              <div className="h-full p-8 rounded-xl bg-slate-800/80 border border-slate-600/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-white group-hover:text-blue-400 transition-colors">
                    Architectural Agentic Patterns
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Learn how to structure agentic workflows efficiently using AG2 for multi-use-case chatbots. 
                  Covers routing layers, modular agent groups, and performance optimization strategies.
                </p>
                <div className="mt-6 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* In-App Chatbot Card */}
          <div className="group">
            <a href="/v0/chatbot-in-app" className="block h-full">
              <div className="h-full p-8 rounded-xl bg-slate-800/80 border border-slate-600/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-purple-500/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-white group-hover:text-purple-400 transition-colors">
                    In-App Chatbot
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Interactive PulseOS chatbot component with AI-powered conversations, session management, 
                  and responsive design. See the demo implementation in <code className="text-purple-400">page.tsx</code>.
                </p>
                <div className="mt-6 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span className="text-sm font-medium">View Demo</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* Use Cases Dashboard Card */}
          <div className="group">
            <a href="/v0/use-cases" className="block h-full">
              <div className="h-full p-8 rounded-xl bg-slate-800/80 border border-slate-600/30 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-green-500/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold ml-4 text-white group-hover:text-green-400 transition-colors">
                    Integration Management
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Comprehensive PulseOS implementation analytics with interactive charts, readiness metrics, 
                  and business unit performance tracking. Visualize initiative scores and implementation levels across the organization.
                </p>
                <div className="mt-6 flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                  <span className="text-sm font-medium">View Dashboard</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
  );
}
