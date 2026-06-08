import { CSSProperties } from "react";
import { CardData } from "./cardData";

interface SwipeCardProps {
  card: CardData;
  isTop: boolean;
  style?: CSSProperties;
}

export function SwipeCard({ card, isTop, style }: SwipeCardProps) {
  return (
    <div
      className="absolute rounded-2xl overflow-hidden border border-[#333] shadow-xl"
      style={{
        width: 280,
        height: 380,
        backgroundColor: "#1a1a1a",
        ...style,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          height: 200,
          background: `linear-gradient(135deg, ${card.color}44, ${card.color}22)`,
        }}
      >
        <span className="text-7xl">{card.emoji}</span>
      </div>
      <div className="p-5">
        <h3 className="text-white text-lg font-semibold mb-2">{card.title}</h3>
        <p className="text-[#999] text-sm leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}
