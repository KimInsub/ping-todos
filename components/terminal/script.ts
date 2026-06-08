import { Step } from "./types";

export const SCRIPT: Step[] = [
  {
    type: "user-input",
    text: "Build a Tinder-like swipe carousel for browsing profiles",
  },
  {
    type: "assistant-text",
    text: "I'll build a swipe carousel component for browsing profiles. Let me start by reading the project structure.",
  },
  {
    type: "tool-use",
    tool: "Read",
    args: "app/page.tsx",
    result: "// Next.js app entry point (10 lines)",
  },
  {
    type: "tool-use",
    tool: "Read",
    args: "package.json",
    result: '{ "dependencies": { "next": "15.3.2", "react": "19.0", "tailwindcss": "4.x" } }',
  },
  {
    type: "assistant-text",
    text: "Got it. I'll create the card data, swipe card component, buttons, and the main carousel. Let me set up the files.",
  },
  {
    type: "tool-use",
    tool: "Edit",
    args: "components/carousel/cardData.ts",
    result:
      '+ export interface CardData {\n+   title: string\n+   description: string\n+   emoji: string\n+   color: string\n+ }\n+ \n+ export const CARDS: CardData[] = [\n+   { title: "Alex Chen", emoji: "🧑‍💻", color: "#6366f1",\n+     description: "Full-stack dev who loves hiking..." },\n+   { title: "Jordan Park", emoji: "🎨", color: "#ec4899",\n+     description: "Designer by day, musician by night..." },\n+   ...\n+ ]',
  },
  {
    type: "tool-use",
    tool: "Edit",
    args: "components/carousel/SwipeCard.tsx",
    result:
      '+ import { CardData } from "./cardData"\n+ \n+ export function SwipeCard({ card, isTop, style }) {\n+   return (\n+     <div className="absolute rounded-2xl border border-[#333]"\n+       style={{ width: 280, height: 380, ...style }}>\n+       <div style={{ background: `linear-gradient(...)` }}>\n+         <span className="text-7xl">{card.emoji}</span>\n+       </div>\n+       <div className="p-5">\n+         <h3>{card.title}</h3>\n+         <p>{card.description}</p>\n+       </div>\n+     </div>\n+   )\n+ }',
  },
  {
    type: "assistant-text",
    text: "Card component is ready. Now I'll wire up the swipe logic with animated transitions.",
  },
  {
    type: "tool-use",
    tool: "Edit",
    args: "components/carousel/CarouselPreview.tsx",
    result:
      '+ export function CarouselPreview({ visible }) {\n+   const [currentIndex, setCurrentIndex] = useState(0)\n+   const [swipeDirection, setSwipeDirection] = useState(null)\n+ \n+   const handleSwipe = (dir) => {\n+     setSwipeDirection(dir)\n+     setTimeout(() => {\n+       setCurrentIndex(prev => prev + 1)\n+       setSwipeDirection(null)\n+     }, 300)\n+   }\n+ \n+   // Renders stack of 3 cards with depth offset\n+   // Top card gets swipe animation\n+ }',
  },
  {
    type: "tool-use",
    tool: "Edit",
    args: "app/globals.css",
    result:
      "+ @keyframes card-swipe-left {\n+   to { transform: translateX(-300px) rotate(-15deg); opacity: 0 }\n+ }\n+ @keyframes card-swipe-right {\n+   to { transform: translateX(300px) rotate(15deg); opacity: 0 }\n+ }\n+ @keyframes carousel-enter {\n+   from { opacity: 0; transform: translateY(20px) }\n+   to { opacity: 1; transform: translateY(0) }\n+ }",
  },
  {
    type: "tool-use",
    tool: "Bash",
    args: "npm run build",
    result:
      "✓ Compiled successfully\n✓ Collecting page data\n✓ Generating static pages (3/3)\n✓ Finalizing page optimization\n\nRoute (app)       Size\n┌ ○ /             5.1 kB\n└ ○ /favicon.ico  0 B\n\n✓ Build completed",
  },
  {
    type: "assistant-text",
    text: "The swipe carousel is complete. Here's what I built:\n\n- **Card stack** with 3 visible cards and depth-based scaling\n- **Swipe animations** — cards fly left or right with rotation\n- **Like/dislike buttons** with hover and press feedback\n- **Two-column layout** — terminal on the left, live carousel preview on the right",
  },
];
