"use client";

import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="brand-story-section" id="story">
      {/* Scribbly Curvy Divider */}
      <div className="section-divider-wrapper">
        <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="wavy-divider">
          <defs>
            <filter id="liquid-wobble">
              <feTurbulence type="turbulence" numOctaves="1" result="noise">
                <animate 
                  attributeName="baseFrequency" 
                  dur="15s" 
                  values="0.005 0.03; 0.008 0.05; 0.005 0.03" 
                  repeatCount="indefinite" 
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <path 
            filter="url(#liquid-wobble)"
            d="M0 12 C 120 2, 240 22, 360 12 C 480 2, 600 22, 720 12 C 840 2, 960 22, 1080 12 C 1200 2, 1320 22, 1440 12" 
            stroke="#c95c64" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            opacity="0.7" 
          />
        </svg>
      </div>

      <div className="brand-story-container">
        {/* Text Column */}
        <motion.div 
          className="brand-story-content"
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="brand-story-tag">Our Story</span>
          <h2 className="brand-story-title">Crafting Alba’s Cafe</h2>
          <p className="brand-story-text">
            Alba’s Cafe was born out of a shared passion for two things: the warm, tactile charm of retro aesthetics and the precise science of roasting and brewing the perfect cup. Located in Koramangala, Bengaluru, we treat coffee not just as a daily ritual, but as an absolute sensory science.
          </p>
          <p className="brand-story-text">
            From the deliberate geometry of our pour-overs to the exact thermodynamics of our micro-batch roasts, every variable is carefully calculated. We invite you to step into our sanctuary—a space curated to highlight the unique terroirs of our beans and celebrate the community we serve.
          </p>
        </motion.div>

        {/* Image Column */}
        <motion.div 
          className="brand-story-image-wrapper"
          initial={{ opacity: 0, x: 70, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="/drinks/about_story.png" 
            alt="Warm modern minimalist interior of Alba's Cafe in Koramangala, Bengaluru" 
            className="brand-story-image"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
}
