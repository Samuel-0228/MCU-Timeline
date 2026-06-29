"use client";

import React, { useState, useEffect, useMemo } from "react";
import { mcuTimeline } from "../data/mcuTimeline";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import StoryRecapModal from "../components/StoryRecapModal";
import SystemDocsModal from "../components/SystemDocsModal";
import CosmicBackground from "../components/CosmicBackground";
import IntroScreen from "../components/IntroScreen";
import { Shield, Zap, RotateCcw } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [sortOrder, setSortOrder] = useState<"chronological" | "release">("chronological");
  
  // Watched list state stored in localStorage
  const [watchedList, setWatchedList] = useState<string[]>([]);
  
  // Dark mode toggle state (always dark in Grok xAI console UI)
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Story Recap Overlay state
  const [isRecapOpen, setIsRecapOpen] = useState(false);

  // System Docs Overlay state
  const [isSystemDocsOpen, setIsSystemDocsOpen] = useState(false);

  // Intro Screen state & User Perspective
  const [showIntro, setShowIntro] = useState(true);
  const [userPerspective, setUserPerspective] = useState<"cap" | "ironman" | null>(null);

  // Load initial watched list & user perspective from localStorage asynchronously
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        // Load watched list
        const storedWatched = localStorage.getItem("mcu_watched_list");
        if (storedWatched) {
          try {
            setWatchedList(JSON.parse(storedWatched));
          } catch (e) {
            console.error(e);
          }
        }

        // Load user perspective
        const storedPerspective = localStorage.getItem("mcu_user_perspective") as "cap" | "ironman" | null;
        if (storedPerspective) {
          setUserPerspective(storedPerspective);
          setShowIntro(false);
        } else {
          setShowIntro(true);
        }

        // Ensure dark class is active
        document.documentElement.classList.add("dark");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save watched list to localStorage
  const handleToggleWatched = (id: string) => {
    setWatchedList((prev) => {
      const newList = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("mcu_watched_list", JSON.stringify(newList));
      }
      return newList;
    });
  };

  // Toggle dark mode (kept for prop consistency, ensures dark mode remains locked in console view)
  const handleToggleDarkMode = () => {
    setIsDarkMode(true);
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("dark");
    }
  };

  // Reset Perspective Handler for re-experiencing the intro screen & poll revoting
  const handleResetPerspective = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mcu_user_perspective");
      // Note: we keep hero_choice so they can see the live results consensus screen, or they can click RESET CHOICE in the poll!
    }
    setUserPerspective(null);
    setShowIntro(true);
  };

  // Extract all unique characters for the filter dropdown
  const allCharacters = useMemo(() => {
    const chars = new Set<string>();
    mcuTimeline.forEach((movie) => {
      movie.characters.forEach((c) => chars.add(c));
    });
    return Array.from(chars).sort();
  }, []);

  // Filter and sort movies dynamically
  const filteredMovies = useMemo(() => {
    return mcuTimeline
      .filter((movie) => {
        // Search query filter
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchTitle = movie.title.toLowerCase().includes(q);
          const matchSummary = movie.summary.toLowerCase().includes(q);
          const matchEvent = movie.keyEvents.some((e) => e.toLowerCase().includes(q));
          if (!matchTitle && !matchSummary && !matchEvent) return false;
        }

        // Character filter
        if (selectedCharacter !== "All" && !movie.characters.includes(selectedCharacter)) {
          return false;
        }

        // Phase filter
        if (selectedPhase !== "All" && movie.phase !== selectedPhase) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "release") {
          return a.releaseYear - b.releaseYear;
        }
        // Strict chronological order is already the baseline order of mcuTimeline array
        return 0; 
      });
  }, [searchQuery, selectedCharacter, selectedPhase, sortOrder]);

  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black text-white selection:bg-white selection:text-black">
      {/* Immersive Intro Screen Overlay */}
      {showIntro && (
        <IntroScreen
          onComplete={(path) => {
            setUserPerspective(path === "captain" ? "cap" : "ironman");
            setShowIntro(false);
          }}
        />
      )}

      {/* Immersive Three.js Monochrome Starfield Void Background */}
      <CosmicBackground />

      {/* Grok xAI Console Navbar */}
      <Navbar
        watchedCount={watchedList.length}
        totalMovies={mcuTimeline.length}
        isDarkMode={isDarkMode}
        toggleDarkMode={handleToggleDarkMode}
        onOpenRecap={() => setIsRecapOpen(true)}
        onOpenSystemDocs={() => setIsSystemDocsOpen(true)}
      />

      {/* Main Content Container with Generous Negative Space & Pro Grid Structure */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Active Perspective Banner & Reset Trigger */}
        {userPerspective && (
          <div className="mb-8 p-4 bg-[#050505] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3 text-xs font-bold tracking-widest text-white uppercase">
              {userPerspective === "cap" ? (
                <>
                  <span className="p-2 bg-blue-950 border border-blue-500 text-blue-400 rounded-none flex items-center justify-center">
                    <Shield className="w-4 h-4 fill-current" />
                  </span>
                  <span>SYS PERSPECTIVE: CAPTAIN AMERICA // HONOR • LEGACY • LEADERSHIP</span>
                </>
              ) : (
                <>
                  <span className="p-2 bg-red-950 border border-yellow-500 text-yellow-400 rounded-none flex items-center justify-center">
                    <Zap className="w-4 h-4 fill-current" />
                  </span>
                  <span>SYS PERSPECTIVE: IRON MAN // TECH • INNOVATION • FUTURISM</span>
                </>
              )}
            </div>

            <button
              onClick={handleResetPerspective}
              className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-white text-neutral-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer rounded-none"
              title="View global poll consensus and change perspective"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white" />
              <span>VIEW GLOBAL POLL / CHANGE PERSPECTIVE</span>
            </button>
          </div>
        )}

        {/* Interactive Console Filter Bar */}
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

        {/* Timeline Entries List */}
        {filteredMovies.length === 0 ? (
          <div className="w-full bg-[#050505] border border-neutral-800 rounded-none p-16 text-center my-12 shadow-2xl">
            <h3 className="text-lg font-black tracking-widest text-white uppercase">
              SYS // NO TIMELINE ENTRIES FOUND IN LORE MATRIX
            </h3>
            <p className="text-xs text-neutral-400 mt-3 tracking-widest uppercase">
              ADJUST SYSTEM FILTERS OR KEYWORD PARAMETERS TO DISCOVER MCU LOGS.
            </p>
          </div>
        ) : (
          <div className="relative border-l border-neutral-700 pl-6 sm:pl-12 ml-2 sm:ml-4 space-y-16 my-12 transition-colors duration-500">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="relative group/item">
                {/* Timeline Square Indicator */}
                <div className="absolute -left-[29px] sm:-left-[53px] top-8 w-3 h-3 bg-black border-2 border-white group-hover/item:bg-white transition-all duration-300 z-20 shadow-sm" />
                
                {/* Movie Card */}
                <MovieCard
                  movie={movie}
                  isWatched={watchedList.includes(movie.id)}
                  onToggleWatched={handleToggleWatched}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Story Recap Overlay Modal (Auto-Play Playlist) */}
      <StoryRecapModal
        movies={filteredMovies}
        isOpen={isRecapOpen}
        onClose={() => setIsRecapOpen(false)}
      />

      {/* System Docs Overlay Modal */}
      <SystemDocsModal
        isOpen={isSystemDocsOpen}
        onClose={() => setIsSystemDocsOpen(false)}
      />

      {/* Console System Footer */}
      <footer className="w-full py-10 border-t border-neutral-800 bg-black text-center text-xs text-neutral-500 relative z-10 tracking-widest uppercase font-bold">
        <p className="max-w-7xl mx-auto px-4 leading-relaxed">
          AVENGERS TIMELINE • XAI CONSOLE SYSTEM ARCHIVE // ALL MCU LORE & HEROES PROPERTY OF MARVEL STUDIOS.
        </p>
      </footer>
    </main>
  );
}
