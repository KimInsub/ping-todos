import { Step } from "./types";

export const SCRIPT: Step[] = [
  {
    type: "user-input",
    text: "Build a Tinder-like swipe carousel",
  },
  {
    type: "assistant-text",
    text: "I'll build a swipe carousel component. Let me start by reading the project structure.",
  },
  {
    type: "tool-use",
    tool: "Read",
    args: "app/page.tsx",
    result: "// Next.js app entry point (10 lines)",
  },
  {
    type: "assistant-text",
    text: "Got it — I'll create the card data, swipe component, and wire up animations.",
  },
  {
    type: "tool-use",
    tool: "Edit",
    args: "components/carousel/SwipeCard.tsx",
    result:
      '+ import { CardData } from "./cardData"\n+ \n+ export function SwipeCard({ card, isTop, style }) {\n+   return (\n+     <div className="absolute rounded-2xl border border-[#333]"\n+       style={{ width: 280, height: 380, ...style }}>\n+       <div style={{ background: `linear-gradient(...)` }}>\n+         <span className="text-7xl">{card.emoji}</span>\n+       </div>\n+       <div className="p-5">\n+         <h3>{card.title}</h3>\n+         <p>{card.description}</p>\n+       </div>\n+     </div>\n+   )\n+ }',
  },
  {
    type: "tool-use",
    tool: "Bash",
    args: "npm run build",
    result: "✓ Compiled successfully\n✓ Build completed in 4.2s",
  },
  {
    type: "assistant-text",
    text: "The swipe carousel is complete — card stack with depth scaling, swipe animations, and like/dislike buttons.",
  },
  {
    type: "todo",
    items: [
      { text: "Swipe right on a card → card flies off, next card appears" },
      { text: "Swipe left on a card → same behavior, opposite direction" },
      { text: "Tap Like / Dislike buttons → triggers matching swipe" },
      { text: "Reach last card → shows empty-state message" },
    ],
  },
];
