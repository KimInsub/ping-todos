"use client";

import { RefObject } from "react";
import { Step } from "./types";
import { MessageLine } from "./MessageLine";
import { AssistantMessage } from "./AssistantMessage";
import { ToolUseBlock } from "./ToolUseBlock";
import { TerminalPrompt } from "./TerminalPrompt";

interface VisibleStep {
  step: Step;
  typingProgress: number;
}

export function TerminalBody({
  visibleSteps,
  isAnimating,
  isComplete,
  showHint,
  containerRef,
}: {
  visibleSteps: VisibleStep[];
  isAnimating: boolean;
  isComplete: boolean;
  showHint: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={containerRef}
      className="px-4 pb-4 space-y-3 overflow-y-auto min-h-[200px] max-h-[400px] terminal-scrollbar"
    >
      {visibleSteps.map((vs, i) => {
        if (vs.step.type === "user-input") {
          return (
            <MessageLine
              key={i}
              text={vs.step.text}
              typingProgress={vs.typingProgress}
            />
          );
        }
        if (vs.step.type === "assistant-text") {
          return (
            <AssistantMessage
              key={i}
              text={vs.step.text}
              typingProgress={vs.typingProgress}
            />
          );
        }
        if (vs.step.type === "tool-use") {
          return (
            <ToolUseBlock
              key={i}
              tool={vs.step.tool}
              args={vs.step.args}
              result={vs.step.result}
            />
          );
        }
        return null;
      })}
      {!isAnimating && <TerminalPrompt showHint={showHint && !isComplete} />}
    </div>
  );
}
