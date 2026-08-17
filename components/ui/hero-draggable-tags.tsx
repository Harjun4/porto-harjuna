"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Database, Bot, Cpu, Code2 } from "lucide-react";

export function HeroDraggableTags() {
  const containerRef = useRef<HTMLDivElement>(null);

  const tags = [
    { text: "Python & Machine Learning", icon: Cpu, color: "from-purple-900/50 to-indigo-900/50 text-purple-200 border-purple-500/40" },
    { text: "SQL & Big Data", icon: Database, color: "from-cyan-900/50 to-blue-900/50 text-cyan-200 border-cyan-500/40" },
    { text: "Workflow Automation", icon: Bot, color: "from-emerald-900/50 to-teal-900/50 text-emerald-200 border-emerald-500/40" },
    { text: "Enterprise Architecture", icon: Code2, color: "from-amber-900/50 to-orange-900/50 text-amber-200 border-amber-500/40" },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto my-4 py-2 flex flex-wrap justify-center items-center gap-3 z-20">
      {tags.map((tag, idx) => {
        const IconComponent = tag.icon;
        return (
          <motion.div
            key={idx}
            drag
            dragConstraints={containerRef}
            dragElastic={0.25}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 0 }}
            animate={{
              y: [0, -6, 0, 6, 0],
            }}
            transition={{
              y: {
                duration: 4 + idx * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={`px-4 py-2 rounded-full bg-gradient-to-r ${tag.color} backdrop-blur-md border shadow-lg flex items-center gap-2 text-xs font-bold select-none cursor-grab active:cursor-grabbing hover:shadow-purple-500/20 transition-all`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span>{tag.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
