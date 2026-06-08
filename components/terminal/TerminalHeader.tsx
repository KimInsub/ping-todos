const CLAWD = "rgb(215,119,87)";

export function TerminalHeader() {
  return (
    <div className="flex items-start gap-5 px-4 py-4 font-mono">
      {/* Clawd mascot - 3 rows */}
      <pre
        className="select-none shrink-0"
        style={{
          color: CLAWD,
          fontSize: "16px",
          lineHeight: "0.9em",
          letterSpacing: "-0.025em",
          fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace",
        }}
        aria-hidden="true"
      >
        <span>{" ▐▛███▜▌\n"}</span>
        <span>{"▝▜█████▛▘\n"}</span>
        <span style={{ marginLeft: "0.5ch" }}>{" ▘▘  ▝▝  "}</span>
      </pre>
      {/* Title info */}
      <div className="flex flex-col gap-0.5 text-sm pt-0.5">
        <div>
          <span className="font-bold text-white">Claude Code</span>
          <span style={{ color: "rgb(153,153,153)" }}> v2.1.47</span>
        </div>
        <div style={{ color: "rgb(153,153,153)" }}>
          Opus 4.6 · Claude Max
        </div>
        <div style={{ color: "rgb(153,153,153)" }}>~/ping-todos</div>
      </div>
    </div>
  );
}
