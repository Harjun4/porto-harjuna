"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export function InteractiveLanyard({ fotoUrl }: { fotoUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for drag position and 3D tilt
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Smooth springs for pendulum physics recoil and sway
  const springX = useSpring(dragX, { stiffness: 260, damping: 12 });
  const springY = useSpring(dragY, { stiffness: 260, damping: 12 });

  // 3D rotation transforms based on drag offset (React Bits style 3D tilt)
  const rotateY = useTransform(springX, [-150, 150], [-25, 25]);
  const rotateX = useTransform(springY, [-150, 150], [25, -25]);
  const rotateZ = useTransform(springX, [-150, 150], [-12, 12]);

  // Dynamic Solid Black Thick Elastic Rope path calculation from top anchor (X: 110px, Y: -65px)
  const ropePath = useTransform(
    [springX, springY],
    ([x, y]: number[]) => {
      const topX = 110; // Center anchor below top navbar
      const topY = -65;
      const cardX = 110 + x;
      const cardY = 28 + y;

      const controlY = topY + (cardY - topY) * 0.52;
      return `M ${topX} ${topY} Q ${topX + x * 0.15} ${controlY}, ${cardX} ${cardY}`;
    }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-[220px] h-[260px] sm:h-[300px] md:h-[360px] flex flex-col items-center justify-start select-none overflow-visible pointer-events-none mx-auto touch-pan-y"
    >
      {/* Dynamic Thick Black Elastic Rope SVG (React Bits 3D Rope Style) */}
      <svg className="absolute -top-20 left-0 w-full h-[calc(100%+80px)] pointer-events-none z-10 overflow-visible">
        <defs>
          <linearGradient id="blackRopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="40%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <filter id="ropeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Outer Black Elastic Rope */}
        <motion.path
          d={ropePath}
          fill="none"
          stroke="url(#blackRopeGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          filter="url(#ropeShadow)"
        />

        {/* Inner Solid Core Line */}
        <motion.path
          d={ropePath}
          fill="none"
          stroke="#1e293b"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Anchor Ring directly under Navbar */}
      <div className="absolute -top-18 left-[110px] -translate-x-1/2 flex flex-col items-center z-20 pointer-events-auto">
        <div className="w-6 h-6 rounded-full border-3 border-slate-700 bg-slate-900 shadow-xl flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"></div>
        </div>
        <div className="w-2 h-2.5 bg-slate-950 -mt-0.5"></div>
      </div>

      {/* Draggable 3D Full Portrait ID Card */}
      <motion.div
        drag
        dragConstraints={{ left: -80, right: 80, top: -15, bottom: 65 }}
        dragElastic={0.35}
        dragSnapToOrigin
        style={{
          x: springX,
          y: springY,
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        onDrag={(_, info) => {
          dragX.set(info.offset.x);
          dragY.set(info.offset.y);
        }}
        onDragEnd={() => {
          dragX.set(0);
          dragY.set(0);
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ cursor: "grabbing" }}
        className="relative mt-6 md:mt-8 w-[175px] sm:w-[185px] md:w-[205px] h-[265px] sm:h-[285px] md:h-[320px] rounded-2xl bg-slate-950 border-3 border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between cursor-grab z-30 backdrop-blur-xl group pointer-events-auto overflow-hidden scale-80 sm:scale-90 md:scale-100 transition-transform origin-top"
      >
        {/* Rubber Stopper & Metallic Ring Buckle Attachment at Top Hole */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
          {/* Punched Card Hole Ring */}
          <div className="w-5 h-2.5 rounded-full bg-slate-950 border border-slate-700 shadow-inner flex items-center justify-center">
            {/* Metallic Clasp Ring */}
            <div className="w-3 h-3 rounded-full border-2 border-slate-300 bg-gradient-to-tr from-slate-500 via-slate-200 to-white shadow-md"></div>
          </div>
          {/* Black Rubber Stopper Knot */}
          <div className="w-4 h-2 bg-slate-900 rounded-sm border border-slate-700 -mt-1 shadow-sm"></div>
        </div>

        {/* FULL PORTRAIT PHOTO SECTION (Spans 70% of Card Height) */}
        <div className="relative w-full h-[180px] sm:h-[195px] md:h-[220px] overflow-hidden bg-slate-900 border-b border-purple-500/30">
          <img
            src={fotoUrl}
            alt="Harjuna Adi Putra Wicaksana"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-950"></div>

          {/* Card Top Branding Badge */}
          <div className="absolute top-3 left-2 right-2 flex justify-between items-center z-10">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-purple-500/40 text-[8px] font-black text-purple-300 tracking-wider">
              <ShieldCheck className="w-3 h-3 text-purple-400" />
              <span>MERCU BUANA</span>
            </div>
            <span className="text-[7.5px] font-bold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-1.5 py-0.5 rounded border border-emerald-500/40">
              OFFICIAL
            </span>
          </div>

          {/* Floating IPK Chip on Photo */}
          <div className="absolute bottom-2 right-2 bg-purple-950/80 backdrop-blur-md border border-purple-500/40 px-2 py-0.5 rounded-md flex items-center gap-1 text-[8.5px] font-extrabold text-purple-200 shadow-lg">
            <Sparkles className="w-2.5 h-2.5 text-purple-400" />
            <span>IPK 3.84</span>
          </div>
        </div>

        {/* BOTTOM DETAILS FOOTER (Name, Role, Barcode) */}
        <div className="p-2.5 bg-gradient-to-b from-[#111322] to-[#0a0c16] flex flex-col justify-between flex-1 text-left">
          <div>
            <h4 className="text-[11px] sm:text-xs md:text-sm font-black text-white tracking-wide leading-tight truncate">
              HARJUNA ADI PUTRA W.
            </h4>
            <p className="text-[9px] sm:text-[9.5px] font-bold text-purple-300 truncate mt-0.5">
              BI Analyst & Fullstack
            </p>
            <p className="text-[8px] text-slate-400 font-medium truncate">
              S1 Sistem Informasi UMB
            </p>
          </div>

          {/* Barcode Strip */}
          <div className="pt-1 border-t border-purple-500/20 mt-1 flex justify-between items-center opacity-85">
            <div className="flex items-end h-2.5 gap-0.5">
              {[8, 5, 10, 6, 12, 5, 8, 10, 6, 14, 5, 8, 12].map((h, i) => (
                <div
                  key={i}
                  className="bg-slate-300 rounded-xs"
                  style={{ width: `${(i % 3) + 1.2}px`, height: `${h}px` }}
                ></div>
              ))}
            </div>
            <span className="text-[6.5px] font-mono text-purple-300 font-bold tracking-wider">
              HAPW-2026
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
