"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Shield, Zap, CheckCircle2, RotateCcw, ArrowRight, BarChart2 } from "lucide-react";

interface IntroScreenProps {
  onComplete: (path: "captain" | "ironman") => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [userChoice, setUserChoice] = useState<"captain" | "ironman" | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Poll votes state initialized with realistic base numbers
  const [votes, setVotes] = useState({ captain: 14238, ironman: 18452 });

  // Animated counter states for percentages
  const [displayCapPercent, setDisplayCapPercent] = useState(0);
  const [displayIronPercent, setDisplayIronPercent] = useState(0);

  // Fetch initial votes and check localStorage on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      if (typeof window !== "undefined") {
        const storedChoice = localStorage.getItem("hero_choice") as "captain" | "ironman" | null;
        if (storedChoice) {
          setUserChoice(storedChoice);
          setHasVoted(true);
        }
      }

      try {
        const res = await fetch("/api/vote");
        if (res.ok) {
          const data = await res.json();
          setVotes(data);
        }
      } catch (err) {
        console.error("Failed to fetch poll votes:", err);
      }
    };

    fetchInitialData();
  }, []);

  // Calculate percentages and total votes
  const totalVotes = votes.captain + votes.ironman;
  const targetCapPercent = totalVotes > 0 ? Math.round((votes.captain / totalVotes) * 100) : 50;
  const targetIronPercent = totalVotes > 0 ? 100 - targetCapPercent : 50;

  // Animated number counter effect when results view is active
  useEffect(() => {
    if (!hasVoted) return;

    let capStart = 0;
    let ironStart = 0;
    const interval = setInterval(() => {
      let capDone = false;
      let ironDone = false;

      if (capStart < targetCapPercent) {
        capStart += 1;
        setDisplayCapPercent(capStart);
      } else {
        capDone = true;
      }

      if (ironStart < targetIronPercent) {
        ironStart += 1;
        setDisplayIronPercent(ironStart);
      } else {
        ironDone = true;
      }

      if (capDone && ironDone) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [hasVoted, targetCapPercent, targetIronPercent]);

  // Handle User Vote (Optimistic UI update + server sync)
  const handleVote = async (hero: "captain" | "ironman") => {
    if (hasVoted) return; // Prevent multiple votes

    setUserChoice(hero);
    setHasVoted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("hero_choice", hero);
      localStorage.setItem("mcu_user_perspective", hero === "captain" ? "cap" : "ironman");
    }

    // Optimistic UI update
    setVotes((prev) => ({
      ...prev,
      [hero]: prev[hero] + 1,
    }));

    // Server API sync
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero, action: "vote" }),
      });
      if (res.ok) {
        const data = await res.json();
        setVotes(data);
      }
    } catch (err) {
      console.error("Failed to sync vote:", err);
    }
  };

  // Handle Reset Choice
  const handleReset = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const oldHero = userChoice;
    setUserChoice(null);
    setHasVoted(false);
    setDisplayCapPercent(0);
    setDisplayIronPercent(0);

    if (typeof window !== "undefined") {
      localStorage.removeItem("hero_choice");
      localStorage.removeItem("mcu_user_perspective");
    }

    if (oldHero) {
      // Optimistic decrement
      setVotes((prev) => ({
        ...prev,
        [oldHero]: Math.max(0, prev[oldHero] - 1),
      }));

      // Server API sync
      try {
        const res = await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "reset", oldHero }),
        });
        if (res.ok) {
          const data = await res.json();
          setVotes(data);
        }
      } catch (err) {
        console.error("Failed to sync reset:", err);
      }
    }
  };

  // Handle entering the timeline matrix
  const handleEnterTimeline = () => {
    if (!userChoice) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete(userChoice);
    }, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-black transition-all duration-1000 ease-in-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Top Floating Title & Live Global Poll Header */}
      <div className="absolute top-6 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4 text-center animate-fadeInCinematic">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-2xl">
          {hasVoted ? "Global Vote Consensus" : "Choose Your Perspective"}
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-white/40 text-white text-[11px] font-bold tracking-widest uppercase rounded-none shadow-md">
            <BarChart2 className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>{totalVotes.toLocaleString()} Total Votes</span>
          </span>
          {hasVoted && userChoice && (
            <span className="px-3 py-1 bg-white text-black text-[11px] font-black tracking-widest uppercase rounded-none shadow-md">
              You chose: {userChoice === "captain" ? "Captain America" : "Iron Man"}
            </span>
          )}
        </div>
      </div>

      {/* Ambient Floating Energy / Light Particles Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] absolute left-1/4 animate-ambientPulse" />
        <div className="w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] absolute right-1/4 animate-ambientPulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* LEFT: Captain America Theme */}
      <div
        onClick={() => !hasVoted && handleVote("captain")}
        style={{
          flexBasis: hasVoted ? `${targetCapPercent}%` : "50%",
        }}
        className={`relative flex-1 w-full lg:w-auto h-1/2 lg:h-full group overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-800 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) bg-[#0a1128] ${
          !hasVoted ? "cursor-pointer hover:border-white/40" : ""
        }`}
      >
        {/* Background Character Image with reliable fallback */}
        <div className="absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out brightness-90 group-hover:brightness-110 contrast-100 group-hover:contrast-115">
          <Image
            src="https://images.unsplash.com/photo-1569074187119-c87815b476da?q=80&w=2000&auto=format&fit=crop"
            alt="Captain America Perspective"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        </div>

        {/* Vintage / Grain & Diffused Deep Blue / Muted Red Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128]/95 via-[#1c2541]/70 to-transparent backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all duration-700 opacity-90 group-hover:opacity-80" />
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-600/20 mix-blend-overlay transition-colors duration-700" />
        
        {/* Subtle Animated Glow on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_80px_rgba(37,99,235,0.3)]" />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 lg:p-14 text-left transform group-hover:translate-y-[-4px] transition-transform duration-700 ease-out">
          
          {/* Active Choice Badge */}
          {hasVoted && userChoice === "captain" && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 border border-white text-white text-xs font-black tracking-widest uppercase rounded-none shadow-2xl mb-4 w-fit animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-white" /> YOUR PERSPECTIVE // LOCK ACTIVE
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-1 bg-[#0a1128] border border-blue-500/50 text-white text-[11px] font-black tracking-widest uppercase rounded-none w-fit mb-3 group-hover:border-blue-400 transition-colors shadow-lg">
            <Shield className="w-3.5 h-3.5 text-red-400 fill-current" /> HONOR • LEGACY • LEADERSHIP
          </div>

          <div className="flex flex-wrap items-baseline gap-4 mb-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-2xl">
              Captain America
            </h2>
            {hasVoted && (
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-400 drop-shadow-lg animate-fadeIn">
                {displayCapPercent}%
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-neutral-200 max-w-md leading-relaxed font-medium tracking-wide drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
            {hasVoted
              ? `The First Avenger commands ${votes.captain.toLocaleString()} global votes. A timeless testament to moral integrity and unyielding leadership.`
              : "Stand for unwavering honor, moral integrity, and timeless leadership. Enter the timeline through the perspective of the First Avenger."}
          </p>

          {!hasVoted && (
            <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 group-hover:text-white transition-colors">
              <span>CAST VOTE & INITIALIZE PATH //</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-500">&rarr;</span>
            </div>
          )}

          {/* Action Trigger in Results View */}
          {hasVoted && userChoice === "captain" && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleEnterTimeline}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-200 text-black font-black text-xs tracking-widest uppercase rounded-none shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer border border-white"
              >
                <span>ENTER TIMELINE MATRIX</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-3 bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-white text-neutral-400 hover:text-white text-[11px] font-bold tracking-widest uppercase rounded-none transition-all duration-300 active:scale-95 cursor-pointer"
                title="Reset your vote and choose again"
              >
                <RotateCcw className="w-3.5 h-3.5 text-white" />
                <span>RESET CHOICE</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Iron Man Theme */}
      <div
        onClick={() => !hasVoted && handleVote("ironman")}
        style={{
          flexBasis: hasVoted ? `${targetIronPercent}%` : "50%",
        }}
        className={`relative flex-1 w-full lg:w-auto h-1/2 lg:h-full group overflow-hidden border-t lg:border-t-0 lg:border-l border-neutral-800 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) bg-[#1a0505] ${
          !hasVoted ? "cursor-pointer hover:border-white/40" : ""
        }`}
      >
        {/* Background Character Image */}
        <div className="absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out brightness-90 group-hover:brightness-110 contrast-100 group-hover:contrast-115">
          <Image
            src="https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=2000&auto=format&fit=crop"
            alt="Iron Man Perspective"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        </div>

        {/* Sleek Metallic Dark Background with Red and Gold Accents & Futuristic Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505]/95 via-[#3b0909]/70 to-transparent transition-all duration-700 opacity-90 group-hover:opacity-80" />
        <div className="absolute inset-0 bg-red-950/20 group-hover:bg-red-600/20 mix-blend-color-dodge transition-colors duration-700" />
        
        {/* Neon Accents / Sharp Highlights Glow on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_80px_rgba(234,179,8,0.25)]" />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 lg:p-14 text-left transform group-hover:translate-y-[-4px] transition-transform duration-700 ease-out">
          
          {/* Active Choice Badge */}
          {hasVoted && userChoice === "ironman" && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500 border border-white text-black text-xs font-black tracking-widest uppercase rounded-none shadow-2xl mb-4 w-fit animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-black" /> YOUR PERSPECTIVE // LOCK ACTIVE
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-1 bg-[#1a0505] border border-yellow-500/50 text-white text-[11px] font-black tracking-widest uppercase rounded-none w-fit mb-3 group-hover:border-yellow-400 transition-colors shadow-lg">
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current" /> TECH • INNOVATION • FUTURISM
          </div>

          <div className="flex flex-wrap items-baseline gap-4 mb-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase drop-shadow-2xl">
              Iron Man
            </h2>
            {hasVoted && (
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-yellow-400 drop-shadow-lg animate-fadeIn">
                {displayIronPercent}%
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-neutral-200 max-w-md leading-relaxed font-medium tracking-wide drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
            {hasVoted
              ? `The armored futurist commands ${votes.ironman.toLocaleString()} global votes. A stunning testament to raw genius and cutting-edge vision.`
              : "Harness cutting-edge innovation, raw genius, and futuristic vision. Enter the timeline through the perspective of the armored futurist."}
          </p>

          {!hasVoted && (
            <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-400 group-hover:text-white transition-colors">
              <span>CAST VOTE & INITIALIZE PATH //</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-500">&rarr;</span>
            </div>
          )}

          {/* Action Trigger in Results View */}
          {hasVoted && userChoice === "ironman" && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleEnterTimeline}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-200 text-black font-black text-xs tracking-widest uppercase rounded-none shadow-2xl active:scale-95 transition-all duration-300 cursor-pointer border border-white"
              >
                <span>ENTER TIMELINE MATRIX</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-3 bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-white text-neutral-400 hover:text-white text-[11px] font-bold tracking-widest uppercase rounded-none transition-all duration-300 active:scale-95 cursor-pointer"
                title="Reset your vote and choose again"
              >
                <RotateCcw className="w-3.5 h-3.5 text-white" />
                <span>RESET CHOICE</span>
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
