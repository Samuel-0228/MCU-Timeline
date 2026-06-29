"use client";

import React from "react";
import { Search, ArrowUpDown, Filter } from "lucide-react";

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
    <div className="w-full bg-black/80 backdrop-blur-md border border-neutral-800 hover:border-neutral-700 rounded-none p-6 mb-10 transition-all duration-300 shadow-2xl relative z-30">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-neutral-400">
            <Search className="w-4 h-4 text-white" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH LORE ARCHIVES, EVENTS, OR LOGS..."
            className="w-full pl-12 pr-4 py-3 bg-neutral-900/90 border border-neutral-800 focus:border-white rounded-none text-white text-xs font-bold tracking-widest uppercase focus:outline-none transition-all placeholder:text-neutral-500"
          />
        </div>

        {/* Filters & Sorting Controls */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Character Filter Dropdown */}
          <div className="relative flex items-center min-w-[180px] flex-1 sm:flex-initial">
            <span className="absolute left-4 text-white pointer-events-none">
              <Filter className="w-3.5 h-3.5" />
            </span>
            <select
              value={selectedCharacter}
              onChange={(e) => setSelectedCharacter(e.target.value)}
              className="w-full pl-10 pr-8 py-3 bg-neutral-900/90 border border-neutral-800 focus:border-white rounded-none text-white text-xs font-bold tracking-widest uppercase focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="All">ALL HEROES</option>
              {allCharacters.map((char) => (
                <option key={char} value={char}>
                  {char.toUpperCase()}
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white text-[10px] font-black">
              ▼
            </span>
          </div>

          {/* Chronological vs Release Order Toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === "chronological" ? "release" : "chronological")}
            className="flex items-center justify-center gap-2.5 px-5 py-3 bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-white rounded-none text-white text-xs font-bold tracking-widest uppercase transition-all shadow-sm active:scale-95 cursor-pointer flex-1 sm:flex-initial"
            title="Switch sorting order"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-white" />
            <span>{sortOrder === "chronological" ? "CHRONOLOGICAL" : "RELEASE ORDER"}</span>
          </button>

        </div>
      </div>

      {/* Phase Filter Button Group */}
      <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500 hidden sm:block mr-4">
          PHASE FILTER //
        </span>
        {phases.map((phase) => {
          const isActive = selectedPhase === phase;
          return (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`px-5 py-2 rounded-none text-xs font-bold tracking-widest transition-all cursor-pointer whitespace-nowrap border ${
                isActive
                  ? "bg-white text-black border-white shadow-md"
                  : "bg-black text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
              }`}
            >
              {phase.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
