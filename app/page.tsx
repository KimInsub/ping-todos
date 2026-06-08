"use client";

import { useState, useCallback } from "react";
import { Terminal } from "@/components/terminal/Terminal";
import { CarouselPreview } from "@/components/carousel/CarouselPreview";

export default function Home() {
  const [showCarousel, setShowCarousel] = useState(false);

  const handleStepComplete = useCallback((stepIndex: number) => {
    if (stepIndex === 0) {
      setShowCarousel(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16">
      <div className="flex gap-8 max-w-6xl w-full items-start justify-center">
        <div className="flex-1 max-w-2xl">
          <Terminal onStepComplete={handleStepComplete} />
        </div>
        <div className="w-[340px] shrink-0 flex items-start justify-center pt-16">
          <CarouselPreview visible={showCarousel} />
        </div>
      </div>
    </div>
  );
}
