"use client";

const GRAY = "rgb(153,153,153)";

export function PingingHumansLine({
  workers,
  typingProgress,
  done,
}: {
  workers: { name: string; color: string }[];
  typingProgress: number;
  done?: boolean;
}) {
  const current = workers[Math.min(Math.max(typingProgress, 1), workers.length) - 1];
  if (!current) return null;

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`inline-block ${done ? "" : "animate-spin"}`}
          style={{ color: GRAY }}
        >
          ⟳
        </span>
        <span style={{ color: GRAY }}>
          Calling{" "}
          <span style={{ color: current.color }}>{current.name}</span>
          {" "}to review…
        </span>
      </div>
    </div>
  );
}
