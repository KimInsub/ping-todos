"use client";

export function ReceivingFeedbackLine({ done }: { done?: boolean }) {
  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span
        className={`inline-block ${done ? "" : "animate-spin"}`}
        style={{ color: "rgb(78, 186, 101)" }}
      >
        ⟳
      </span>
      <span style={{ color: "rgb(78, 186, 101)" }}>
        Receiving feedback from pinged humans...
      </span>
    </div>
  );
}
