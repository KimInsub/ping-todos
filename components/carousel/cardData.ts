export interface CardData {
  title: string;
  description: string;
  emoji: string;
  color: string;
}

export const CARDS: CardData[] = [
  {
    title: "Alex Chen",
    description: "Full-stack developer who loves hiking and building side projects on weekends.",
    emoji: "🧑‍💻",
    color: "#6366f1",
  },
  {
    title: "Jordan Park",
    description: "Designer by day, musician by night. Always looking for creative collaborations.",
    emoji: "🎨",
    color: "#ec4899",
  },
  {
    title: "Sam Rivera",
    description: "Data scientist with a passion for cooking and sustainable living.",
    emoji: "📊",
    color: "#14b8a6",
  },
  {
    title: "Taylor Kim",
    description: "Startup founder, coffee enthusiast, and amateur photographer.",
    emoji: "🚀",
    color: "#f59e0b",
  },
  {
    title: "Morgan Lee",
    description: "UX researcher who travels the world and writes about human behavior.",
    emoji: "✈️",
    color: "#8b5cf6",
  },
];
