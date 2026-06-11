"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CoffeeCanvas from "@/components/CoffeeCanvas";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import InteractiveMenu from "@/components/InteractiveMenu";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Dynamically calculate and adjust the scroll container height based on element heights
  useEffect(() => {
    const adjustHeights = () => {
      const scrollWrapper = scrollContainerRef.current;
      if (!scrollWrapper) return;

      const hero = scrollWrapper.querySelector(".hero-wrapper") as HTMLDivElement | null;
      const stories = scrollWrapper.querySelectorAll(".story-section");
      
      if (!hero || stories.length === 0) return;
      
      // Combined height of Hero + all Story sections
      let totalElementsHeight = hero.offsetHeight;
      stories.forEach((story) => {
        totalElementsHeight += (story as HTMLDivElement).offsetHeight;
      });
      
      // Calculate responsive buffer space at the bottom to ensure the last box isn't cut off
      const vh = window.innerHeight / 100;
      const bottomBuffer = window.innerWidth >= 768 ? 20 * vh : 10 * vh;
      
      const finalHeight = totalElementsHeight + bottomBuffer;
      scrollWrapper.style.height = `${finalHeight}px`;
    };

    // Run adjustments
    adjustHeights();
    window.addEventListener("resize", adjustHeights);

    // Run after a short delay to ensure fonts/images and dynamic layout rendering are finalized
    const timerId = setTimeout(adjustHeights, 450);

    return () => {
      window.removeEventListener("resize", adjustHeights);
      clearTimeout(timerId);
    };
  }, []);

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {!isLoaded && <Preloader progress={loaderProgress} />}
      </AnimatePresence>

      <main className="page-container">
        {/* Container for the scroll-linked canvas animation */}
        <div 
          ref={scrollContainerRef} 
          className="scroll-wrapper"
        >
          <CoffeeCanvas
            scrollContainerRef={scrollContainerRef}
            onProgress={setLoaderProgress}
            onComplete={() => setIsLoaded(true)}
          />
          <HeroSection />
          <StorySection />
        </div>

        {/* Content sections that scroll over the canvas */}
        <InteractiveMenu />
        <BrandStory />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
