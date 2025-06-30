export default function AgenticArchitecturePage() {
    return (
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Agentic Architecture for Multi-Use-Case Chatbots
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            This page explains how to structure your agentic workflows efficiently
            using AG2 for a single chatbot handling multiple use cases
            (documentation retrieval, invoicing flows, payroll flows, and others)
            without impacting performance.
          </p>
        </div>

        {/* Main Content Cards */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {/* Separation of Triggers */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mr-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-400">Separation of Triggers</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">💬</span>
                  <h3 className="text-lg font-semibold text-white">Chatbot Trigger</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Handles conversational user interactions
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🔗</span>
                  <h3 className="text-lg font-semibold text-white">Webhook Trigger</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Handles structured calls from external systems (e.g., event-based processing)
                </p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">⏰</span>
                  <h3 className="text-lg font-semibold text-white">Timer Trigger</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Handles scheduled workflows (e.g., daily invoice generation)
                </p>
              </div>
            </div>
          </div>

          {/* Routing Layer */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg mr-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h2 className="text-2xl font-bold text-purple-400">Use a Routing Layer Before Agent Groups</h2>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Implement a lightweight <strong className="text-white">Intent Router Agent</strong> as a front-layer agent before delegating to heavy workflows. This agent:
            </p>
            <div className="space-y-4">
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  Classifies requests into <code className="bg-slate-900/50 px-2 py-1 rounded text-purple-400">RAG lookup</code>, <code className="bg-slate-900/50 px-2 py-1 rounded text-purple-400">lightweight assistant</code>, or <code className="bg-slate-900/50 px-2 py-1 rounded text-purple-400">agent group workflow</code>
                </p>
              </div>
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  Allows direct short-circuiting for FAQ/documentation RAG without hitting the agent group manager
                </p>
              </div>
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  Only escalates to workflow agents when truly necessary
                </p>
              </div>
            </div>
          </div>

          {/* Layering Flows */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-lg mr-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h2 className="text-2xl font-bold text-orange-400">Layering Flows by Complexity</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-b from-green-500/20 to-green-600/10 rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">⚡</span>
                  <h3 className="text-lg font-semibold text-green-400">Tier 1</h3>
                </div>
                <h4 className="text-white font-medium mb-2">FAQ & Documentation RAG</h4>
                <p className="text-slate-300 text-sm">
                  Fast retrieval without workflow orchestration
                </p>
              </div>
              <div className="bg-gradient-to-b from-yellow-500/20 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🔧</span>
                  <h3 className="text-lg font-semibold text-yellow-400">Tier 2</h3>
                </div>
                <h4 className="text-white font-medium mb-2">Lightweight Single-Agent Flows</h4>
                <p className="text-slate-300 text-sm">
                  For simple form filling or single API calls
                </p>
              </div>
              <div className="bg-gradient-to-b from-red-500/20 to-red-600/10 rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🚀</span>
                  <h3 className="text-lg font-semibold text-red-400">Tier 3</h3>
                </div>
                <h4 className="text-white font-medium mb-2">Full Agentic Workflows</h4>
                <p className="text-slate-300 text-sm">
                  For complex workflows (e.g., invoicing, payroll flows with validations and multiple steps)
                </p>
              </div>
            </div>
          </div>

          {/* Modular Agent Groups */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg mr-4">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <h2 className="text-2xl font-bold text-cyan-400">Use Modular Agent Groups</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Structure your AG2 workflows by <strong className="text-white">domains</strong> (e.g., Invoicing, HR/Payroll, Documentation) with their own Agent Groups.
              This modularization allows scalability and maintenance without impacting other domains when evolving a specific flow.
            </p>
          </div>

          {/* Memory and Context Strategy */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center shadow-lg mr-4">
                <span className="text-white font-bold text-lg">5</span>
              </div>
              <h2 className="text-2xl font-bold text-pink-400">Memory and Context Strategy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-pink-500">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  Store short-term chat context for conversation continuity
                </p>
              </div>
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-pink-500">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  Use workflow-specific context only within active workflows to avoid heavy memory pollution
                </p>
              </div>
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-pink-500">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  For RAG, store conversation trace minimally to preserve session but not overload retrieval systems
                </p>
              </div>
            </div>
          </div>

          {/* Business Units Advice */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-indigo-400">How to Advise Your Business Units</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                <div className="flex items-start mb-4">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-slate-300">
                    Help them classify their use case into RAG, lightweight, or complex workflow
                  </p>
                </div>
                <div className="flex items-start mb-4">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-slate-300">
                    Advise using a unified chatbot interface while routing intelligently under the hood
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-slate-300">
                    Propose domain-based modular flows to avoid entanglement between features
                  </p>
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                <div className="flex items-start mb-4">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-slate-300">
                    Implement observability (logs, metrics) to identify heavy flows for future optimization
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-slate-300">
                    Use clear onboarding documentation to let product teams declare their workflow needs precisely
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto mb-6"></div>
          <p className="text-slate-500 text-sm">
            This architecture ensures scalability, domain isolation, and optimal performance when using AG2 to serve multiple advanced use cases within a single chatbot while preserving a clear developer and user experience.
          </p>
        </div>
      </div>
    );
  }
  