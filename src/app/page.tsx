import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-poppins)] bg-slate-900 text-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center text-center">
        <Image
          src="/Brand 1.svg"
          alt="Pulse OS logo"
          width={364}
          height={78}
          priority
        />
        
        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            PulseOS Integration TEAM Demonstrations
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl">
            Showcasing architectural examples of agentic workflows, BFF patterns, and integrations with forkable interfaces for consuming AI workflows
          </p>
          
          <div className="flex flex-col gap-4 items-center mt-8">
            <p className="text-lg text-slate-400">
              Explore our integration demonstrations and authenticate with your Cegid account:
            </p>
            
            <Link
              href="/api/auth/signin"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-lg h-12 px-8"
            >
              Cegid Sign in
            </Link>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-slate-300 hover:text-blue-400 transition-colors"
          href="https://github.com/cegid/pulseos-agent"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Workflows
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-slate-300 hover:text-blue-400 transition-colors"
          href="https://github.com/cegid/aicoe-documentation-shared"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Documentation
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-slate-300 hover:text-blue-400 transition-colors"
          href="https://github.com/cegid/pulseos-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Integration Demos
        </a>
      </footer>
    </div>
  );
}
