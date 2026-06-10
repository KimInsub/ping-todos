import { AdvanceButton } from "./AdvanceButton";

export function TerminalPrompt({ showHint }: { showHint?: boolean }) {
  return (
    <div className="flex justify-center py-2">
      <AdvanceButton label={showHint ? "Click or press Enter to continue" : "Click or press Enter"} />
    </div>
  );
}
