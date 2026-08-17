"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logoImg from "@/image/HRJN Logo.jpg";

// Pixel-Perfect 2-Layer Text Roll Animation Component
const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="group relative h-5 overflow-hidden flex flex-col justify-start select-none whitespace-nowrap cursor-pointer"
    >
      {/* Layer 1: Default State Text */}
      <span className="h-5 leading-5 flex items-center justify-center text-xs sm:text-sm font-semibold text-slate-300 transition-transform duration-300 ease-out group-hover:-translate-y-full block whitespace-nowrap">
        {children}
      </span>
      {/* Layer 2: Hover State Replacement Text (Bright Purple) */}
      <span className="h-5 leading-5 flex items-center justify-center text-xs sm:text-sm font-bold text-purple-400 transition-transform duration-300 ease-out group-hover:-translate-y-full block whitespace-nowrap">
        {children}
      </span>
    </a>
  );
};

export function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinksData = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 sm:px-8 py-3 h-14 rounded-full bg-[#0c0f17]/85 backdrop-blur-xl border border-white/10 shadow-2xl w-[90%] max-w-4xl sm:min-w-[700px] whitespace-nowrap transition-all duration-300">
      {/* Left: Brand Logo */}
      <a href="#home" className="flex items-center gap-2.5 text-xs font-black tracking-wider text-white whitespace-nowrap select-none group">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-500/40 shadow-sm group-hover:scale-105 transition-transform bg-slate-900 flex-shrink-0 flex items-center justify-center">
          <Image
            src={logoImg}
            alt="HRJN Logo"
            fill
            className="object-cover"
          />
        </div>
        <span className="hidden sm:inline-block font-extrabold text-white tracking-wide group-hover:text-purple-300 transition-colors">
          HARJUNA
        </span>
      </a>

      {/* Center: Desktop Horizontal Links with Smooth 2-Layer Text-Roll */}
      <nav className="hidden md:flex items-center gap-8 whitespace-nowrap select-none">
        {navLinksData.map((link) => (
          <AnimatedNavLink key={link.href} href={link.href}>
            {link.label}
          </AnimatedNavLink>
        ))}
      </nav>

      {/* Right: Single Capsule CTA Button */}
      <div className="hidden md:flex items-center select-none">
        <a
          href="#contact"
          className="rounded-full px-5 py-1.5 text-xs font-extrabold bg-white text-slate-950 hover:bg-slate-200 transition-all duration-200 shadow-md whitespace-nowrap hover:scale-105 active:scale-95"
        >
          Kontak
        </a>
      </div>

      {/* Mobile Hamburger Toggle */}
      <button
        className="md:hidden flex items-center justify-center w-8 h-8 text-slate-300 hover:text-white focus:outline-none transition-transform active:scale-90 select-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* Mobile Menu Dropdown Card */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0c0f17]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col items-center gap-4 text-center md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 w-full text-sm font-bold">
            {navLinksData.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-purple-400 py-1.5 transition-colors border-b border-white/5 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full rounded-full py-2 text-xs font-extrabold bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-md"
          >
            Kontak
          </a>
        </div>
      )}
    </header>
  );
}
