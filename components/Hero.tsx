export function Hero() {
  return (
    <div className="mb-10 text-center">
      <h1 aria-label="PingHumans" className="mb-8">
        <pre className="inline-block text-left font-mono text-claude-green leading-none text-[0.4rem] xs:text-[0.5rem] sm:text-xs md:text-sm overflow-x-auto">
{` ____  _             _   _
|  _ \\(_)_ __   __ _| | | |_   _ _ __ ___   __ _ _ __  ___
| |_) | | '_ \\ / _\` | |_| | | | | '_ \` _ \\ / _\` | '_ \\/ __|
|  __/| | | | | (_| |  _  | |_| | | | | | | (_| | | | \\__ \\
|_|   |_|_| |_|\\__, |_| |_|\\__,_|_| |_| |_|\\__,_|_| |_|___/
               |___/                                       `}
        </pre>
      </h1>
      <p className="font-mono font-bold tracking-tight text-3xl sm:text-4xl text-white">
        <span className="text-claude-green">Stop checking </span> your AI&rsquo;s work.
      </p>
      <p className="mt-4 font-mono text-base sm:text-lg text-claude-green/90">
        Verification on autopilot, powered by real humans.
      </p>
      <p className="mt-5 font-mono text-sm sm:text-base leading-relaxed text-claude-inactive">
        Your coding agent ships features in minutes &mdash; then stalls, waiting
        for you to review each one.{" "}
        <span className="font-semibold text-white">PingHumans </span> 
        <span className="font-semibold text-white"> calls real humans to check your AI&rsquo;s work</span>,
        so the work keeps moving.
      </p>
      <div className="mt-7 flex items-center justify-center">
        <a
          href="https://pinghumans.com/sign-in"
          className="font-mono font-medium text-sm sm:text-base px-5 py-2 rounded-md bg-claude-green/80 text-white transition-all duration-300 hover:brightness-90"
        >
          Get Started &rarr;
        </a>
      </div>
    </div>
  );
}
