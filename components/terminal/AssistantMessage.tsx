"use client";

function renderFormattedText(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <span key={key++} className="font-bold text-white">
          {match[2]}
        </span>
      );
    } else if (match[3]) {
      parts.push(
        <code
          key={key++}
          className="px-1 py-0.5 rounded text-sm"
          style={{
            backgroundColor: "rgb(55,55,55)",
            color: "rgb(215,119,87)",
          }}
        >
          {match[3]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function AssistantMessage({
  text,
  typingProgress,
}: {
  text: string;
  typingProgress: number;
}) {
  const displayText = text.slice(0, typingProgress);
  const isComplete = typingProgress >= text.length;

  const lines = displayText.split("\n");

  return (
    <div className="font-mono text-sm">
      {/* "Claude" label like Claude Code's brief mode */}
      <div className="mb-1">
        <span
          className="text-xs font-bold"
          style={{ color: "rgb(215,119,87)" }}
        >
          Claude
        </span>
      </div>
      <div
        className="leading-relaxed whitespace-pre-wrap"
        style={{ color: "rgb(230,230,230)" }}
      >
        {lines.map((line, i) => (
          <div key={i}>
            {line.startsWith("- ") ? (
              <span>
                <span style={{ color: "rgb(153,153,153)" }} className="mr-1">
                  -
                </span>
                {renderFormattedText(line.slice(2))}
              </span>
            ) : (
              renderFormattedText(line)
            )}
          </div>
        ))}
        {!isComplete && (
          <span
            className="inline-block w-1.5 h-4 animate-blink align-middle ml-0.5"
            style={{ backgroundColor: "rgb(215,119,87)" }}
          />
        )}
      </div>
    </div>
  );
}
