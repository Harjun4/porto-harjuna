"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface MarqueeTickerProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  "DATA SCIENCE",
  "MACHINE LEARNING",
  "ENTERPRISE ARCHITECTURE",
  "FULLSTACK DEV",
  "CONTINUOUS LEARNING",
];

export function MarqueeTicker({
  items = DEFAULT_ITEMS,
  speed = 40,
  className = "",
}: MarqueeTickerProps) {
  const [isPaused, setIsPaused] = useState(false);
  const tickerText = items.join(" • ") + " • ";
  const repeatedText = Array(4).fill(tickerText).join("");

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`w-full overflow-hidden whitespace-nowrap bg-[#131926]/80 border-y border-purple-500/20 py-2.5 backdrop-blur-md shadow-lg select-none cursor-pointer ${className}`}
    >
      <div className="flex w-max">
        <motion.div
          className="flex items-center text-xs font-medium tracking-widest text-purple-300/90 uppercase font-mono"
          animate={isPaused ? false : { x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: speed,
            repeat: Infinity,
          }}
        >
          <span className="pr-4">{repeatedText}</span>
          <span className="pr-4">{repeatedText}</span>
        </motion.div>
      </div>
    </div>
  );
}
