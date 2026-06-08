"use client";

import { useState, useCallback } from "react";
import { CARDS } from "./cardData";
import { SwipeCard } from "./SwipeCard";
import { SwipeButtons } from "./SwipeButtons";

interface CarouselPreviewProps {
  visible: boolean;
}

export function CarouselPreview({ visible }: CarouselPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<
    "left" | "right" | null
  >(null);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (swipeDirection !== null || currentIndex >= CARDS.length) return;
      setSwipeDirection(direction);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
      }, 300);
    },
    [swipeDirection, currentIndex]
  );

  if (!visible) return null;

  const remaining = CARDS.length - currentIndex;

  return (
    <div
      className="flex flex-col items-center"
      style={{ animation: "carousel-enter 600ms ease-out" }}
    >
      <div className="relative" style={{ width: 280, height: 380 }}>
        {remaining <= 0 ? (
          <div className="w-full h-full rounded-2xl border border-[#333] flex items-center justify-center bg-[#1a1a1a]">
            <p className="text-[#666] text-sm">No more cards</p>
          </div>
        ) : (
          <>
            {Array.from({ length: Math.min(3, remaining) })
              .map((_, i) => {
                const cardIndex = currentIndex + i;
                const isTop = i === 0;
                const depth = i;

                let animStyle: React.CSSProperties = {
                  zIndex: 10 - depth,
                  transform: `scale(${1 - depth * 0.05}) translateY(${depth * 8}px)`,
                  opacity: 1 - depth * 0.15,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                };

                if (isTop && swipeDirection) {
                  const x = swipeDirection === "left" ? -300 : 300;
                  const rot = swipeDirection === "left" ? -15 : 15;
                  animStyle = {
                    ...animStyle,
                    animation: `card-swipe-${swipeDirection} 300ms ease-out forwards`,
                  };
                }

                return (
                  <SwipeCard
                    key={cardIndex}
                    card={CARDS[cardIndex]}
                    isTop={isTop}
                    style={animStyle}
                  />
                );
              })
              .reverse()}
          </>
        )}
      </div>
      <SwipeButtons
        onSwipeLeft={() => handleSwipe("left")}
        onSwipeRight={() => handleSwipe("right")}
      />
    </div>
  );
}
