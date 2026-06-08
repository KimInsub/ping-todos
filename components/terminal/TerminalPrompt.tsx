export function TerminalPrompt({ showHint }: { showHint?: boolean }) {
  return (
    <div className="font-mono">
      {/* Prompt input box with border - mimics Claude Code's prompt bar */}
      <div
        className="rounded px-3 py-2 flex items-center gap-2"
        style={{
          border: "1px solid rgb(136,136,136)",
        }}
      >
        <span
          className="inline-block w-1.5 h-4 animate-blink"
          style={{ backgroundColor: "rgb(153,153,153)" }}
        />
        {showHint && (
          <span
            className="text-xs"
            style={{ color: "rgb(100,100,100)" }}
          >
            Click or press Enter to continue
          </span>
        )}
      </div>
    </div>
  );
}
