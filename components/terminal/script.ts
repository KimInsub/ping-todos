import { Step } from "./types";

const WORKERS = [
  { name: "Sarah D.", color: "#E879F9" },
  { name: "Mike T.", color: "#60A5FA" },
  { name: "Jess L.", color: "#34D399" },
  { name: "Ryan K.", color: "#FBBF24" },
  { name: "Ana M.", color: "#F87171" },
];

export const SCRIPT: Step[] = [
  {
    type: "user-input",
    text: "Create a TopNav for our website",
  },
  {
    type: "assistant-text",
    text: "I'll build a TopNav. Let me check the layout.",
  },
  {
    type: "tool-use",
    tool: "Read",
    args: "app/layout.tsx",
    result: "// RootLayout with <html>, <body>, {children} (12 lines)",
  },
  {
    type: "tool-use",
    tool: "Edit",
    args: "components/TopNav.tsx",
    result:
      '+ export function TopNav() {\n+   return (\n+     <nav className="fixed top-0 bg-black/80 border-b">\n+       <div className="flex items-center gap-2">\n+         <span className="font-mono">ping-todos</span>\n+         <a href="#features">Features</a>\n+         <a href="#pricing">Pricing</a>\n+         <a className="bg-orange-500 px-2 py-0.5\n+           rounded">Get Started</a>\n+       </div>\n+     </nav>\n+   )\n+ }',
  },
  {
    type: "tool-use",
    tool: "Bash",
    args: "npm run build",
    result: "✓ Compiled successfully\n✓ Build completed in 3.8s",
  },
  {
    type: "assistant-text",
    text: "The TopNav is live — logo, links, and CTA wired up.",
  },
  {
    type: "user-input",
    text: "/ping-humans take a look at the nav spacing",
  },
  {
    type: "pinging-humans",
    workers: WORKERS,
  },
  {
    type: "receiving-feedback",
  },
  {
    type: "human-feedback",
    items: [
      "1. The spacing between links is too cramped",
      "2. Logo needs more breathing room from edges",
      "3. CTA button feels too close to the last link",
      "4. Overall nav height could use more vertical padding",
    ],
  },
  {
    type: "assistant-text",
    text: "Points 1–3 share one root cause: the container has no horizontal padding and gap-2 is too tight. Fixing the real issue.",
    holdAfter: 1000,
  },
  {
    type: "tool-use",
    tool: "Edit",
    args: "components/TopNav.tsx",
    result:
      '- <div className="flex items-center gap-2">\n+ <div className="max-w-6xl mx-auto px-4 h-14\n+   flex items-center justify-between">\n  ...\n- <div className="flex items-center gap-2">\n+ <div className="flex items-center gap-8">',
    holdAfter: 1800,
  },
  {
    type: "assistant-text",
    text: "Fixed — proper spacing with gap-8 and px-4 padding.",
  },
];
