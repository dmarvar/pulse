"use client";

import { MermaidChart } from '../mermid';

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

        {/* Problem & Solution Overview */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {/* Problem Statement */}
          <div className="bg-red-900/20 rounded-2xl p-8 border border-red-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4">⚠️</span>
              <h2 className="text-2xl font-bold text-red-400">The Problem</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              Traditional chatbot implementations often route <strong className="text-red-400">all requests</strong> through expensive agentic workflows, 
              regardless of complexity. This creates several issues:
            </p>
            <div className="space-y-3">
              <div className="flex items-start bg-red-800/30 rounded-lg p-4">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  <strong className="text-red-400">High computational costs</strong> - Simple FAQ questions don&apos;t need multi-agent workflows
                </p>
              </div>
              <div className="flex items-start bg-red-800/30 rounded-lg p-4">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  <strong className="text-red-400">Increased latency</strong> - Users wait unnecessarily for complex agent orchestration
                </p>
              </div>
              <div className="flex items-start bg-red-800/30 rounded-lg p-4">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-slate-300">
                  <strong className="text-red-400">Resource waste</strong> - Expensive LLM API calls for tasks that could be handled by simpler methods
                </p>
              </div>
            </div>
          </div>

          {/* Solution Overview */}
          <div className="bg-green-900/20 rounded-2xl p-8 border border-green-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4">✅</span>
              <h2 className="text-2xl font-bold text-green-400">The Solution</h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              Our tiered architecture intelligently routes requests based on complexity, ensuring optimal performance and cost-efficiency:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-800/30 rounded-xl p-6 border border-green-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">⚡</span>
                  <h3 className="text-lg font-semibold text-green-400">Tier 1: Simple Queries</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  General purpose LLM for basic questions and conversations
                </p>
              </div>
              <div className="bg-green-800/30 rounded-xl p-6 border border-green-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">📚</span>
                  <h3 className="text-lg font-semibold text-green-400">Tier 2: Documentation</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  RAG-based retrieval for software documentation and knowledge base queries
                </p>
              </div>
              <div className="bg-green-800/30 rounded-xl p-6 border border-green-600/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🤖</span>
                  <h3 className="text-lg font-semibold text-green-400">Tier 3: Complex Tasks</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Full agentic workflows (AG2) for complex multi-step processes like invoice generation
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6">Agentic Architecture Flow</h1>
          
          {/* Architecture Diagram */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-6xl">
              <MermaidChart chart={`flowchart TD
    %% Entry point
    A[User] --> B[Chatbot Interface]
    B --> C[Backend API]

    %% Decoding step
    C --> D{Is voice or document?}
    D -- Yes --> E["Decoder Agent<br/>(Voice/Doc to Text)"]
    E --> F[Decoded Text]
    D -- No --> F[Original Text]

    %% Proxy agent routing
    F --> G["Proxy Agent<br/>(Route by intention)"]
    G --> H{Path Selected}

    %% Paths
    H -- General Purpose --> I["General Assistant<br/>(LLM)"]
    H -- Documentation --> J["Documentation Assistant<br/>(RAG)"]
    H -- Agentic Workflow --> K["Agentic Workflow<br/>(AG2 specialized agents)"]

    %% Response or HITL continuation
    I --> L[Response]
    J --> L
    K --> M{Need more info?}
    M -- Yes --> N["Return agentic-context<br/>and selected path"]
    N --> L
    M -- No --> L

    %% Return to user
    L --> O[Backend API]
    O --> P[Chatbot Interface]
    P --> Q[User]

    %% Styling for dark theme
    classDef default fill:#334155,stroke:#64748b,stroke-width:2px,color:#f1f5f9
    classDef userNode fill:#475569,stroke:#64748b,stroke-width:2px,color:#e2e8f0
    classDef systemNode fill:#1e293b,stroke:#475569,stroke-width:2px,color:#cbd5e1
    classDef agentNode fill:#065f46,stroke:#047857,stroke-width:2px,color:#d1fae5
    classDef decisionNode fill:#7f1d1d,stroke:#991b1b,stroke-width:2px,color:#fecaca
    classDef responseNode fill:#581c87,stroke:#6b21a8,stroke-width:2px,color:#e9d5ff
    
    class A,Q userNode
    class B,C,O,P systemNode
    class E,G,I,J,K agentNode
    class D,H,M decisionNode
    class F,L,N responseNode`} />
              
              {/* Legend */}
              <div className="mt-6 bg-slate-800/50 rounded-xl p-6 border border-slate-600/30">
                <h3 className="text-lg font-semibold text-white mb-4">Color Legend</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded border-2 mr-3" style={{backgroundColor: '#475569', borderColor: '#64748b'}}></div>
                    <span className="text-slate-300 text-sm">User Interactions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded border-2 mr-3" style={{backgroundColor: '#1e293b', borderColor: '#475569'}}></div>
                    <span className="text-slate-300 text-sm">System Components</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded border-2 mr-3" style={{backgroundColor: '#065f46', borderColor: '#047857'}}></div>
                    <span className="text-slate-300 text-sm">AI Agents</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded border-2 mr-3" style={{backgroundColor: '#7f1d1d', borderColor: '#991b1b'}}></div>
                    <span className="text-slate-300 text-sm">Decision Points</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded border-2 mr-3" style={{backgroundColor: '#581c87', borderColor: '#6b21a8'}}></div>
                    <span className="text-slate-300 text-sm">Data Flow</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded border-2 mr-3" style={{backgroundColor: '#334155', borderColor: '#64748b'}}></div>
                    <span className="text-slate-300 text-sm">Default Nodes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Explanation */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4">🔍</span>
              <h2 className="text-2xl font-bold text-white">Architecture Flow Explanation</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-slate-500 pl-6">
                <h3 className="text-lg font-semibold text-white mb-3">1. Entry Point</h3>
                <p className="text-slate-300 leading-relaxed">
                  The flow begins when a <strong className="text-white">User</strong> interacts with the <strong className="text-white">Chatbot Interface</strong>. 
                  This interface forwards the request to the <strong className="text-white">Backend API</strong> for processing.
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6">
                <h3 className="text-lg font-semibold text-white mb-3">2. Content Decoding (Decision Point)</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  The system first determines: <strong className="text-red-400">&quot;Is this voice or document content?&quot;</strong>
                </p>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-300 text-sm">
                    <strong className="text-red-400">If YES:</strong> The request is sent to the <strong className="text-green-400">Decoder Agent</strong> 
                    to transform voice-to-text or extract text from documents.<br/>
                    <strong className="text-red-400">If NO:</strong> The original text is used directly.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-green-400 pl-6">
                <h3 className="text-lg font-semibold text-white mb-3">3. Intelligent Routing</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  The decoded text is passed to the <strong className="text-green-400">Proxy Agent</strong>, which analyzes the request&apos;s 
                  intent and complexity to determine the optimal processing path.
                </p>
              </div>

              <div className="border-l-4 border-red-400 pl-6">
                <h3 className="text-lg font-semibold text-white mb-3">4. Path Selection (Decision Point)</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Based on the analysis, the system routes to one of three specialized paths:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">General Purpose</h4>
                    <p className="text-slate-300 text-sm">
                      Routes to <strong className="text-green-400">General Assistant (LLM)</strong> for basic conversations, 
                      simple questions, and general assistance.
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">Documentation</h4>
                    <p className="text-slate-300 text-sm">
                      Routes to <strong className="text-green-400">Documentation Assistant (RAG)</strong> for knowledge base queries, 
                      software documentation, and FAQ responses.
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">Agentic Workflow</h4>
                    <p className="text-slate-300 text-sm">
                      Routes to <strong className="text-green-400">Agentic Workflow (AG2)</strong> for complex multi-step processes 
                      like invoice generation, payroll processing, or workflow automation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-400 pl-6">
                <h3 className="text-lg font-semibold text-white mb-3">5. Response Generation</h3>
                <p className="text-slate-300 leading-relaxed mb-3">
                  The first two paths (General and Documentation) generate direct <strong className="text-purple-400">Responses</strong>. 
                  However, the Agentic Workflow path includes an additional decision point:
                </p>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-300 text-sm">
                    <strong className="text-red-400">&quot;Need more info?&quot;</strong><br/>
                    <strong className="text-red-400">If YES:</strong> Returns agentic-context and selected path for human-in-the-loop interaction<br/>
                    <strong className="text-red-400">If NO:</strong> Provides the final response directly
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-slate-500 pl-6">
                <h3 className="text-lg font-semibold text-white mb-3">6. Return Journey</h3>
                <p className="text-slate-300 leading-relaxed">
                  All responses flow back through the same path: <strong className="text-white">Backend API → Chatbot Interface → User</strong>, 
                  ensuring consistent delivery regardless of the processing path taken.
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-blue-900/20 rounded-2xl p-8 border border-blue-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4">💡</span>
              <h2 className="text-2xl font-bold text-blue-400">Key Benefits</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start bg-blue-800/30 rounded-lg p-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Cost Optimization</h4>
                    <p className="text-slate-300 text-sm">
                      Routes 80% of simple queries to lightweight LLM or RAG, reserving expensive multi-agent workflows for complex tasks only
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-blue-800/30 rounded-lg p-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Improved Response Times</h4>
                    <p className="text-slate-300 text-sm">
                      Simple questions get instant responses, while complex tasks get the full agentic treatment they need
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start bg-blue-800/30 rounded-lg p-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Human-in-the-Loop</h4>
                    <p className="text-slate-300 text-sm">
                      Agentic workflows can request additional information when needed, maintaining context for complex multi-step processes
                    </p>
                  </div>
                </div>
                <div className="flex items-start bg-blue-800/30 rounded-lg p-4">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-1">Scalable Architecture</h4>
                    <p className="text-slate-300 text-sm">
                      Easy to add new agents or modify routing logic without affecting other components
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Separation of Triggers */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-white">1. Separation of Triggers</h2>
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
              <h2 className="text-2xl font-bold text-white">2. Use a Routing Layer Before Agent Groups</h2>
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
              <h2 className="text-2xl font-bold text-white">3. Layering Flows by Complexity</h2>
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
              <h2 className="text-2xl font-bold text-white">4. Use Modular Agent Groups</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Structure your AG2 workflows by <strong className="text-white">domains</strong> (e.g., Invoicing, HR/Payroll, Documentation) with their own Agent Groups.
              This modularization allows scalability and maintenance without impacting other domains when evolving a specific flow.
            </p>
          </div>

          {/* Memory and Context Strategy */}
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-white">5. Memory and Context Strategy</h2>
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
        </div>
      </div>
    );
  }
  