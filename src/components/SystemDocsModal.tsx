"use client";

import React from "react";
import { X, Shield, Zap, Terminal, Database, Play, ExternalLink } from "lucide-react";

interface SystemDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemDocsModal({ isOpen, onClose }: SystemDocsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#050505] border border-neutral-700 rounded-none overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-black">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white text-white text-xs font-bold uppercase tracking-widest rounded-none">
              <Terminal className="w-3.5 h-3.5 text-white" /> SYS DOCS // V0.1.0
            </span>
            <span className="text-xs text-neutral-400 font-bold tracking-widest uppercase">
              ARCHIVE DOCUMENTATION & LORE PROTOCOLS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-none bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-white text-neutral-400 hover:text-white transition-all cursor-pointer"
            title="Close system docs"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10 bg-[#050505] text-neutral-300">
          
          {/* Section 1: Executive Overview */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Database className="w-5 h-5 text-white" /> 1. MATRIX OVERVIEW & CHRONOLOGY
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed font-normal tracking-wide text-neutral-300">
              The **Avengers Timeline** is a high-performance chronological lore archive engineered in a strict monochrome console aesthetic. Unlike traditional release-order catalogs, this matrix aligns every Marvel Cinematic Universe (MCU) event in absolute chronological sequence—initiating in 1943 (*Captain America: The First Avenger*) and stretching into the distant cosmic future of 2026 (*Guardians of the Galaxy Vol. 3*).
            </p>
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-none text-xs font-medium tracking-wide text-neutral-400 leading-relaxed">
              **Multiverse Exceptions**: Projects operating outside traditional space-time (*Loki Season 1 & 2*) or bridging alternate cinematic dimensions (*Spider-Man: No Way Home*) are cataloged via specialized multiversal tags and alternate timeline indicators.
            </div>
          </section>

          {/* Section 2: Foundational Perspectives */}
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Shield className="w-5 h-5 text-white" /> 2. FOUNDATIONAL PERSPECTIVES
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed font-normal tracking-wide text-neutral-300">
              Upon initialization, the console prompts operatives to experience the timeline through two legendary philosophical frameworks, stored persistently in client local storage (`mcu_user_perspective`):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-black border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black tracking-widest text-white bg-blue-950 border border-blue-500 px-3 py-1 uppercase rounded-none w-fit">
                  <Shield className="w-3.5 h-3.5 text-blue-400 fill-current" /> CAPTAIN AMERICA
                </div>
                <h3 className="text-lg font-black text-white uppercase">Honor • Legacy • Leadership</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Focuses on moral integrity, unwavering duty, and historical legacy. Features vintage grain filtration, diffused deep blue lighting, and classic tactical overlays.
                </p>
              </div>

              <div className="p-6 bg-black border border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black tracking-widest text-white bg-red-950 border border-yellow-500 px-3 py-1 uppercase rounded-none w-fit">
                  <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current" /> IRON MAN
                </div>
                <h3 className="text-lg font-black text-white uppercase">Tech • Innovation • Futurism</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Focuses on raw genius, technological advancement, and futuristic vision. Features metallic dark backgrounds, high-contrast neon gold accents, and clean futuristic glow effects.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: External Streaming Protocols */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2 border-b border-neutral-800 pb-3">
              <ExternalLink className="w-5 h-5 text-white" /> 3. FULL MOVIE STREAMING PROTOCOLS
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed font-normal tracking-wide text-neutral-300">
              Every timeline log features integrated dynamic query handlers allowing operatives to securely connect to external media archives for full movie streaming and downloading:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 tracking-wide">
              <li className="p-3 bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                <span className="text-white font-black select-none">&gt;</span>
                <div>
                  <strong className="text-white">Goojara.to Search Gateway</strong>: Dynamically parses the active title and passes parameter queries to the Goojara indexing engine (`https://www.goojara.to/search.php?q=[title]`).
                </div>
              </li>
              <li className="p-3 bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                <span className="text-white font-black select-none">&gt;</span>
                <div>
                  <strong className="text-white">T4TSA.cc Search Gateway</strong>: Connects directly to the T4TSA streaming catalog via direct query mapping (`https://t4tsa.cc/?s=[title]`).
                </div>
              </li>
            </ul>
          </section>

          {/* Section 4: Automated Story Recap Mode */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Play className="w-5 h-5 text-white" /> 4. CINEMATIC STORY RECAP PLAYLIST
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed font-normal tracking-wide text-neutral-300">
              The console features an automated overlay modal designed for hands-free study and lore revision. When activated via the **Story Recap** trigger, the system loads verified official YouTube embeds and cycles between consecutive timeline logs every 30 seconds. Manual override controls allow for play/pause toggle and rapid skipping.
            </p>
          </section>

          {/* Section 5: Technical Architecture */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Terminal className="w-5 h-5 text-white" /> 5. SYSTEM ARCHITECTURE & ENGINE METRICS
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-black border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Framework</div>
                <div className="text-xs sm:text-sm font-black text-white tracking-wider">Next.js 16.2.9</div>
              </div>
              <div className="p-4 bg-black border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Compiler</div>
                <div className="text-xs sm:text-sm font-black text-white tracking-wider">Turbopack</div>
              </div>
              <div className="p-4 bg-black border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">3D Engine</div>
                <div className="text-xs sm:text-sm font-black text-white tracking-wider">Three.js / Fiber</div>
              </div>
              <div className="p-4 bg-black border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Styling</div>
                <div className="text-xs sm:text-sm font-black text-white tracking-wider">Strict Monochrome</div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Bar */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-black text-center sm:text-left text-xs text-neutral-500 font-bold tracking-widest uppercase">
          SYS // ALL DOCUMENTATION ENDPOINTS VERIFIED & ACTIVE IN LORE MATRIX.
        </div>

      </div>
    </div>
  );
}
