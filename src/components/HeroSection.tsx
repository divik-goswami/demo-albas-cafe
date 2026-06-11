"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const lenis = window.lenisInstance;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleMobileScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    handleScrollTo(e, targetId);
    toggleMenu();
  };

  return (
    <section className="hero-wrapper">
      {/* Minimalist Top Navigation Bar */}
      <header className="hero-nav">
        <div className="nav-logo">Alba’s Cafe</div>
        
        {/* Desktop Links (hidden on mobile via CSS) */}
        <nav className="nav-links desktop-only">
          <a href="#menu" className="nav-link" onClick={(e) => handleScrollTo(e, "menu")}>Menu</a>
          <a href="#story" className="nav-link" onClick={(e) => handleScrollTo(e, "story")}>Story</a>
          <a href="#visit" className="nav-link" onClick={(e) => handleScrollTo(e, "visit")}>Visit</a>
        </nav>
 
        {/* Minimalist Coordinates (Desktop-Only) */}
        <div className="nav-coordinates desktop-only">
          12.9352° N, 77.6245° E
        </div>
 
        {/* Mobile Hamburger Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          <span className={`hamburger-bar ${isMenuOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${isMenuOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${isMenuOpen ? "open" : ""}`} />
        </button>
      </header>
 
      {/* Mobile Sidebar Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            {/* Sidebar Drawer */}
            <motion.div
              className="mobile-nav-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
            >
              <div className="mobile-sidebar-header">
                <span className="sidebar-logo">Alba’s Cafe</span>
                <button className="mobile-menu-close" onClick={toggleMenu} aria-label="Close menu">
                  ✕
                </button>
              </div>
 
              <nav className="mobile-sidebar-links">
                <a href="#menu" className="mobile-sidebar-link" onClick={(e) => handleMobileScrollTo(e, "menu")}>
                  Menu
                </a>
                <a href="#story" className="mobile-sidebar-link" onClick={(e) => handleMobileScrollTo(e, "story")}>
                  Story
                </a>
                <a href="#visit" className="mobile-sidebar-link" onClick={(e) => handleMobileScrollTo(e, "visit")}>
                  Visit
                </a>
              </nav>
 
              <div className="mobile-sidebar-footer">
                <span className="sidebar-footer-eyebrow">Est. 2024</span>
                <p>Curating the physics of coffee extraction.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
 
      {/* Bottom-Left Anchored Content */}
      <div className="hero-content-bottom-left">
        <motion.div
          className="hero-text-group"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hero-eyebrow">Est. 2024  •  93.5°C Roasting Lab</span>
          
          <h1 className="hero-title-new">
            <em>Alba’s Cafe</em>
          </h1>
          
          <p className="hero-tagline-new">
            Where vintage aesthetics meet the physics of roasting & extraction.
          </p>
          
          <div className="hero-ctas">
            <a href="#menu" className="cta-button-solid" onClick={(e) => handleScrollTo(e, "menu")}>
              View Menu
            </a>
            <a href="#story" className="cta-button-ghost" onClick={(e) => handleScrollTo(e, "story")}>
              Our Story
            </a>
          </div>
        </motion.div>
      </div>
 
      {/* Bottom-Right Vertical Scroll Indicator */}
      <div className="hero-scroll-indicator-right">
        <span className="scroll-label">Scroll</span>
        <motion.div 
          className="scroll-line"
          animate={{ scaleY: [0.8, 1.2, 0.8], originY: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
 
    </section>
  );
}
