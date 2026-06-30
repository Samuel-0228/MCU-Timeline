"use client";

import React, { useEffect, useState } from "react";
import { TimelineEntry } from "../data/mcuTimeline";
import { Calendar, Pause, Play, SkipBack, SkipForward, X } from "lucide-react";

interface StoryRecapModalProps {
  movies: TimelineEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryRecapModal({ movies, isOpen, onClose }: StoryRecapModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isOpen || !isPlaying || movies.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 30000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, movies.length]);

  if (!isOpen || movies.length === 0) return null;

  const safeCurrentIndex = Math.min(currentIndex, movies.length - 1);
  const currentMovie = movies[safeCurrentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/30 p-4 backdrop-blur-md">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-3 py-1.5 text-xs font-black text-neutral-950">
              <Play className="h-3.5 w-3.5 fill-current" />
              Story Recap
            </span>
            <span className="text-xs font-bold text-neutral-500">
              Entry {safeCurrentIndex + 1} of {movies.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#e5e7eb] p-2 text-neutral-500 transition hover:border-neutral-950 hover:text-neutral-950"
            title="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-[#eeeeee] bg-neutral-100">
              <iframe
                key={currentMovie.id}
                src={`https://www.youtube-nocookie.com/embed/${currentMovie.youtubeEmbedId}?autoplay=1&modestbranding=1&rel=0`}
                title={currentMovie.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs font-black text-neutral-600">
                <Calendar className="h-3.5 w-3.5 text-lime-500" />
                {currentMovie.chronologicalYear}
              </div>
              <h2 className="text-3xl font-black leading-tight text-neutral-950">{currentMovie.title}</h2>
              <p className="text-xs font-black uppercase text-neutral-400">
                {currentMovie.phase} / Released {currentMovie.releaseYear}
              </p>
              <p className="text-sm leading-6 text-neutral-600">{currentMovie.summary}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#eeeeee] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-bold text-neutral-500">
            {isPlaying ? "Autoplay advances every 30 seconds" : "Autoplay paused"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)}
              className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-4 py-2 text-xs font-black text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
            >
              <SkipBack className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black transition ${
                isPlaying ? "bg-lime-300 text-neutral-950 hover:bg-lime-400" : "border border-neutral-950 text-neutral-950"
              }`}
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
              {isPlaying ? "Pause" : "Resume"}
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % movies.length)}
              className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-4 py-2 text-xs font-black text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
            >
              Next
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
