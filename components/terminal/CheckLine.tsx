export function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-sm font-bold">
      <span style={{ color: "rgb(78, 186, 101)" }}>✓</span>
      <span style={{ color: "rgb(78, 186, 101)" }}>{text}</span>
    </div>
  );
}
