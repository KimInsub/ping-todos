"use client";

import { useState } from "react";

function renderResultLine(line: string, index: number) {
  if (line.startsWith("+ ")) {
    return (
      <div key={index} style={{ color: "rgb(56,166,96)" }}>
        {line}
      </div>
    );
  }
  if (line.startsWith("- ")) {
    return (
      <div key={index} style={{ color: "rgb(179,89,107)" }}>
        {line}
      </div>
    );
  }
  return (
    <div key={index} style={{ color: "rgb(153,153,153)" }}>
      {line}
    </div>
  );
}

export function ToolUseBlock({
  tool,
  args,
  result,
}: {
  tool: string;
  args: string;
  result?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="my-1 font-mono text-sm animate-tool-appear"
    >
      <button
        className="flex items-center gap-2 hover:opacity-80 transition-opacity w-full text-left"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        <span
          className="text-xs transition-transform duration-200"
          style={{
            color: "rgb(153,153,153)",
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          ▶
        </span>
        <span style={{ color: "rgb(215,119,87)" }}>{tool}</span>
        <span style={{ color: "rgb(100,100,100)" }} className="truncate">
          {args}
        </span>
      </button>
      {expanded && result && (
        <div className="mt-1 pl-5 text-xs leading-relaxed">
          {result.split("\n").map((line, i) => renderResultLine(line, i))}
        </div>
      )}
    </div>
  );
}
