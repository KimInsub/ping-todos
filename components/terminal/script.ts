import { Step } from "./types";

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
    type: "human-feedback",
    text: "1. The spacing between links is too cramped\n2. Logo needs more breathing room from edges\n3. CTA button feels too close to the last link\n4. Overall nav height could use more vertical padding",
  },
  {
    type: "assistant-text",
    text: "You're right — gaps are too tight. Fixing spacing.",
  },
  {
    type: "tool-use",
    tool: "Edit",
    args: "components/TopNav.tsx",
    result:
      '- <div className="flex items-center gap-2">\n+ <div className="max-w-6xl mx-auto px-4 h-14\n+   flex items-center justify-between">\n  ...\n- <div className="flex items-center gap-2">\n+ <div className="flex items-center gap-8">',
  },
  {
    type: "assistant-text",
    text: "Fixed — proper spacing with gap-8 and px-4 padding.",
  },
  {
    type: "todo",
    items: [
      { text: "Logo visible with proper spacing from edges", checked: true },
      { text: "Nav links (Features, How it Works, Pricing) evenly spaced", checked: true },
      { text: "CTA button aligned right with correct padding", checked: true },
      { text: "Nav is fixed to top and doesn't overlap content", checked: true },
    ],
  },
];
