export function TerminalStatusBar() {
  return (
    <div
      className="flex items-center justify-between px-4 py-1.5 text-xs font-mono border-t"
      style={{
        borderColor: "rgb(80,80,80)",
        color: "rgb(153,153,153)",
      }}
    >
      <span>~/my-project</span>
      <span style={{ color: "rgb(215,119,87)" }}>demo</span>
    </div>
  );
}
