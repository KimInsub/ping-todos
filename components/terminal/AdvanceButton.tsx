export function AdvanceButton({ label = "Click or press Enter" }: { label?: string }) {
  return (
    <button
      type="button"
      className="font-mono text-sm px-5 py-2.5 rounded-md border transition-colors hover:bg-white/5"
      style={{
        borderColor: "rgb(78, 186, 101)",
        color: "rgb(78, 186, 101)",
      }}
    >
      {label}
    </button>
  );
}
