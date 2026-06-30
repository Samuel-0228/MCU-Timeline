"use client";

import React from "react";
import { BookOpen, CheckCircle2, Clapperboard, FileText, LogIn, Search, Sparkles } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full border-b border-[#e5e7eb] bg-white/95 backdrop-blur-xl">
      <div className="flex min-h-20 items-center gap-4 px-4 sm:px-6 xl:px-8">
        <div className="flex min-w-[220px] items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-900 bg-neutral-950 text-sm font-black text-white">
            A
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-black uppercase text-neutral-950">Avengers Timeline</h1>
            <p className="text-[11px] font-semibold text-neutral-500">MCU viewing dashboard</p>
          </div>
        </div>

        <div className="hidden items-center rounded-full border border-[#e5e7eb] bg-neutral-50 p-1 text-xs font-bold text-neutral-500 lg:flex">
          <button className="rounded-full bg-white px-4 py-2 text-neutral-950 shadow-sm">Timeline</button>
          <button onClick={onOpenRecap} className="rounded-full px-4 py-2 transition hover:text-neutral-950">
            Trailers
          </button>
          <button onClick={onOpenSystemDocs} className="rounded-full px-4 py-2 transition hover:text-neutral-950">
            Docs
          </button>
        </div>

        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <div className="h-12 rounded-full border border-[#e5e7eb] bg-white pl-12 pr-5 text-sm font-medium text-neutral-400 shadow-[0_1px_0_rgba(15,23,42,0.02)] flex items-center">
            Search movies, heroes, phases...
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs font-bold text-neutral-600 sm:flex">
            <CheckCircle2 className="h-4 w-4 text-lime-500" />
            {watchedCount}/{totalMovies} watched
          </div>
          <div className="hidden h-9 w-24 overflow-hidden rounded-full bg-neutral-100 sm:block">
            <div className="h-full rounded-full bg-lime-300 transition-all" style={{ width: `${progressPercentage}%` }} />
          </div>
          <button
            onClick={onOpenRecap}
            className="hidden items-center gap-2 rounded-full bg-lime-300 px-4 py-2.5 text-xs font-black text-neutral-950 transition hover:bg-lime-400 xl:flex"
          >
            <Sparkles className="h-4 w-4" />
            Story Recap
          </button>
          <button
            onClick={onOpenSystemDocs}
            className="hidden rounded-full border border-[#e5e7eb] bg-white p-2.5 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-950 sm:inline-flex"
            title="Open guide"
          >
            <FileText className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-white px-4 py-2.5 text-xs font-black text-neutral-950 transition hover:bg-neutral-950 hover:text-white">
            <LogIn className="h-4 w-4" />
            Log in
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto border-t border-[#eeeeee] px-4 py-2 text-xs font-bold text-neutral-500 sm:px-6 xl:hidden">
        <button onClick={onOpenRecap} className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-3 py-2">
          <Clapperboard className="h-3.5 w-3.5" />
          Story Recap
        </button>
        <button onClick={onOpenSystemDocs} className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-3 py-2">
          <BookOpen className="h-3.5 w-3.5" />
          System Docs
        </button>
      </div>
    </header>
  );
}
