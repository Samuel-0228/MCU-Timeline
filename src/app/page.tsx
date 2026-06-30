"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Archive,
  BadgeCheck,
  BookOpen,
  Check,
  Clapperboard,
  Compass,
  Download,
  Folder,
  Grid3X3,
  Layers3,
  PlayCircle,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { mcuTimeline } from "../data/mcuTimeline";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import StoryRecapModal from "../components/StoryRecapModal";
import SystemDocsModal from "../components/SystemDocsModal";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [sortOrder, setSortOrder] = useState<"chronological" | "release">("chronological");
  const [watchedList, setWatchedList] = useState<string[]>([]);
  const [isRecapOpen, setIsRecapOpen] = useState(false);
  const [isSystemDocsOpen, setIsSystemDocsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = window.setTimeout(() => {
      const storedWatched = localStorage.getItem("mcu_watched_list");
      if (storedWatched) {
        try {
          setWatchedList(JSON.parse(storedWatched));
        } catch (error) {
          console.error(error);
        }
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleToggleWatched = (id: string) => {
    setWatchedList((prev) => {
      const newList = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("mcu_watched_list", JSON.stringify(newList));
      }
      return newList;
    });
  };

  const allCharacters = useMemo(() => {
    const chars = new Set<string>();
    mcuTimeline.forEach((movie) => {
      movie.characters.forEach((character) => chars.add(character));
    });
    return Array.from(chars).sort();
  }, []);

  const phaseCounts = useMemo(() => {
    return mcuTimeline.reduce<Record<string, number>>((acc, movie) => {
      acc[movie.phase] = (acc[movie.phase] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const filteredMovies = useMemo(() => {
    return mcuTimeline
      .filter((movie) => {
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          const matchTitle = movie.title.toLowerCase().includes(query);
          const matchSummary = movie.summary.toLowerCase().includes(query);
          const matchEvent = movie.keyEvents.some((event) => event.toLowerCase().includes(query));
          if (!matchTitle && !matchSummary && !matchEvent) return false;
        }

        if (selectedCharacter !== "All" && !movie.characters.includes(selectedCharacter)) {
          return false;
        }

        if (selectedPhase !== "All" && movie.phase !== selectedPhase) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "release") {
          return a.releaseYear - b.releaseYear;
        }
        return 0;
      });
  }, [searchQuery, selectedCharacter, selectedPhase, sortOrder]);

  const uniquePhases = Object.keys(phaseCounts).sort();
  const watchedPercent = mcuTimeline.length > 0 ? Math.round((watchedList.length / mcuTimeline.length) * 100) : 0;
  const popularCharacters = allCharacters.slice(0, 12);

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <Navbar
        watchedCount={watchedList.length}
        totalMovies={mcuTimeline.length}
        isDarkMode={false}
        toggleDarkMode={() => undefined}
        onOpenRecap={() => setIsRecapOpen(true)}
        onOpenSystemDocs={() => setIsSystemDocsOpen(true)}
      />

      <div className="flex min-h-[calc(100vh-80px)]">
        <aside className="hidden w-72 shrink-0 border-r border-[#e5e7eb] bg-[#fafafa] lg:flex lg:flex-col">
          <div className="border-b border-[#eeeeee] p-5">
            <div className="rounded-lg bg-lime-300 p-4 text-neutral-950">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/75">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase">Active archive</p>
                  <h2 className="text-lg font-black">MCU Timeline</h2>
                </div>
              </div>
            </div>

            <nav className="mt-5 space-y-1 text-sm font-bold">
              <button className="flex w-full items-center gap-3 rounded-lg bg-lime-300 px-3 py-3 text-left text-neutral-950">
                <Grid3X3 className="h-4 w-4" />
                Timeline dashboard
              </button>
              <button onClick={() => setIsRecapOpen(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-neutral-600 transition hover:bg-white hover:text-neutral-950">
                <PlayCircle className="h-4 w-4" />
                Story recap
              </button>
              <button onClick={() => setIsSystemDocsOpen(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-neutral-600 transition hover:bg-white hover:text-neutral-950">
                <BookOpen className="h-4 w-4" />
                Fan guide
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("mcu_user_perspective");
                    localStorage.removeItem("hero_choice");
                  }
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-neutral-600 transition hover:bg-white hover:text-neutral-950"
              >
                <RotateCcw className="h-4 w-4" />
                Reset vote
              </button>
            </nav>
          </div>

          <div className="border-b border-[#eeeeee] px-5">
            <div className="flex items-center gap-5 text-xs font-black text-neutral-500">
              <button className="border-b-2 border-neutral-950 py-4 text-neutral-950">Sets</button>
              <button className="py-4 transition hover:text-neutral-950">Styles</button>
              <button className="py-4 transition hover:text-neutral-950">Themes</button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <p className="mb-3 text-xs font-black uppercase text-neutral-400">Timeline folders</p>
            <div className="space-y-1">
              {uniquePhases.map((phase) => (
                <button
                  key={phase}
                  onClick={() => setSelectedPhase(phase)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                    selectedPhase === phase ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-600 hover:bg-white hover:text-neutral-950"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Folder className="h-4 w-4 text-neutral-400" />
                    {phase}
                  </span>
                  <span className="text-xs text-neutral-400">{phaseCounts[phase]}</span>
                </button>
              ))}
            </div>

            <p className="mb-3 mt-7 text-xs font-black uppercase text-neutral-400">Hero folders</p>
            <div className="space-y-1">
              {popularCharacters.map((character) => (
                <button
                  key={character}
                  onClick={() => setSelectedCharacter(character)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition ${
                    selectedCharacter === character ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-600 hover:bg-white hover:text-neutral-950"
                  }`}
                >
                  <Folder className="h-4 w-4 shrink-0 text-neutral-400" />
                  <span className="truncate">{character}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
            selectedPhase={selectedPhase}
            setSelectedPhase={setSelectedPhase}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            allCharacters={allCharacters}
          />

          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <section className="grid gap-8 border-b border-[#eeeeee] pb-10 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs font-black text-neutral-600">
                  <Sparkles className="h-3.5 w-3.5 text-lime-500" />
                  Chronological fan archive
                </div>
                <h1 className="max-w-4xl text-4xl font-black leading-tight text-neutral-950 sm:text-5xl">
                  Watch the Avengers saga in MCU timeline order.
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-bold text-neutral-600">
                  <span className="inline-flex items-center gap-2">
                    <Archive className="h-4 w-4 text-lime-500" />
                    {mcuTimeline.length} titles
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Layers3 className="h-4 w-4 text-lime-500" />
                    {uniquePhases.length} phases
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

                <ul className="mt-7 grid gap-3 text-sm font-semibold text-neutral-700 sm:grid-cols-2">
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" />
                    Follow the MCU from Steve Rogers in 1943 through the multiverse era.
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" />
                    Play trailers and story recaps directly from each timeline card.
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" />
                    Filter by phase, hero, release order, or key event text.
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" />
                    Keep track of watched entries and jump to fan download searches.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Clapperboard, title: "Trailer Library", subtitle: `${filteredMovies.length} matching trailer cards` },
                  { icon: Download, title: "Watch / Download", subtitle: "Goojara and T4TSA links stay attached" },
                  { icon: Compass, title: "Timeline Mode", subtitle: sortOrder === "chronological" ? "Chronological order active" : "Release order active" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-lg border border-[#e5e7eb] bg-white p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-lime-300 text-neutral-950">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-neutral-950">{item.title}</h3>
                      <p className="text-sm font-semibold text-neutral-500">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-8">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-3xl font-black text-neutral-950">Timeline assets</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                    Browse the current MCU archive using the original site entries, summaries, trailers, hero tags, and watch/download links.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-black text-neutral-500">
                  <span>Browse by</span>
                  <button onClick={() => setSelectedPhase("All")} className="transition hover:text-neutral-950">All</button>
                  <button onClick={() => setSortOrder("chronological")} className="transition hover:text-neutral-950">Chronology</button>
                  <button onClick={() => setSortOrder("release")} className="transition hover:text-neutral-950">Release</button>
                </div>
              </div>

              {filteredMovies.length === 0 ? (
                <div className="rounded-lg border border-[#e5e7eb] bg-white p-12 text-center">
                  <Search className="mx-auto h-8 w-8 text-lime-500" />
                  <h3 className="mt-4 text-xl font-black text-neutral-950">No timeline entries found</h3>
                  <p className="mt-2 text-sm text-neutral-500">Adjust the search, phase, or hero filter to bring the archive back into view.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isWatched={watchedList.includes(movie.id)}
                      onToggleWatched={handleToggleWatched}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </div>

      <StoryRecapModal movies={filteredMovies} isOpen={isRecapOpen} onClose={() => setIsRecapOpen(false)} />
      <SystemDocsModal isOpen={isSystemDocsOpen} onClose={() => setIsSystemDocsOpen(false)} />
    </main>
  );
}
