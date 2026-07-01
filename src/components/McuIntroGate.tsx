"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, RefreshCcw, Shield, Star } from "lucide-react";

import captainPortrait from "../../data/capitain.png";
import ironmanPortrait from "../../data/ironman.png";

type HeroChoice = "captain" | "ironman";
type StoneChoice = "space" | "mind" | "reality" | "power" | "time" | "soul";

interface McuIntroGateProps {
  onComplete: (choice: HeroChoice) => void;
}

const stoneOptions: Array<{
  id: StoneChoice;
  name: string;
  accent: string;
  glow: string;
  image: string;
}> = [
  { id: "space", name: "Space", accent: "from-sky-400 to-indigo-600", glow: "shadow-sky-500/30", image: "/space_stone.png" },
  { id: "mind", name: "Mind", accent: "from-amber-300 to-yellow-500", glow: "shadow-amber-500/30", image: "/mind_stone.png" },
  { id: "reality", name: "Reality", accent: "from-fuchsia-400 to-rose-500", glow: "shadow-fuchsia-500/30", image: "/reality_stone.png" },
  { id: "power", name: "Power", accent: "from-violet-500 to-indigo-700", glow: "shadow-violet-500/30", image: "/power_stone.png" },
  { id: "time", name: "Time", accent: "from-emerald-400 to-cyan-500", glow: "shadow-emerald-500/30", image: "/time_stone.png" },
  { id: "soul", name: "Soul", accent: "from-orange-400 to-amber-600", glow: "shadow-orange-500/30", image: "/soul_stone.png" },
];

export default function McuIntroGate({ onComplete }: McuIntroGateProps) {
  const [stage, setStage] = useState<"enter" | "team" | "stone">("enter");
  const [heroChoice, setHeroChoice] = useState<HeroChoice | null>(null);
  const [stoneChoice, setStoneChoice] = useState<StoneChoice | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedHero = window.localStorage.getItem("hero_choice") as HeroChoice | null;
    const storedStone = window.localStorage.getItem("infinity_stone_choice") as StoneChoice | null;

    if (storedHero) {
      setHeroChoice(storedHero);
      setStage("stone");
    }

    if (storedStone) {
      setStoneChoice(storedStone);
    }
  }, []);

  const heroMeta = useMemo(() => {
    if (heroChoice === "captain") {
      return {
        title: "Captain America",
        subtitle: "Honor, discipline, and the shield-first path.",
      };
    }

    return {
      title: "Iron Man",
      subtitle: "Tech, momentum, and the suit-up mindset.",
    };
  }, [heroChoice]);

  const handleEnter = () => setStage("team");

  const handleHeroSelect = (choice: HeroChoice) => {
    setHeroChoice(choice);
    setStoneChoice(null);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("hero_choice", choice);
      window.localStorage.setItem("mcu_user_perspective", choice === "captain" ? "cap" : "ironman");
    }

    setStage("stone");
  };

  const handleStoneSelect = (choice: StoneChoice) => {
    setStoneChoice(choice);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("infinity_stone_choice", choice);
    }
  };

  const handleReset = () => {
    setHeroChoice(null);
    setStoneChoice(null);
    setStage("team");

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("hero_choice");
      window.localStorage.removeItem("mcu_user_perspective");
      window.localStorage.removeItem("infinity_stone_choice");
      window.localStorage.removeItem("mcu_intro_complete");
    }
  };

  const handleFinish = () => {
    if (!heroChoice || !stoneChoice) return;

    if (typeof window !== "undefined") {
      window.localStorage.setItem("mcu_intro_complete", "true");
    }

    setIsExiting(true);
    window.setTimeout(() => onComplete(heroChoice), 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#fafafa] text-neutral-950 transition duration-700 ease-out flex items-center justify-center ${
        isExiting ? "pointer-events-none opacity-0 scale-[1.02]" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.1),transparent_28%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.05),transparent_28%)]" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8 max-w-6xl">
        {stage === "enter" ? (
          <div className="mx-auto flex w-full flex-col gap-8 lg:flex-row lg:items-stretch">
            <div className="flex flex-1 flex-col justify-between rounded-3xl border border-[#e5e7eb] bg-white p-8 shadow-sm lg:p-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs font-black uppercase tracking-widest text-lime-500">
                  <Star className="h-3.5 w-3.5" />
                  MCU landing sequence
                </div>
                <div className="max-w-xl space-y-4">
                  <h1 className="text-5xl font-black leading-none tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
                    Enter the MCU timeline.
                  </h1>
                  <p className="max-w-2xl text-base font-medium leading-relaxed text-neutral-500">
                    Choose your side, pick an Infinity Stone, and then step into the full timeline archive.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-widest text-neutral-500">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-neutral-50 px-4 py-2">
                  <Shield className="h-4 w-4 text-lime-500" />
                  First visit gate
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-neutral-50 px-4 py-2">
                  <Star className="h-4 w-4 text-lime-500" />
                  Two fun choices
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-neutral-50 px-4 py-2">
                  <Star className="h-4 w-4 text-lime-500" />
                  Timeline unlock
                </span>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center rounded-3xl border border-[#e5e7eb] bg-neutral-50 p-6 shadow-sm">
              <div className="relative min-h-[26rem] w-full overflow-hidden rounded-[2rem] border border-[#e5e7eb] bg-white shadow-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.1),transparent_45%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Start sequence</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">Avengers archive access</h2>
                  <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-neutral-500">
                    One button opens the gate. After that, the first question sets your side and the second sets your stone.
                  </p>
                  <button
                    onClick={handleEnter}
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime-300 px-8 py-4 text-sm font-black uppercase tracking-widest text-neutral-950 transition hover:bg-lime-400 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Enter MCU
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {stage === "team" ? (
          <div className="w-full space-y-8">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Question 1 of 2</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">Who&apos;s team are you?</h2>
              <p className="mt-3 text-base font-semibold text-neutral-500">Pick one side before you enter the timeline.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  id: "captain" as HeroChoice,
                  title: "Captain America",
                  subtitle: "Honor, grit, and the shield-first path.",
                  image: captainPortrait,
                  accent: "from-sky-100 to-blue-200",
                  ring: "ring-4 ring-sky-300 border-transparent",
                },
                {
                  id: "ironman" as HeroChoice,
                  title: "Iron Man",
                  subtitle: "Tech, speed, and the suit-up mindset.",
                  image: ironmanPortrait,
                  accent: "from-amber-100 to-red-200",
                  ring: "ring-4 ring-amber-300 border-transparent",
                },
              ].map((card) => {
                const isActive = heroChoice === card.id;

                return (
                  <button
                    key={card.id}
                    onClick={() => handleHeroSelect(card.id)}
                    className={`group relative overflow-hidden rounded-[2rem] border bg-white text-left shadow-sm transition duration-300 ${
                      isActive ? `${card.ring} scale-[1.01]` : "border-[#e5e7eb] hover:border-neutral-300 hover:shadow-md"
                    }`}
                  >
                    <div className="relative aspect-[4/5] min-h-[28rem] flex flex-col justify-end">
                      <Image src={card.image} alt={card.title} fill priority className="object-cover object-top opacity-90 transition duration-700 group-hover:scale-105" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${card.accent} mix-blend-multiply opacity-20`} />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/80 to-transparent" />

                      <div className="relative z-10 p-8">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs font-black uppercase tracking-widest text-neutral-600 shadow-sm">
                          <Shield className="h-4 w-4 text-lime-500" />
                          Choose your side
                        </div>
                        <h3 className="text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">{card.title}</h3>
                        <p className="mt-2 max-w-md text-sm font-bold text-neutral-600">{card.subtitle}</p>
                      </div>

                      {isActive ? (
                        <div className="absolute right-6 top-6 rounded-full bg-lime-300 px-4 py-2 text-xs font-black uppercase tracking-widest text-neutral-950 shadow-md">
                          Selected
                        </div>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {stage === "stone" ? (
          <div className="w-full space-y-8">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Question 2 of 2</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">Which Infinity Stone do you like most?</h2>
              <p className="mt-3 text-base font-semibold text-neutral-500">Finish the vibe check, then step into the archive.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stoneOptions.map((stone) => {
                const isActive = stoneChoice === stone.id;

                return (
                  <button
                    key={stone.id}
                    onClick={() => handleStoneSelect(stone.id)}
                    className={`group rounded-3xl border p-4 text-left transition duration-300 ${
                      isActive ? "border-lime-300 bg-lime-50 shadow-sm" : "border-[#e5e7eb] bg-white hover:border-neutral-300 hover:shadow-sm"
                    }`}
                  >
                    <div className={`flex items-center justify-between rounded-2xl bg-gradient-to-br ${stone.accent} p-6 shadow-sm`}>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-white/90">Infinity Stone</p>
                        <h3 className="mt-2 text-2xl font-black text-white drop-shadow-sm">{stone.name}</h3>
                      </div>
                      <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-lg border-2 border-white/20">
                        <Image src={stone.image} alt={stone.name} fill className="object-cover" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-between items-center rounded-[2rem] border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm font-bold text-neutral-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-neutral-50 px-4 py-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${heroChoice === "captain" ? "bg-blue-500" : "bg-red-500"}`} />
                  {heroChoice ? heroMeta.title : "No side selected yet"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-neutral-50 px-4 py-2">
                  {stoneChoice ? (
                    <div className="relative h-5 w-5 overflow-hidden rounded-full shadow-sm">
                      <Image src={stoneOptions.find((stone) => stone.id === stoneChoice)?.image || ""} alt="Stone" fill className="object-cover" />
                    </div>
                  ) : (
                    <Star className="h-4 w-4 text-lime-500" />
                  )}
                  {stoneChoice ? stoneOptions.find((stone) => stone.id === stoneChoice)?.name : "Pick a stone"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-950"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reset
                </button>
                <button
                  onClick={handleFinish}
                  disabled={!heroChoice || !stoneChoice}
                  className="inline-flex items-center gap-3 rounded-full bg-lime-300 px-6 py-3 text-sm font-black uppercase tracking-widest text-neutral-950 transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
                >
                  Enter MCU
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}