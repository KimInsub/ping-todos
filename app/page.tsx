"use client";

import { useState, useCallback, useRef } from "react";
import { Terminal, TerminalHandle } from "@/components/terminal/Terminal";
import { TopNav, NavPhase } from "@/components/TopNav";

export default function Home() {
  const [phase, setPhase] = useState<NavPhase>("hidden");
  const [waitingForNavClick, setWaitingForNavClick] = useState(false);
  const terminalRef = useRef<TerminalHandle>(null);

  const handleStepComplete = useCallback((stepIndex: number) => {
    if (stepIndex === 4) {
      setPhase("broken");
    } else if (stepIndex === 6) {
      setPhase("reviewing");
    } else if (stepIndex === 10) {
      setPhase("fixed");
    }
  }, []);

  const handlePausedChange = useCallback((paused: boolean) => {
    setWaitingForNavClick(paused);
  }, []);

  const handleNavClick = useCallback(() => {
    terminalRef.current?.resume();
  }, []);

  return (
    <>
      <TopNav
        phase={phase}
        onClick={waitingForNavClick ? handleNavClick : undefined}
      />
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20 pb-16">
        <div className="max-w-2xl w-full">
          <Terminal
            ref={terminalRef}
            onStepComplete={handleStepComplete}
            pauseAfterStep={5}
            onPausedChange={handlePausedChange}
          />
        </div>
      </div>
    </>
  );
}
