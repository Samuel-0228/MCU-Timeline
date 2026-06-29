"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TimelineEntry } from "../data/mcuTimeline";
import { Calendar, ChevronDown, ChevronUp, Check, Play, ExternalLink, Download } from "lucide-react";

interface MovieCardProps {
  movie: TimelineEntry;
  isWatched: boolean;
  onToggleWatched: (id: string) => void;
  onMouseEnter?: () => void;
}

export default function MovieCard({
  movie,
  isWatched,
  onToggleWatched,
  onMouseEnter,
}: MovieCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <article
      onMouseEnter={onMouseEnter}
      className="w-full bg-[#050505] border border-neutral-800 hover:border-neutral-500 rounded-none p-6 sm:p-8 transition-all duration-300 shadow-2xl relative z-10 group"
    >
      {/* Background Subtle Shift Header Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800 group-hover:bg-white transition-colors duration-300" />

      <div className="flex flex-col lg:flex-row gap-8 items-start pt-2">
        
        {/* Left Column: Embedded YouTube Video / Thumbnail */}
        <div className="w-full lg:w-5/12 aspect-video bg-neutral-900 border border-neutral-800 relative flex-shrink-0 shadow-xl overflow-hidden rounded-none">
          {!isVideoLoaded ? (
            <div
              onClick={() => setIsVideoLoaded(true)}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 group/video cursor-pointer"
            >
              {/* Fallback YouTube High Quality Thumbnail using Next Image */}
              <Image
                src={`https://img.youtube.com/vi/${movie.youtubeEmbedId}/hqdefault.jpg`}
                alt={movie.title}
                fill
                unoptimized
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/video:opacity-60 transition-opacity duration-300"
              />
              <div className="relative z-10 p-4 bg-black border border-white text-white rounded-none flex items-center gap-2 group-hover/video:scale-105 transition-transform duration-300 shadow-lg">
                <Play className="w-4 h-4 fill-current text-white" />
                <span className="text-xs font-bold tracking-widest uppercase">
                  INITIALIZE RECAP //
                </span>
              </div>
              <span className="relative z-10 text-[10px] text-neutral-400 font-bold tracking-widest uppercase mt-3 bg-black/80 px-2 py-1 border border-neutral-800">
                OFFICIAL SYSTEM LOG • {movie.releaseYear}
              </span>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.youtubeEmbedId}?autoplay=1&modestbranding=1&rel=0`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>

        {/* Right Column: Console Details & Summary */}
        <div className="flex-1 flex flex-col justify-between w-full space-y-6">
          
          {/* Top Meta Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-widest text-white bg-neutral-900 border border-neutral-700 px-3 py-1 uppercase rounded-none">
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>SYS YEAR: {movie.chronologicalYear}</span>
              </div>

              <div className="text-xs font-black text-neutral-400 tracking-widest uppercase">
                {movie.phase} {"//"} RELEASED {movie.releaseYear}
              </div>
            </div>

            {/* Bold Uppercase Heading */}
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              {movie.title}
            </h2>

            {/* Concise Compact Body Text */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal tracking-wide">
              {movie.summary}
            </p>
          </div>

          {/* Collapsible Key Events & Characters Section */}
          {isExpanded && (
            <div className="pt-6 border-t border-neutral-800 space-y-6 animate-fadeIn">
              
              {/* Key Timeline Events */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-none" />
                  KEY UNIVERSE EVENTS
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 font-medium tracking-wide">
                  {movie.keyEvents.map((ev, i) => (
                    <li key={i} className="bg-neutral-900/60 border border-neutral-850 p-2.5 rounded-none flex items-start gap-2">
                      <span className="text-neutral-500 font-bold select-none">&gt;</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Characters Involved */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-none" />
                  OPERATIVE HEROES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.characters.map((char, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-neutral-900 border border-neutral-750 text-[11px] font-bold tracking-widest text-neutral-300 uppercase rounded-none"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Action Controls & Stream Buttons Footer */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Stream / Download Full Movie Links */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-white" /> WATCH / DOWNLOAD //
              </span>
              <a
                href={`https://www.goojara.to/search.php?q=${encodeURIComponent(movie.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-black hover:bg-neutral-900 text-white border border-neutral-700 hover:border-white text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer rounded-none shadow-sm"
                title={`Stream or Download ${movie.title} on Goojara.to`}
              >
                <ExternalLink className="w-3 h-3 text-white" />
                <span>GOOJARA.TO</span>
              </a>

              <a
                href={`https://t4tsa.cc/?s=${encodeURIComponent(movie.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-black hover:bg-neutral-900 text-white border border-neutral-700 hover:border-white text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer rounded-none shadow-sm"
                title={`Stream or Download ${movie.title} on T4TSA.cc`}
              >
                <ExternalLink className="w-3 h-3 text-white" />
                <span>T4TSA.CC</span>
              </a>
            </div>

            {/* Watched and Expand Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-850">
              {/* Minimal Watched Button */}
              <button
                onClick={() => onToggleWatched(movie.id)}
                className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer rounded-none ${
                  isWatched
                    ? "bg-white text-black border-white shadow-md font-black"
                    : "bg-black text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
                }`}
              >
                <Check className={`w-3.5 h-3.5 ${isWatched ? "text-black stroke-[3]" : "text-neutral-400"}`} />
                <span>{isWatched ? "WATCHED" : "MARK WATCHED"}</span>
              </button>

              {/* Expand / Collapse Toggle Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-neutral-900 text-white border border-neutral-700 hover:border-white text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer rounded-none"
              >
                <span>{isExpanded ? "COLLAPSE" : "EXPAND LOGS"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-white" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </article>
  );
}
