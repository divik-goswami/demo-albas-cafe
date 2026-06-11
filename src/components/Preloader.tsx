"use client";

import { motion } from "framer-motion";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  // Format percentage to always be 2 digits (e.g. 05, 45, 99) or 100
  const formattedProgress = Math.round(progress).toString().padStart(2, "0");

  return (
    <motion.div
      className="preloader-overlay"
      initial={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ 
        opacity: 0,
        filter: "blur(25px)", // Smooth blur out
        transition: { 
          duration: 0.5, // Faster fadeout
          ease: "easeOut",
          delay: 0.1 
        } 
      }}
    >
      <div className="preloader-content">
        <motion.h1 
          className="preloader-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Alba’s Cafe
        </motion.h1>
        
        <div className="preloader-bar-bg">
          <motion.div 
            className="preloader-bar-fill" 
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
        </div>
        
        <div style={{ overflow: "hidden", height: "24px" }}>
          <motion.div
            className="preloader-percentage"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {formattedProgress}%
          </motion.div>
        </div>
        
        <motion.p
          style={{ fontSize: "0.8rem", letterSpacing: "0.05em", marginTop: "1rem", color: "var(--brown-light)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4 }}
        >
          CURATING THE EXPERIENCE
        </motion.p>
      </div>
    </motion.div>
  );
}
