"use client";

import { useState, useEffect } from "react";

export function HumanFeedbackLine({ items }: { items: string[] }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= items.length) return;
    const timer = setTimeout(() => setRevealed((n) => n + 1), 400);
    return () => clearTimeout(timer);
  }, [revealed, items.length]);

  return (
    <div className="font-mono text-sm">
      <div className="mb-1">
        <span
          className="text-xs font-bold"
          style={{ color: "rgb(78, 186, 101)" }}
        >
          Pinged Humans
        </span>
      </div>
      <div
        className="rounded px-3 py-2 space-y-1"
        style={{ backgroundColor: "rgb(55,55,55)" }}
      >
        {items.slice(0, revealed).map((item, i) => (
          <div key={i} className="text-white">
            {item}
          </div>
        ))}
        {revealed < items.length && (
          <span
            className="inline-block w-1.5 h-4 animate-blink align-middle"
            style={{ backgroundColor: "rgb(153,153,153)" }}
          />
        )}
      </div>
    </div>
  );
}
