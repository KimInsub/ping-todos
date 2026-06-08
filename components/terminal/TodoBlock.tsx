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
            className="text-sm font-mono text-neutral-400 animate-fade-in"
            style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
          >
            ☐ {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
