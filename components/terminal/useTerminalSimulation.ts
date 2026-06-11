"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Step } from "./types";

interface VisibleStep {
  step: Step;
  typingProgress: number;
}

export function useTerminalSimulation(
  script: Step[],
  onStepComplete?: (stepIndex: number) => void,
  pauseAtSteps?: number[],
  onReset?: () => void
) {
  const [visibleSteps, setVisibleSteps] = useState<VisibleStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
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
              : last.step.type === "pinging-humans"
                ? last.step.workers.length
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

  const autoAdvanceRef = useRef(false);

  const advanceToStep = useCallback(
    (idx: number) => {
      if (idx >= script.length) return;
      setCurrentStepIndex(idx);
      const step = script[idx];
      currentStepRef.current = idx;

      // Schedule the next step, pausing for user input only at the
      // explicitly configured pause points.
      const scheduleNext = (doneIdx: number, nextDelay: number) => {
        if (!autoAdvanceRef.current || doneIdx + 1 >= script.length) return;
        if (pauseAtSteps?.includes(doneIdx)) {
          setPaused(true);
          // the advance button renders below the content — keep it in view
          setTimeout(scrollToBottom, 80);
        } else {
          timerRef.current = setTimeout(() => advanceToStep(doneIdx + 1), nextDelay);
        }
      };

      if (
        step.type === "tool-use" ||
        step.type === "todo" ||
        step.type === "receiving-feedback" ||
        step.type === "human-feedback" ||
        step.type === "check-line"
      ) {
        setVisibleSteps((prev) => [...prev, { step, typingProgress: 0 }]);
        setIsAnimating(false);
        setTimeout(scrollToBottom, 50);
        onStepComplete?.(idx);
        // human-feedback items reveal one-by-one at 400ms; hold the next
        // step until the last item has landed
        const holdFor =
          step.holdAfter ??
          (step.type === "human-feedback" ? step.items.length * 400 + 400 : 400);
        scheduleNext(idx, holdFor);
        return;
      }

      if (step.type === "pinging-humans") {
        const workers = step.workers;
        let progress = 1;
        setVisibleSteps((prev) => [...prev, { step, typingProgress: 1 }]);
        setIsAnimating(true);
        const tick = () => {
          progress++;
          setVisibleSteps((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], typingProgress: progress };
            return updated;
          });
          scrollToBottom();
          if (progress < workers.length) {
            timerRef.current = setTimeout(tick, 600);
          } else {
            setIsAnimating(false);
            timerRef.current = null;
            onStepComplete?.(idx);
            scheduleNext(idx, 400);
          }
        };
        timerRef.current = setTimeout(tick, 600);
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
          const last = updated.length - 1;
          updated[last] = { ...updated[last], typingProgress: progress };
          return updated;
        });
        scrollToBottom();

        if (progress < text.length) {
          timerRef.current = setTimeout(tick, delay);
        } else {
          setIsAnimating(false);
          timerRef.current = null;
          onStepComplete?.(idx);

          const nextDelay =
            step.holdAfter ??
            (idx + 1 < script.length && script[idx + 1].type === "pinging-humans"
              ? 0
              : idx === 0
                ? 1000
                : 400);
          scheduleNext(idx, nextDelay);
        }
      };

      timerRef.current = setTimeout(tick, delay);
    },
    [scrollToBottom, onStepComplete, script, pauseAtSteps]
  );

  const resume = useCallback(() => {
    if (!paused) return;
    setPaused(false);
    const nextIdx = currentStepRef.current + 1;
    if (nextIdx < script.length) {
      timerRef.current = setTimeout(() => advanceToStep(nextIdx), 400);
    }
  }, [paused, script, advanceToStep]);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisibleSteps([]);
    setCurrentStepIndex(-1);
    currentStepRef.current = -1;
    setIsAnimating(false);
    setPaused(false);
    autoAdvanceRef.current = false;
    onReset?.();
  }, [onReset]);

  const advance = useCallback(() => {
    if (isAnimating) {
      skipToEnd();
      return;
    }

    if (paused) {
      resume();
      return;
    }

    // Cancel any pending auto-advance so a click can't double-step
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= script.length) {
      // Demo finished — replay only fires from the Replay button, not from
      // clicking the terminal body. Do nothing here.
      return;
    }

    autoAdvanceRef.current = true;
    advanceToStep(nextIndex);
  }, [isAnimating, paused, resume, currentStepIndex, script, skipToEnd, advanceToStep]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    visibleSteps,
    isAnimating,
    isComplete,
    paused,
    advance,
    resume,
    reset,
    containerRef,
  };
}
