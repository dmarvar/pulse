'use client'
import { MermaidChart } from '@/app/v0/mermid';

export default function PayrollCopilotPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-white">
          PayrollCopilot
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          An intelligent conversational assistant that transforms HR workflow complexity 
          into simple, natural conversations for seamless payroll management.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* Project Overview */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Project Vision</h2>
          </div>
          <p className="text-slate-300 leading-relaxed mb-6">
            PayrollCopilot revolutionizes HR operations by replacing complex software interfaces with an intuitive 
            conversational agent. HR teams can now manage employee payroll, process sick leaves, update contracts, 
            and generate payslips through natural language conversations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-2xl mr-3">❌</span>
                Before PayrollCopilot
              </h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Complex UI navigation across multiple systems</li>
                <li>• Manual data entry prone to errors</li>
                <li>• Steep learning curve for new HR staff</li>
                <li>• Time-consuming multi-step processes</li>
              </ul>
            </div>
            
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-2xl mr-3">✅</span>
                With PayrollCopilot
              </h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Natural conversation interface</li>
                <li>• Automated workflow orchestration</li>
                <li>• Instant onboarding and intuitive usage</li>
                <li>• Single-command complex operations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center shadow-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Core Capabilities</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-purple-500/20 to-purple-600/10 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🏥</span>
                <h3 className="text-lg font-semibold text-purple-400">Sick Leave Management</h3>
              </div>
              <p className="text-slate-300 text-sm">
                &ldquo;Add sick leave for John Doe from March 1st to March 5th&rdquo; - automatically handles employee lookup, contract validation, and payroll impact.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-500/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📊</span>
                <h3 className="text-lg font-semibold text-blue-400">Payroll Processing</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Real-time payroll calculations and payslip generation with automatic compliance checks and tax calculations.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-green-500/20 to-green-600/10 rounded-xl p-6 border border-green-500/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">👥</span>
                <h3 className="text-lg font-semibold text-green-400">Employee Management</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Seamless employee and contract management with intelligent context awareness and role-based access control.
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shadow-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">System Architecture</h2>
          </div>
          
          <p className="text-slate-300 leading-relaxed mb-6">
            The PayrollCopilot system orchestrates multiple microservices through a conversational interface, 
            handling authentication, employee management, contract processing, event tracking, and payroll calculations.
          </p>
          
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                         <h3 className="text-lg font-semibold text-white mb-4">Sick Leave Processing Flow</h3>
             <div className="bg-slate-800/50 p-4 rounded-lg">
               <MermaidChart chart={`sequenceDiagram
    participant Client
    participant Token
    participant Employees
    participant Contracts
    participant Events
    participant Payroll

    Client->>Token: Token.Initializer(ImmutableID Account)
    Token-->>Client: TokenId, TokenValue

    Client->>Token: ListerRoles(TokenId, TokenValue)
    Token-->>Client: RolesList

    Client->>Token: ChangerRole(TokenId, TokenValue, NewRole=RESP_PAIE)
    Token-->>Client: Confirmation

    Client->>Employees: ListEmployees(TokenId, TokenValue, CodeCompany)
    Employees-->>Client: EmployeesList

    Client->>Contracts: ListContracts(TokenId, TokenValue, CodeCompany, CodeEmployee)
    Contracts-->>Client: ContractsList

    Client->>Events: AddSickLeave(TokenId, TokenValue, CodeCompany, CodeEmployee, CodeContract, CodeSickLeave, StartDate, EndDate, Type)
    Events-->>Client: Confirmation

    Client->>Payroll: CalculatePayroll(TokenId, TokenValue, CodeCompany, CodeEmployee, CodeContract)
    Payroll-->>Client: CalculationResult

    Client->>Payroll: GetPayslip(TokenId, TokenValue, CodeCompany, CodeEmployee, CodeContract)
    Payroll-->>Client: PayslipPDF`} />
             </div>
          </div>
        </div>

        {/* System Components */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.589 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.589 4 8 4s8-1.79 8-4M4 7c0-2.21 3.589-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">System Components</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🔐</span>
                <h3 className="text-lg font-semibold text-white">Token Service</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Manages authentication, role-based access control, and security tokens for HR operations.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">👤</span>
                <h3 className="text-lg font-semibold text-white">Employee Service</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Handles employee directory, personal information, and company association management.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📄</span>
                <h3 className="text-lg font-semibold text-white">Contract Service</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Manages employment contracts, terms, and contract-specific payroll configurations.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📅</span>
                <h3 className="text-lg font-semibold text-white">Events Service</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Tracks HR events like sick leaves, vacations, and other payroll-affecting activities.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">💰</span>
                <h3 className="text-lg font-semibold text-white">Payroll Service</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Processes payroll calculations, generates payslips, and handles tax computations.
              </p>
            </div>
            
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🤖</span>
                <h3 className="text-lg font-semibold text-white">AI Agent</h3>
              </div>
              <p className="text-slate-300 text-sm">
                Orchestrates conversations and translates natural language to system operations.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 backdrop-blur-sm shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center shadow-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Business Impact</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-green-500">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-medium">80% Reduction in Training Time</h4>
                  <p className="text-slate-300 text-sm">New HR staff can be productive immediately with natural language interface</p>
                </div>
              </div>
              
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-medium">60% Faster Processing</h4>
                  <p className="text-slate-300 text-sm">Automated workflow orchestration eliminates manual navigation</p>
                </div>
              </div>
              
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-medium">95% Error Reduction</h4>
                  <p className="text-slate-300 text-sm">AI-powered validation and automated data handling</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-medium">24/7 Availability</h4>
                  <p className="text-slate-300 text-sm">Always-on assistance for urgent HR operations</p>
                </div>
              </div>
              
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-pink-500">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-medium">Audit Trail</h4>
                  <p className="text-slate-300 text-sm">Complete conversation logging for compliance and tracking</p>
                </div>
              </div>
              
              <div className="flex items-start bg-slate-700/30 rounded-lg p-4 border-l-4 border-cyan-500">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-medium">Scalable Architecture</h4>
                  <p className="text-slate-300 text-sm">Microservices design supports enterprise-level scaling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
