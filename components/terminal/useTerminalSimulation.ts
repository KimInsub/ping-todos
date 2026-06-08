"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Step } from "./types";

interface VisibleStep {
  step: Step;
  typingProgress: number;
}

export function useTerminalSimulation(
  script: Step[],
  onStepComplete?: (stepIndex: number) => void
) {
  const [visibleSteps, setVisibleSteps] = useState<VisibleStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentStepRef = useRef(-1);

  const isComplete = currentStepIndex >= script.length - 1 && !isAnimating;

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const skipToEnd = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisibleSteps((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (last) {
        const fullLength =
          last.step.type === "user-input"
            ? last.step.text.length
            : last.step.type === "assistant-text"
              ? last.step.text.length
              : 0;
        updated[updated.length - 1] = { ...last, typingProgress: fullLength };
      }
      return updated;
    });
    setIsAnimating(false);
    if (onStepComplete && currentStepRef.current >= 0) {
      onStepComplete(currentStepRef.current);
    }
  }, [onStepComplete]);

  const animateTyping = useCallback(
    (step: Step, stepIdx: number) => {
      currentStepRef.current = stepIdx;

      if (step.type === "tool-use") {
        setVisibleSteps((prev) => [...prev, { step, typingProgress: 0 }]);
        setIsAnimating(false);
        setTimeout(scrollToBottom, 50);
        onStepComplete?.(stepIdx);
        return;
      }

      const text = step.text;
      const delay = step.type === "user-input" ? 40 : 12;
      let progress = 0;

      setVisibleSteps((prev) => [...prev, { step, typingProgress: 0 }]);
      setIsAnimating(true);

      const tick = () => {
        progress++;
        setVisibleSteps((prev) => {
          const updated = [...prev];
          const idx = updated.length - 1;
          updated[idx] = { ...updated[idx], typingProgress: progress };
          return updated;
        });
        scrollToBottom();

        if (progress < text.length) {
          timerRef.current = setTimeout(tick, delay);
        } else {
          setIsAnimating(false);
          timerRef.current = null;
          onStepComplete?.(stepIdx);
        }
      };

      timerRef.current = setTimeout(tick, delay);
    },
    [scrollToBottom, onStepComplete]
  );

  const advance = useCallback(() => {
    if (isAnimating) {
      skipToEnd();
      return;
    }

    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= script.length) return;

    setCurrentStepIndex(nextIndex);
    animateTyping(script[nextIndex], nextIndex);
  }, [isAnimating, currentStepIndex, script, skipToEnd, animateTyping]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    visibleSteps,
    isAnimating,
    isComplete,
    advance,
    containerRef,
  };
}
