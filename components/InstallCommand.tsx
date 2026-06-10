"use client";

import { useState, useCallback } from "react";

const COMMAND = "npx pinghumans setup";

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(COMMAND).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, []);

  return (
    <div id="get-started" className="mt-12 text-center scroll-mt-28">
      <h2 className="text-center text-lg font-semibold text-white mb-6">
        Install with one command
      </h2>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-claude-green/20 bg-white/5 px-4 py-3 text-left">
        <code className="font-mono text-sm sm:text-base text-claude-green truncate">
          <span className="text-claude-inactive select-none">$ </span>
          {COMMAND}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 font-mono text-xs sm:text-sm px-3 py-1 rounded bg-claude-green/80 text-white transition-all duration-300 hover:brightness-90"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      
    </div>
  );
}
