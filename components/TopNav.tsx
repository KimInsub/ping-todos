"use client";

import { CursorSwarm } from "./CursorSwarm";

export type NavPhase = "hidden" | "broken" | "reviewing" | "fixing" | "fixed";

interface TopNavProps {
  phase?: NavPhase;
  onClick?: () => void;
  departing?: boolean;
}

export function TopNav({ phase = "hidden", onClick, departing }: TopNavProps) {
  const isBroken = phase === "broken" || phase === "reviewing" || phase === "fixing";
  const isFixing = phase === "fixing";
  const showSwarm = phase === "reviewing";

  const handleClick = onClick
    ? (e: React.MouseEvent) => {
        e.preventDefault();
        onClick();
      }
    : undefined;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-claude-subtle/30 transition-all duration-500 ${phase === "hidden" ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"} ${isFixing ? "animate-pulse ring-2 ring-inset ring-claude-green/70" : ""} ${onClick ? "cursor-pointer" : ""}`} onClick={handleClick}>
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-500 ${
          isBroken ? "px-1 h-9" : "px-4 h-14"
        }`}
      >
        {/* Logo */}
        <a
          href="/"
          className={`text-white font-mono font-semibold tracking-tight transition-all duration-500 ${
            isBroken ? "text-sm" : "text-lg"
          }`}
        >
          ping<span className="text-claude-green">-</span>todos
        </a>

        {/* Nav Links */}
        <div
          className={`hidden md:flex items-center transition-all duration-500 ${
            isBroken ? "gap-1" : "gap-8"
          }`}
        >
          <a
            href="#features"
            className={`text-claude-inactive hover:text-white transition-all duration-500 ${
              isBroken ? "text-sm" : "text-sm"
            }`}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className={`text-claude-inactive hover:text-white transition-all duration-500 ${
              isBroken ? "text-sm" : "text-sm"
            }`}
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className={`text-claude-inactive hover:text-white transition-all duration-500 ${
              isBroken ? "text-sm" : "text-sm"
            }`}
          >
            Pricing
          </a>
        </div>

        {/* CTA */}
        <a
          href="#get-started"
          className={`bg-claude-green text-white font-medium rounded-md hover:brightness-90 transition-all duration-500 ${
            isBroken ? "text-sm px-2 py-0.5 ml-1" : "text-sm px-4 py-1.5"
          }`}
        >
          Get Started
        </a>
      </div>

      {/* Cursor swarm overlay */}
      <CursorSwarm visible={showSwarm} departing={departing} />
    </nav>
  );
}
