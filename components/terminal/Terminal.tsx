"use client";

import { useEffect, useImperativeHandle, forwardRef } from "react";
import { SCRIPT } from "./script";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalBody } from "./TerminalBody";
import { TerminalStatusBar } from "./TerminalStatusBar";
import { useTerminalSimulation } from "./useTerminalSimulation";

interface TerminalProps {
  onStepComplete?: (stepIndex: number) => void;
  pauseAfterStep?: number;
  onPausedChange?: (paused: boolean) => void;
}

export interface TerminalHandle {
  resume: () => void;
}

export const Terminal = forwardRef<TerminalHandle, TerminalProps>(
  function Terminal({ onStepComplete, pauseAfterStep, onPausedChange }, ref) {
    const {
      visibleSteps,
      isAnimating,
      isComplete,
      paused,
      advance,
      resume,
      containerRef,
    } = useTerminalSimulation(SCRIPT, onStepComplete, pauseAfterStep);

    useImperativeHandle(ref, () => ({ resume }), [resume]);

    useEffect(() => {
      onPausedChange?.(paused);
    }, [paused, onPausedChange]);

    const showHint = visibleSteps.length === 0;

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          advance();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [advance]);

    return (
      <div
        className="w-full overflow-hidden cursor-pointer select-none font-mono"
        style={{ backgroundColor: "#000000" }}
        onClick={advance}
        role="button"
        tabIndex={0}
        aria-label="Interactive terminal simulation. Click or press Enter to advance."
      >
        <TerminalHeader />
        <TerminalBody
          visibleSteps={visibleSteps}
          isAnimating={isAnimating}
          isComplete={isComplete}
          showHint={showHint}
          containerRef={containerRef}
        />
        <TerminalStatusBar />
      </div>
    );
  }
);
