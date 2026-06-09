"use client";

import { TodoItem } from "./types";

export function TodoBlock({ items }: { items: TodoItem[] }) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-bold text-orange-400">Test plan</span>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div
            key={i}
            className={`text-sm font-mono animate-fade-in ${item.checked ? "text-green-400" : "text-neutral-400"}`}
            style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
          >
            {item.checked ? "☑" : "☐"} {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
