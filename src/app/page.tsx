"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { mcuTimeline } from "../data/mcuTimeline";
import { Archive, Layers3, Users, BadgeCheck, Check, Clapperboard, Download, Compass, Shield } from "lucide-react";

export default function GlobalLandingPage() {
  const [watchedList, setWatchedList] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedWatched = localStorage.getItem("mcu_watched_list");
    if (storedWatched) {
      try {
        setWatchedList(JSON.parse(storedWatched));
      } catch (error) {}
    }
  }, []);

  const allCharacters = useMemo(() => {
    const chars = new Set<string>();
    mcuTimeline.forEach((movie) => movie.characters.forEach((c) => chars.add(c)));
    return Array.from(chars);
  }, []);

  const phaseCounts = useMemo(() => {
    const counts = new Set<string>();
    mcuTimeline.forEach(m => counts.add(m.phase));
    return counts.size;
  }, []);

  const watchedPercent = mcuTimeline.length > 0 ? Math.round((watchedList.length / mcuTimeline.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-950 font-sans selection:bg-lime-300 selection:text-neutral-950">
      
      {/* Minimalist Top Bar */}
      <header className="w-full border-b border-[#e5e7eb] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-900 bg-neutral-950 text-sm font-black text-white">
              A
            </div>
            <div className="leading-tight">
              <h1 className="text-sm font-black uppercase text-neutral-950">Avengers Timeline</h1>
              <p className="text-[11px] font-semibold text-neutral-500">MCU viewing dashboard</p>
            </div>
          </div>
          
          <Link href="/timeline" className="rounded-full bg-lime-300 px-6 py-2.5 text-xs font-black text-neutral-950 transition hover:bg-lime-400 border border-transparent shadow-sm">
            Enter Timeline
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs font-black text-neutral-600">
              <Shield className="h-3.5 w-3.5 text-lime-500" />
              Chronological fan archive
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-black leading-none text-neutral-950 tracking-tight">
              Watch the Avengers saga in MCU timeline order.
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-neutral-600 bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-sm">
              <span className="inline-flex items-center gap-2">
                <Archive className="h-4 w-4 text-lime-500" />
                {mcuTimeline.length} titles
              </span>
              <span className="inline-flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-lime-500" />
                {phaseCounts} phases
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-lime-500" />
                {allCharacters.length} heroes
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-lime-500" />
                {watchedPercent}% watched
              </span>
            </div>

            <ul className="grid gap-4 text-base font-bold text-neutral-700 sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime-500" />
                Follow the MCU from Steve Rogers in 1943 through the multiverse era.
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime-500" />
                Play trailers and story recaps directly from each timeline card.
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime-500" />
                Filter by phase, hero, release order, or key event text.
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime-500" />
                Keep track of watched entries and jump to fan download searches.
              </li>
            </ul>

            <div className="pt-6">
              <Link href="/timeline" className="inline-flex items-center gap-3 rounded-xl bg-neutral-950 text-white px-8 py-5 text-sm font-black transition hover:bg-neutral-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform">
                Go to the Timeline Dashboard
                <Compass className="w-5 h-5 text-lime-300" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-neutral-950">
                <Clapperboard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-neutral-950">Trailer Library</h3>
                <p className="text-sm font-bold text-neutral-500 mt-1">Watch HD trailers attached to every title card directly in the app.</p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-neutral-950">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-neutral-950">Watch / Download</h3>
                <p className="text-sm font-bold text-neutral-500 mt-1">Goojara and T4TSA links stay attached to your progress.</p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-neutral-950">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-neutral-950">Timeline Mode</h3>
                <p className="text-sm font-bold text-neutral-500 mt-1">View movies in precise chronological order or by release date.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
