"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TimelineEntry } from "../data/mcuTimeline";
import {
  BadgeCheck,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Circle,
  Download,
  ExternalLink,
  Film,
  Hexagon,
  Play,
  Shield,
  Sparkle,
  Star,
} from "lucide-react";

interface MovieCardProps {
  movie: TimelineEntry;
  isWatched: boolean;
  onToggleWatched: (id: string) => void;
  onMouseEnter?: () => void;
}

const previewIcons = [Shield, Star, Circle, Hexagon, Sparkle, BadgeCheck];

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
      className="group flex h-full flex-col rounded-lg border border-[#e5e7eb] bg-white p-4 transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
    >
      

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase text-neutral-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-lime-500" />
              {movie.chronologicalYear}
            </span>
            <span>{movie.phase}</span>
          </div>
          <h3 className="mt-2 text-lg font-black leading-tight text-neutral-950">{movie.title}</h3>
        </div>
        <button
          onClick={() => onToggleWatched(movie.id)}
          className={`shrink-0 rounded-full border p-2 transition ${
            isWatched
              ? "border-lime-300 bg-lime-300 text-neutral-950"
              : "border-[#e5e7eb] bg-white text-neutral-400 hover:border-neutral-950 hover:text-neutral-950"
          }`}
          title={isWatched ? "Marked watched" : "Mark watched"}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>

      <p className="mt-3 line-clamp-4 text-sm leading-6 text-neutral-600">{movie.summary}</p>

      <div className="mt-4 overflow-hidden rounded-md border border-[#eeeeee] bg-neutral-100">
        <div className="relative aspect-video">
          {!isVideoLoaded ? (
            <button
              onClick={() => setIsVideoLoaded(true)}
              className="absolute inset-0 flex w-full items-center justify-center overflow-hidden bg-neutral-950 text-white"
            >
              <Image
                src={`https://img.youtube.com/vi/${movie.youtubeEmbedId}/hqdefault.jpg`}
                alt={movie.title}
                fill
                unoptimized
                className="object-cover opacity-70 transition group-hover:scale-105"
              />
              <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-neutral-950 shadow-sm">
                <Play className="h-4 w-4 fill-current" />
                Play trailer
              </span>
            </button>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.youtubeEmbedId}?autoplay=1&modestbranding=1&rel=0`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-[#eeeeee] pt-4">
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-xs font-black uppercase text-neutral-950">
              <Film className="h-4 w-4 text-lime-500" />
              Key universe events
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              {movie.keyEvents.map((event) => (
                <li key={event} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" />
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.characters.map((char) => (
              <span key={char} className="rounded-full border border-[#e5e7eb] px-3 py-1 text-[11px] font-bold text-neutral-600">
                {char}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-3 border-t border-[#eeeeee] pt-4">
        <div className="flex items-center justify-between text-xs font-bold text-neutral-500">
          <span>Released {movie.releaseYear}</span>
          <span>{movie.characters.length} heroes</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`https://www.goojara.to/search.php?q=${encodeURIComponent(movie.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#e5e7eb] px-3 py-2 text-xs font-black text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
            title={`Stream or Download ${movie.title} on Goojara.to`}
          >
            <Download className="h-3.5 w-3.5 text-lime-500" />
            Goojara
          </a>
          <a
            href={`https://t4tsa.cc/?s=${encodeURIComponent(movie.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#e5e7eb] px-3 py-2 text-xs font-black text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
            title={`Stream or Download ${movie.title} on T4TSA.cc`}
          >
            <ExternalLink className="h-3.5 w-3.5 text-lime-500" />
            T4TSA
          </a>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center justify-center rounded-full border border-[#e5e7eb] p-2 text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
            title={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </article>
  );
}
