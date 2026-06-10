"use client";

import { RefObject } from "react";
import { Step } from "./types";
import { MessageLine } from "./MessageLine";
import { HumanFeedbackLine } from "./HumanFeedbackLine";
import { PingingHumansLine } from "./PingingHumansLine";
import { AssistantMessage } from "./AssistantMessage";
import { ToolUseBlock } from "./ToolUseBlock";
import { TodoBlock } from "./TodoBlock";
import { ReceivingFeedbackLine } from "./ReceivingFeedbackLine";
import { CheckLine } from "./CheckLine";
import { TerminalPrompt } from "./TerminalPrompt";
import { AdvanceButton } from "./AdvanceButton";

interface VisibleStep {
  step: Step;
  typingProgress: number;
}

export function TerminalBody({
  visibleSteps,
  isAnimating,
  isComplete,
  showHint,
  paused,
  pingingDone,
  containerRef,
}: {
  visibleSteps: VisibleStep[];
  isAnimating: boolean;
  isComplete: boolean;
  showHint: boolean;
  paused: boolean;
  pingingDone?: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  if (showHint) {
    return (
      <div
        ref={containerRef}
        className="flex items-center justify-center h-[400px]"
      >
        <AdvanceButton />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="px-4 pb-4 space-y-3 overflow-y-auto h-[400px] terminal-scrollbar"
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
        if (vs.step.type === "human-feedback") {
          return <HumanFeedbackLine key={i} items={vs.step.items} />;
        }
        if (vs.step.type === "pinging-humans") {
          return (
            <PingingHumansLine
              key={i}
              workers={vs.step.workers}
              typingProgress={vs.typingProgress}
              done={pingingDone}
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
        if (vs.step.type === "receiving-feedback") {
          return (
            <ReceivingFeedbackLine
              key={i}
              done={visibleSteps.some((s) => s.step.type === "human-feedback")}
            />
          );
        }
        if (vs.step.type === "check-line") {
          return <CheckLine key={i} text={vs.step.text} />;
        }
        if (vs.step.type === "todo") {
          return <TodoBlock key={i} items={vs.step.items} />;
        }
        return null;
      })}
      {!isAnimating && paused && <TerminalPrompt showHint />}
      {isComplete && (
        <div className="flex flex-col items-center gap-3 py-3">
          <a
            href="#get-started"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              document
                .getElementById("get-started")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="font-mono text-sm font-semibold px-6 py-2.5 rounded-md bg-claude-green text-black transition-all hover:brightness-110"
          >
            Get started →
          </a>
          <button
            type="button"
            className="font-mono text-xs text-claude-inactive transition-colors hover:text-claude-text"
          >
            ↺ Replay
          </button>
        </div>
      )}
    </div>
  );
}
