interface SwipeButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeButtons({ onSwipeLeft, onSwipeRight }: SwipeButtonsProps) {
  return (
    <div className="flex gap-6 justify-center mt-6">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSwipeLeft();
        }}
        className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl transition-transform hover:scale-110 active:scale-95"
        style={{
          borderColor: "var(--color-claude-error)",
          color: "var(--color-claude-error)",
          backgroundColor: "transparent",
        }}
        aria-label="Dislike"
      >
        ✕
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSwipeRight();
        }}
        className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl transition-transform hover:scale-110 active:scale-95"
        style={{
          borderColor: "var(--color-claude-success)",
          color: "var(--color-claude-success)",
          backgroundColor: "transparent",
        }}
        aria-label="Like"
      >
        ♥
      </button>
    </div>
  );
}
