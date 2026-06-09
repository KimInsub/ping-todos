"use client";

import { useState, useCallback, useRef } from "react";
import { Terminal, TerminalHandle } from "@/components/terminal/Terminal";
import { TopNav, NavPhase } from "@/components/TopNav";

export default function Home() {
  const [phase, setPhase] = useState<NavPhase>("hidden");
  const [waitingForNavClick, setWaitingForNavClick] = useState(false);
  const [feedbackActive, setFeedbackActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const terminalRef = useRef<TerminalHandle>(null);

  const handleStepComplete = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
    if (stepIndex === 4) {
      setPhase("broken");
    } else if (stepIndex === 6) {
      setPhase("reviewing");
    } else if (stepIndex === 7) {
      setTimeout(() => setFeedbackActive(true), 400);
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
      <div style={{
        position: "fixed", top: 8, right: 8, zIndex: 9999,
        background: "rgba(255,0,0,0.8)", color: "white",
        padding: "4px 10px", borderRadius: 4, fontFamily: "monospace",
        fontSize: 14, pointerEvents: "none"
      }}>
        Step: {currentStep}
      </div>
      <TopNav
        phase={phase}
        onClick={waitingForNavClick ? handleNavClick : undefined}
        departing={feedbackActive}
      />
      <div className="min-h-screen bg-black flex items-center justify-center px-4 pt-20 pb-16">
        <div className="max-w-2xl w-full">
          <div className="mb-10 text-center">
            <h1 className="font-mono font-bold tracking-tight text-3xl sm:text-4xl text-white">
              AI builds. <span className="text-claude-orange">PingHumans verify.</span> You ship.
            </h1>
            <p className="mt-5 font-mono text-sm sm:text-base leading-relaxed text-claude-inactive">
              Your coding agent ships features in minutes — but every output still
              needs you to review it.{" "}
              <span className="font-semibold text-white">PingHumans </span> hands that
              verification off to <span className="font-semibold text-white">real humans</span>, right inside your agent&rsquo;s
              workflow. You stay out of the loop.
            </p>
          </div>
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
