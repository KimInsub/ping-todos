"use client";

import { useEffect, useImperativeHandle, forwardRef } from "react";
import { SCRIPT } from "./script";
import { Step } from "./types";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalBody } from "./TerminalBody";
import { TerminalStatusBar } from "./TerminalStatusBar";
import { useTerminalSimulation } from "./useTerminalSimulation";

interface TerminalProps {
  script?: Step[];
  onStepComplete?: (stepIndex: number) => void;
  pauseAtSteps?: number[];
  onPausedChange?: (paused: boolean) => void;
  onReset?: () => void;
  pingingDone?: boolean;
}

export interface TerminalHandle {
  resume: () => void;
}

export const Terminal = forwardRef<TerminalHandle, TerminalProps>(
  function Terminal({ script = SCRIPT, onStepComplete, pauseAtSteps, onPausedChange, onReset, pingingDone }, ref) {
    const {
      visibleSteps,
      isAnimating,
      isComplete,
      paused,
      advance,
      resume,
      containerRef,
    } = useTerminalSimulation(script, onStepComplete, pauseAtSteps, onReset);

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
        className="w-full overflow-hidden cursor-pointer select-none font-mono border border-claude-subtle rounded-lg"
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
          paused={paused}
          pingingDone={pingingDone}
          containerRef={containerRef}
        />
        <TerminalStatusBar />
      </div>
    );
  }
);
