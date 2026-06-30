"use client";

import React from "react";
import { ArrowUpDown, Filter, Search, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCharacter: string;
  setSelectedCharacter: (c: string) => void;
  selectedPhase: string;
  setSelectedPhase: (p: string) => void;
  sortOrder: "chronological" | "release";
  setSortOrder: (o: "chronological" | "release") => void;
  allCharacters: string[];
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCharacter,
  setSelectedCharacter,
  selectedPhase,
  setSelectedPhase,
  sortOrder,
  setSortOrder,
  allCharacters,
}: FilterBarProps) {
  const phases = ["All", "Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"];

  return (
    <section className="border-b border-[#eeeeee] bg-white px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search timeline, heroes, events, or trailers"
            className="h-12 w-full rounded-full border border-[#e5e7eb] bg-white pl-12 pr-5 text-sm font-semibold text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[210px]">
            <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <select
              value={selectedCharacter}
              onChange={(e) => setSelectedCharacter(e.target.value)}
              className="h-12 w-full appearance-none rounded-full border border-[#e5e7eb] bg-white pl-11 pr-10 text-xs font-black text-neutral-800 outline-none transition focus:border-neutral-950"
            >
              <option value="All">All heroes</option>
              {allCharacters.map((char) => (
                <option key={char} value={char}>
                  {char}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === "chronological" ? "release" : "chronological")}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 text-xs font-black text-neutral-800 transition hover:border-neutral-950"
            title="Switch sorting order"
          >
            <ArrowUpDown className="h-4 w-4 text-lime-500" />
            {sortOrder === "chronological" ? "Chronological" : "Release order"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
        <span className="shrink-0 text-xs font-black uppercase text-neutral-400">Browse by</span>
        {phases.map((phase) => {
          const isActive = selectedPhase === phase;
          return (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
                isActive
                  ? "border-lime-300 bg-lime-300 text-neutral-950"
                  : "border-[#e5e7eb] bg-white text-neutral-500 hover:border-neutral-300 hover:text-neutral-950"
              }`}
            >
              {phase}
            </button>
          );
        })}
      </div>
    </section>
  );
}
