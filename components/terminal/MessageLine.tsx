export function MessageLine({
  text,
  typingProgress,
}: {
  text: string;
  typingProgress: number;
}) {
  const displayText = text.slice(0, typingProgress);
  const isComplete = typingProgress >= text.length;

  return (
    <div className="font-mono text-sm">
      {/* "You" label like Claude Code's brief mode */}
      <div className="mb-1">
        <span
          className="text-xs font-bold"
          style={{ color: "rgb(122,180,232)" }}
        >
          You
        </span>
      </div>
      {/* User message with background */}
      <div
        className="rounded px-3 py-2"
        style={{ backgroundColor: "rgb(55,55,55)" }}
      >
        <span className="text-white break-words">
          {displayText}
          {!isComplete && (
            <span
              className="inline-block w-1.5 h-4 animate-blink align-middle ml-0.5"
              style={{ backgroundColor: "rgb(153,153,153)" }}
            />
          )}
        </span>
      </div>
    </div>
  );
}
