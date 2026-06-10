"use client";

import { useState, useCallback, useRef } from "react";
import { Terminal, TerminalHandle } from "@/components/terminal/Terminal";
import { TopNav, NavPhase } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { InstallCommand } from "@/components/InstallCommand";

export default function Home() {
  const [phase, setPhase] = useState<NavPhase>("hidden");
  const [waitingForNavClick, setWaitingForNavClick] = useState(false);
  const [feedbackActive, setFeedbackActive] = useState(false);
  const terminalRef = useRef<TerminalHandle>(null);

  const resetDemoState = useCallback(() => {
    setPhase("hidden");
    setWaitingForNavClick(false);
    setFeedbackActive(false);
  }, []);

  const handleStepComplete = useCallback((stepIndex: number) => {
    if (stepIndex === 4) {
      setPhase("broken");
    } else if (stepIndex === 6) {
      setPhase("reviewing");
    } else if (stepIndex === 8) {
      setTimeout(() => setFeedbackActive(true), 400);
    } else if (stepIndex === 11) {
      setPhase("fixing");
    } else if (stepIndex === 12) {
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
        departing={feedbackActive}
      />
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20 md:pt-44  pb-16">
        <div className="w-full flex flex-col items-center">
          <div className="max-w-3xl w-full">
            <Hero />
          </div>
          <div className="max-w-2xl w-full">
            <InstallCommand />
          </div>
          <div className="max-w-2xl w-full">
            <h2 className="text-center text-lg font-semibold text-white mt-40 mb-6">
              See it in action
            </h2>
            <Terminal
              ref={terminalRef}
              onStepComplete={handleStepComplete}
              pauseAtSteps={[5, 7]}
              onPausedChange={handlePausedChange}
              onReset={resetDemoState}
              pingingDone={feedbackActive}
            />
          </div>
        </div>
      </div>
      <footer className="bg-black border-t border-claude-subtle/30 py-8">
        <p className="text-center font-mono text-xs text-claude-inactive">
          Built by Fusiform Labs · 2026
        </p>
      </footer>
    </>
  );
}
