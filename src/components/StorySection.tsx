"use client";

import { motion } from "framer-motion";

interface StoryItem {
  num: string;
  title: string;
  text: string;
  align: "align-left" | "align-right" | "align-center";
}

export default function StorySection() {
  const stories: StoryItem[] = [
    {
      num: "01 / SOURCE",
      title: "The Green Bean",
      text: "We source organic, high-altitude arabica beans directly from sustainable cooperatives in Sidamo and Huehuetenango. Hand-sorted and wash-processed for pristine profile clarity.",
      align: "align-left",
    },
    {
      num: "02 / ROAST",
      title: "The Warm Profile",
      text: "Roasting is a delicate dance of thermodynamics. We roast in micro-batches, teasing out subtle notes of jasmine, stone fruit, and dark cocoa, balancing sweetness and acidity.",
      align: "align-right",
    },
    {
      num: "03 / EXTRACT",
      title: "The Nine Bars",
      text: "Extracted at precisely 93.5°C under 9 bars of pressure. We monitor flow rates and TDS to ensure every cup reveals the bean's true essence, resulting in a rich, buttery crema.",
      align: "align-left",
    },
  ];

  return (
    <div className="story-container">
      {stories.map((story) => {
        // Aligned left slides in from left, aligned right slides in from right
        const xOffset = story.align === "align-left" ? -60 : story.align === "align-right" ? 60 : 0;
        return (
          <div key={story.title} className={`story-section ${story.align}`}>
            <motion.div
              className="story-card"
              initial={{ opacity: 0, x: xOffset, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.8, ease: "easeOut" }
              }}
            >
              <span className="story-tag">{story.num}</span>
              <h3 className="story-heading">{story.title}</h3>
              <p className="story-text">{story.text}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
