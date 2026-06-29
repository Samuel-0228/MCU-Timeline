"use client";

import React, { useState, useEffect } from "react";
import { TimelineEntry } from "../data/mcuTimeline";
import { X, Play, Pause, SkipForward, SkipBack, Calendar } from "lucide-react";

interface StoryRecapModalProps {
  movies: TimelineEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryRecapModal({ movies, isOpen, onClose }: StoryRecapModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play timer: switch to next movie after 30 seconds if playing
  useEffect(() => {
    if (!isOpen || !isPlaying || movies.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 30000); // 30 seconds per slide/clip

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, movies.length]);

  if (!isOpen || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#050505] border border-neutral-700 rounded-none overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-black">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-white text-white text-xs font-bold uppercase tracking-widest rounded-none">
              <Play className="w-3.5 h-3.5 fill-current animate-pulse text-white" /> SYS PLAYLIST ARCHIVE
            </span>
            <span className="text-xs text-neutral-400 font-bold tracking-widest uppercase">
              ENTRY {currentIndex + 1} OF {movies.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-none bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-white text-neutral-400 hover:text-white transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#050505]">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Video Player */}
            <div className="w-full lg:w-3/5 aspect-video bg-neutral-900 shadow-2xl border border-neutral-800 flex-shrink-0 relative rounded-none">
              <iframe
                key={currentMovie.id}
                src={`https://www.youtube-nocookie.com/embed/${currentMovie.youtubeEmbedId}?autoplay=1&modestbranding=1&rel=0`}
                title={currentMovie.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Story Details */}
            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-2 text-xs font-black tracking-widest text-white bg-neutral-900 border border-neutral-700 px-3 py-1 uppercase rounded-none w-fit">
                <Calendar className="w-3.5 h-3.5 text-white" /> SYS YEAR: {currentMovie.chronologicalYear}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                {currentMovie.title}
              </h2>
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                {currentMovie.phase} {"//"} RELEASED {currentMovie.releaseYear}
              </div>
              <div className="space-y-2.5 pt-4 border-t border-neutral-850">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-none" /> STORYLINE DEEP RECAP
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal tracking-wide">
                  {currentMovie.summary}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Playlist Controls Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-neutral-800 bg-black">
          <div className="text-xs text-neutral-400 font-bold tracking-widest uppercase text-center sm:text-left">
            {isPlaying ? "AUTOPLAY: ACTIVE (ADVANCES EVERY 30S)" : "AUTOPLAY: PAUSED"}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-white text-white rounded-none text-xs font-bold tracking-widest uppercase transition-all active:scale-95 cursor-pointer"
            >
              <SkipBack className="w-4 h-4 text-white" /> PREVIOUS
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-none text-xs font-bold tracking-widest uppercase transition-all active:scale-95 cursor-pointer border ${
                isPlaying
                  ? "bg-white text-black border-white shadow-md font-black"
                  : "bg-black text-white border-neutral-700 hover:border-white"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current text-black" /> PAUSE AUTOPLAY
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-white" /> RESUME AUTOPLAY
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-white text-white rounded-none text-xs font-bold tracking-widest uppercase transition-all active:scale-95 cursor-pointer"
            >
              NEXT <SkipForward className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
