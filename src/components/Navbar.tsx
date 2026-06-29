"use client";

import React from "react";
import { Play, CheckCircle2 } from "lucide-react";

interface NavbarProps {
  watchedCount: number;
  totalMovies: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenRecap: () => void;
  onOpenSystemDocs: () => void;
}

export default function Navbar({
  watchedCount,
  totalMovies,
  onOpenRecap,
  onOpenSystemDocs,
}: NavbarProps) {
  const progressPercentage = totalMovies > 0 ? Math.round((watchedCount / totalMovies) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-neutral-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Console Brand & Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-black text-lg tracking-tighter shadow-sm">
              X
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
                Avengers Timeline
              </h1>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider hidden sm:block">
                SYS // CHRONOLOGICAL LORE ARCHIVE
              </p>
            </div>
          </div>

          {/* Unobtrusive Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-neutral-400">
            <span className="text-white border-b-2 border-white pb-1 transition-all cursor-pointer">
              Timeline View
            </span>
            <span
              onClick={onOpenSystemDocs}
              className="hover:text-white transition-all cursor-pointer"
            >
              System Docs
            </span>
          </nav>
        </div>

        {/* Action Controls & Minimal Progress Tracker */}
        <div className="flex items-center gap-6">
          
          {/* Progress Tracker Pill */}
          <div className="hidden sm:flex flex-col gap-1.5 min-w-[140px]">
            <div className="flex items-center justify-between text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
              <span className="flex items-center gap-1 text-white">
                <CheckCircle2 className="w-3 h-3 text-white" /> Watched
              </span>
              <span>{watchedCount} / {totalMovies} ({progressPercentage}%)</span>
            </div>
            <div className="w-full bg-neutral-900 h-1.5 rounded-none border border-neutral-800 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Story Recap Auto-Play Mode Button */}
          <button
            onClick={onOpenRecap}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-neutral-900 text-white border border-neutral-700 hover:border-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm active:scale-95 cursor-pointer rounded-none"
            title="Auto-play timeline like a video playlist"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white" />
            <span>Story Recap</span>
          </button>

        </div>
      </div>
    </header>
  );
}
