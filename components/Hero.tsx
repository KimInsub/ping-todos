export function Hero() {
  return (
    <div className="mb-10 text-center">
      <h1 className="font-mono font-bold tracking-tight text-3xl sm:text-4xl text-white">
        <span className="text-claude-green">Stop checking </span> your AI&rsquo;s work.
      </h1>
      <p className="mt-4 font-mono text-base sm:text-lg text-claude-green/90">
        Verification on autopilot &mdash; powered by real humans.
      </p>
      <p className="mt-5 font-mono text-sm sm:text-base leading-relaxed text-claude-inactive">
        Your coding agent ships features in minutes &mdash; then stalls, waiting
        for you to review each one.{" "}
        <span className="font-semibold text-white">PingHumans </span> 
        <span className="font-semibold text-white"> calls real humans to check your AI&rsquo;s work</span>,
        so the work keeps moving.
      </p>
    </div>
  );
}
