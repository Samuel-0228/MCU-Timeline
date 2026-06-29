"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Shield, Zap } from "lucide-react";

interface IntroScreenProps {
  onComplete: (path: "cap" | "ironman") => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleSelect = (path: "cap" | "ironman") => {
    setIsExiting(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("mcu_user_perspective", path);
    }
    // Delay unmounting to allow the cinematic fade/zoom transition to play fully
    setTimeout(() => {
      onComplete(path);
    }, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-black transition-all duration-1000 ease-in-out select-none ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Top Floating Title Header */}
      <div className="absolute top-8 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none px-4 text-center animate-fadeInCinematic">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-2xl">
          Choose Your Perspective
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold tracking-widest text-neutral-400 uppercase mt-2 drop-shadow-md">
          Two Legends. One Story.
        </p>
      </div>

      {/* Ambient Floating Energy / Light Particles Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] absolute left-1/4 animate-ambientPulse" />
        <div className="w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] absolute right-1/4 animate-ambientPulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* LEFT: Captain America Theme */}
      <div
        onClick={() => handleSelect("cap")}
        className="relative flex-1 w-full h-1/2 lg:h-full group cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-800 hover:border-white/40 transition-all duration-700 ease-out"
      >
        {/* Background Character Image */}
        <div className="absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out brightness-90 group-hover:brightness-110 contrast-100 group-hover:contrast-115">
          <Image
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=2000&auto=format&fit=crop"
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
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-12 lg:p-16 text-left transform group-hover:translate-y-[-8px] transition-transform duration-700 ease-out">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0a1128] border border-blue-500/50 text-white text-[11px] font-black tracking-widest uppercase rounded-none w-fit mb-4 group-hover:border-blue-400 transition-colors shadow-lg">
            <Shield className="w-3.5 h-3.5 text-red-400 fill-current" /> HONOR • LEGACY • LEADERSHIP
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase drop-shadow-2xl mb-3">
            Captain America
          </h2>
          <p className="text-xs sm:text-sm text-neutral-200 max-w-md leading-relaxed font-medium tracking-wide drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
            Stand for unwavering honor, moral integrity, and timeless leadership. Enter the timeline through the perspective of the First Avenger.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 group-hover:text-white transition-colors">
            <span>INITIALIZE PATH //</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-500">&rarr;</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Iron Man Theme */}
      <div
        onClick={() => handleSelect("ironman")}
        className="relative flex-1 w-full h-1/2 lg:h-full group cursor-pointer overflow-hidden border-t lg:border-t-0 lg:border-l border-neutral-800 hover:border-white/40 transition-all duration-700 ease-out"
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
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-12 lg:p-16 text-left transform group-hover:translate-y-[-8px] transition-transform duration-700 ease-out">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1a0505] border border-yellow-500/50 text-white text-[11px] font-black tracking-widest uppercase rounded-none w-fit mb-4 group-hover:border-yellow-400 transition-colors shadow-lg">
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current" /> TECH • INNOVATION • FUTURISM
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase drop-shadow-2xl mb-3">
            Iron Man
          </h2>
          <p className="text-xs sm:text-sm text-neutral-200 max-w-md leading-relaxed font-medium tracking-wide drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
            Harness cutting-edge innovation, raw genius, and futuristic vision. Enter the timeline through the perspective of the armored futurist.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-400 group-hover:text-white transition-colors">
            <span>INITIALIZE PATH //</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-500">&rarr;</span>
          </div>
        </div>
      </div>

    </div>
  );
}
