"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface CoffeeCanvasProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

export default function CoffeeCanvas({
  scrollContainerRef,
  onProgress,
  onComplete,
}: CoffeeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const totalFrames = 205;

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Aspect-ratio cover calculation for drawing image on canvas
  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement
  ) => {
    if (!img) return;
    
    const canvas = ctx.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const imgWidth = img.width;
    const imgHeight = img.height;
    
    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;
    
    let sx = 0, sy = 0, sWidth = imgWidth, sHeight = imgHeight;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      sHeight = imgWidth / canvasRatio;
      // Shift crop box upward (0.25 instead of 0.5 center) to show the top of the glass
      sy = (imgHeight - sHeight) * 0.25;
    } else {
      // Canvas is taller than image
      sWidth = imgHeight * canvasRatio;
      sx = (imgWidth - sWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete) {
      drawImageCover(ctx, img);
    }
  };

  // Preloading sequence
  useEffect(() => {
    let isMounted = true;
    let loadedCriticalCount = 0;
    const criticalFramesCount = 15; // Only block loading on the first 15 frames for instant start
    const images: HTMLImageElement[] = [];

    // Pre-create all Image objects
    for (let i = 1; i <= totalFrames; i++) {
      images.push(new Image());
    }
    imagesRef.current = images;

    const handleCriticalImageLoad = () => {
      if (!isMounted) return;
      loadedCriticalCount++;
      const progressPercent = Math.min(100, (loadedCriticalCount / criticalFramesCount) * 100);
      onProgress(progressPercent);

      if (loadedCriticalCount === criticalFramesCount) {
        onComplete();
        // Render initial frame once preloading completes
        setTimeout(() => {
          drawFrame(0);
        }, 100);

        // Load all remaining frames in the background
        loadRemainingFrames();
      }
    };

    const handleCriticalImageError = (errImg: string) => {
      console.warn(`Failed to load critical frame: ${errImg}`);
      handleCriticalImageLoad(); // Count as loaded to prevent stuck preloader
    };

    // Load critical frames first
    for (let i = 1; i <= criticalFramesCount; i++) {
      const img = images[i - 1];
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${paddedIndex}.webp`;
      img.onload = handleCriticalImageLoad;
      img.onerror = () => handleCriticalImageError(img.src);
    }

    // Lazy load the remaining frames in the background sequentially to avoid blocking the network and CPU main thread
    const loadRemainingFrames = () => {
      let currentIndex = criticalFramesCount + 1;

      const loadNext = () => {
        if (!isMounted || currentIndex > totalFrames) return;

        const img = images[currentIndex - 1];
        const paddedIndex = String(currentIndex).padStart(3, "0");

        img.onload = () => {
          if (!isMounted) return;
          
          // If the user is currently viewing this frame, redraw to show it
          const currentDrawIndex = Math.min(
            Math.max(0, Math.round(currentFrameRef.current)),
            totalFrames - 1
          );
          if (currentDrawIndex === currentIndex - 1) {
            drawFrame(currentDrawIndex);
          }

          currentIndex++;
          // Stagger the next frame load by 15ms to give the rendering thread breathing room
          setTimeout(loadNext, 15);
        };

        img.onerror = () => {
          console.warn(`Failed to load background frame: ${img.src}`);
          currentIndex++;
          setTimeout(loadNext, 15);
        };

        img.src = `/frames/ezgif-frame-${paddedIndex}.webp`;
      };

      // Start sequential preloading
      loadNext();
    };

    // Resize handler to adjust canvas bounds with DPR support
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      
      // Cap DPR to 1.5 on mobile to avoid rendering excessive pixels
      let dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        dpr = Math.min(1.5, dpr);
      }
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Redraw current frame on resize
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    // Initial size setup
    handleResize();

    // Media query listener to cache mobile state
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    let isMobile = mediaQuery.matches;
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Damped render loop for continuous frame interpolation limited to 24 FPS
    let rafId: number | null = null;
    let lastTime = 0; // Initialize to 0 to sync dynamically on the first loop frame
    const fps = 24;
    const fpsInterval = 1000 / fps;
    let isIntersecting = true;

    const renderLoop = (timestamp: number) => {
      if (!isMounted || !isIntersecting) return;

      rafId = requestAnimationFrame(renderLoop);

      if (lastTime === 0) {
        lastTime = timestamp; // Sync clocks using the same requestAnimationFrame time origin
      }

      const elapsed = timestamp - lastTime;

      // If enough time has passed, render the frame
      if (elapsed >= fpsInterval) {
        // Adjust lastTime and compensate for potential drifts
        lastTime = timestamp - (elapsed % fpsInterval);

        const target = targetFrameRef.current;
        let current = currentFrameRef.current;
        
        // Damping step
        const diff = target - current;
        if (Math.abs(diff) < 0.01) {
          current = target;
        } else {
          // Damped easing factor (0.15 on mobile, 0.06 on desktop) to slow down and smoothen the rotation
          const easingFactor = isMobile ? 0.15 : 0.06;
          current += diff * easingFactor;
        }
        
        if (current !== currentFrameRef.current) {
          currentFrameRef.current = current;
          
          // Calculate rounded drawing frame index
          const drawIndex = Math.min(
            Math.max(0, Math.round(current)),
            totalFrames - 1
          );
          
          // Only trigger canvas draw if the integer frame changes
          if (drawIndex !== lastDrawnFrameRef.current) {
            lastDrawnFrameRef.current = drawIndex;
            drawFrame(drawIndex);
          }
        }
      }
    };
    
    const startLoop = () => {
      if (!rafId) {
        lastTime = 0;
        rafId = requestAnimationFrame(renderLoop);
      }
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // IntersectionObserver to pause loop when container is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    startLoop();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      observer.disconnect();
      stopLoop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen to Framer Motion scroll updates and set target frame index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Optimization: Skip tracking if the scroll container is out of view
    if (latest < -0.05 || latest > 1.05) {
      return;
    }

    // Clamp scroll progress and calculate target frame index (float value for sub-frame easing)
    const clamped = Math.max(0, Math.min(1.0, latest));
    targetFrameRef.current = clamped * (totalFrames - 1);
  });

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="canvas-element" />
      <div className="canvas-tint" />
    </div>
  );
}
