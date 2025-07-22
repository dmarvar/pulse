export default function ChatbotInAppPage() {
  return (
    <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-white">
            PulseOS Chatbot Component
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Interactive demo of the PulseOS in-app chatbot web component built with Lit
          </p>
        </div>

        {/* Component Demo Section */}
        <div className="mb-16">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Component Demo</h2>
            <p className="text-slate-300 mb-8">
              The chatbot component is loaded at the bottom right of the page. Click the floating button to open it.
            </p>
            
            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* AI-Powered Conversations */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🤖</span>
                  <h3 className="text-lg font-semibold text-white">AI-Powered Conversations</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Intelligent chatbot with natural language processing
                </p>
              </div>

              {/* Session Management */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">💬</span>
                  <h3 className="text-lg font-semibold text-white">Session Management</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Create and manage multiple conversation sessions
                </p>
              </div>

              {/* Responsive Design */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">📱</span>
                  <h3 className="text-lg font-semibold text-white">Responsive Design</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Works seamlessly on desktop and mobile devices
                </p>
              </div>

              {/* Modern UI */}
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🎨</span>
                  <h3 className="text-lg font-semibold text-white">Modern UI</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Clean, modern interface with smooth animations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Section */}
        <div className="mb-16">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Usage</h2>
            <p className="text-slate-300 mb-6">
              Add the component to your HTML page:
            </p>
            
            <div className="bg-slate-900/80 rounded-lg p-6 border border-slate-600/30">
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                <code>{`<script type="module" src="chatbot.js"></script>
<pulseos-chatbot title="Assistant PulseOS"></pulseos-chatbot>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* API Configuration Section */}
        <div className="mb-16">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">API Configuration</h2>
            <p className="text-slate-300 mb-6">
              The chatbot connects to the following endpoints:
            </p>
            
            <div className="space-y-4">
              {/* POST /api/pulse/chat */}
              <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-blue-400 font-mono">/api/pulse/chat</code>
                  <span className="text-slate-400">- Send chat messages</span>
                </div>
              </div>

              {/* GET /api/pulse/session */}
              <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-mono">GET</span>
                  <code className="text-green-400 font-mono">/api/pulse/session</code>
                  <span className="text-slate-400">- Fetch user sessions</span>
                </div>
              </div>

              {/* POST /api/pulse/session */}
              <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-yellow-600 text-white px-2 py-1 rounded text-sm font-mono">POST</span>
                  <code className="text-yellow-400 font-mono">/api/pulse/session</code>
                  <span className="text-slate-400">- Create new session</span>
                </div>
              </div>

              {/* GET /api/pulse/session/:id */}
              <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm font-mono">GET</span>
                  <code className="text-purple-400 font-mono">/api/pulse/session/:id</code>
                  <span className="text-slate-400">- Get session history</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto mb-6"></div>
          <p className="text-slate-500 text-sm">
            © 2025 PulseOS
          </p>
        </div>
      </div>
  );
}
