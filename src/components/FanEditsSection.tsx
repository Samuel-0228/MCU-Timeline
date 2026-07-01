"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Filter,
  Heart,
  Loader2,
  Play,
  Share2,
  Tag,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { FanEditEntry, fanEditFilterOptions, isSupportedFanEditUrl, parseFanEditSource } from "../data/fanEdits";

interface FanEditsApiResponse {
  feed: FanEditEntry[];
  hasMore?: boolean;
}

const PAGE_SIZE = 6;

const initialSubmission = {
  videoUrl: "",
  title: "",
  creator: "",
};

function buildEmbedUrl(edit: FanEditEntry, muted: boolean) {
  if (edit.platform === "youtube" && edit.youtubeId) {
    return `https://www.youtube-nocookie.com/embed/${edit.youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&playsinline=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${edit.youtubeId}`;
  }

  if (edit.platform === "tiktok" && edit.tiktokId) {
    return `https://www.tiktok.com/embed/v2/${edit.tiktokId}`;
  }

  return edit.sourceUrl;
}

function fanEditThumbnail(edit: FanEditEntry) {
  if (edit.platform === "youtube" && edit.youtubeId) {
    return `https://img.youtube.com/vi/${edit.youtubeId}/hqdefault.jpg`;
  }

  return "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80";
}

function ActionButton({
  active = false,
  label,
  icon,
  onClick,
}: {
  active?: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl border backdrop-blur-xl transition ${
        active ? "border-lime-300 bg-lime-300 text-neutral-950" : "border-white/10 bg-black/40 text-white hover:bg-black/60"
      }`}
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}

function FanEditCard({
  edit,
  isActive,
  isLiked,
  isSaved,
  isMuted,
  onActivate,
  onToggleLike,
  onToggleSave,
  onToggleMute,
  onShare,
}: {
  edit: FanEditEntry;
  isActive: boolean;
  isLiked: boolean;
  isSaved: boolean;
  isMuted: boolean;
  onActivate: (id: string) => void;
  onToggleLike: (id: string) => void;
  onToggleSave: (id: string) => void;
  onToggleMute: () => void;
  onShare: (edit: FanEditEntry) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            onActivate(edit.id);
          }
        });
      },
      { threshold: [0.4, 0.7, 0.9] },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [edit.id, onActivate]);

  return (
    <article ref={cardRef} className="relative h-[100svh] snap-start overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black">
        {isActive ? (
          <iframe
            src={buildEmbedUrl(edit, isMuted)}
            title={edit.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <Image
            src={fanEditThumbnail(edit)}
            alt={edit.title}
            fill
            sizes="100vw"
            unoptimized
            className="object-cover opacity-80 blur-[1px]"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),rgba(0,0,0,0.25)_35%,rgba(0,0,0,0.82)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%,rgba(0,0,0,0.2)_55%,rgba(0,0,0,0.75)_100%)]" />

      <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between sm:left-6 sm:right-6">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/50">Fan Edits</p>
          <h3 className="text-xl font-black text-white sm:text-2xl">Short-video feed</h3>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs font-black text-white/70 backdrop-blur-xl md:flex">
          <Filter className="h-4 w-4 text-lime-300" />
          <span className="text-xs font-black uppercase tracking-[0.18em] text-white">{edit.character}</span>
          <ChevronDown className="h-3.5 w-3.5 text-white/60" />
        </div>
      </div>

      <button
        onClick={onToggleMute}
        className="absolute right-4 top-20 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-xl transition hover:bg-black/60 sm:right-6"
        title={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      <div className="absolute bottom-5 left-4 z-20 max-w-[calc(100%-5rem)] space-y-3 sm:left-6 sm:max-w-[42rem]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl">
          <Play className="h-3.5 w-3.5 fill-current text-lime-300" />
          {edit.platform === "youtube" ? "YouTube Shorts" : "TikTok"}
          <span className="text-white/35">{edit.durationLabel}</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-3xl font-black leading-tight text-white sm:text-4xl">{edit.title}</h4>
          <p className="max-w-xl text-sm leading-6 text-white/75 sm:text-base">{edit.caption}</p>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">{edit.creator || "Community edit"}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {edit.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl">
              #{tag.replace(/\s+/g, "")}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute right-4 bottom-8 z-20 flex flex-col items-center gap-3 sm:right-6">
        <ActionButton active={isLiked} label="Like" icon={<Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />} onClick={() => onToggleLike(edit.id)} />
        <ActionButton active={isSaved} label="Save" icon={<Bookmark className={`h-6 w-6 ${isSaved ? "fill-current" : ""}`} />} onClick={() => onToggleSave(edit.id)} />
        <ActionButton label="Share" icon={<Share2 className="h-6 w-6" />} onClick={() => onShare(edit)} />
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl">
          <span>{edit.views.toLocaleString()}</span>
          <span>Views</span>
        </div>
      </div>

      <button onClick={() => onActivate(edit.id)} className="absolute inset-0 z-10" aria-label={`Focus ${edit.title}`} />
    </article>
  );
}

export default function FanEditsSection() {
  const [feed, setFeed] = useState<FanEditEntry[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("All");
  const [selectedMood, setSelectedMood] = useState<string>("All");
  const [activeVideoId, setActiveVideoId] = useState<string>("");
  const [isMuted, setIsMuted] = useState(true);
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    const storedLikes = window.localStorage.getItem("fan_edits_likes");
    if (!storedLikes) return [];

    try {
      return JSON.parse(storedLikes);
    } catch {
      return [];
    }
  });
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    const storedSaves = window.localStorage.getItem("fan_edits_saves");
    if (!storedSaves) return [];

    try {
      return JSON.parse(storedSaves);
    } catch {
      return [];
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submission, setSubmission] = useState(initialSubmission);
  const [submissionError, setSubmissionError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const activeVideoIdRef = useRef("");
  const isLoadingRef = useRef(false);

  useEffect(() => {
    activeVideoIdRef.current = activeVideoId;
  }, [activeVideoId]);

  const loadFeedBatch = useCallback(async (nextOffset = 0) => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/fan-edits?limit=${PAGE_SIZE}&offset=${nextOffset}`);
      if (!response.ok) return;

      const data: FanEditsApiResponse = await response.json();
      setFeed((prev) => (nextOffset === 0 ? data.feed : [...prev, ...data.feed]));
      setHasMore(Boolean(data.hasMore));
      setOffset(nextOffset + data.feed.length);

      if (!activeVideoIdRef.current && data.feed.length > 0) {
        setActiveVideoId(data.feed[0].id);
      }
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadFeedBatch(0);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadFeedBatch]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadFeedBatch(offset);
          }
        });
      },
      { rootMargin: "1000px 0px 1000px 0px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadFeedBatch, offset]);

  const filteredFeed = useMemo(() => {
    return feed.filter((edit) => {
      if (selectedCharacter !== "All" && edit.character !== selectedCharacter) return false;
      if (selectedMood !== "All" && edit.mood !== selectedMood) return false;
      return true;
    });
  }, [feed, selectedCharacter, selectedMood]);

  const toggleLocalArray = (id: string, key: "fan_edits_likes" | "fan_edits_saves", setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(next));
      }
      return next;
    });
  };

  const submitFanEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmissionError("");
    setSubmissionStatus("");

    if (!submission.videoUrl.trim()) {
      setSubmissionError("Add a video URL before submitting.");
      return;
    }

    if (!isSupportedFanEditUrl(submission.videoUrl)) {
      setSubmissionError("Use a YouTube Shorts or TikTok link.");
      return;
    }

    const parsed = parseFanEditSource(submission.videoUrl);
    if (!parsed) {
      setSubmissionError("The URL looks valid, but the video ID could not be detected.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/fan-edits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl: submission.videoUrl,
          title: submission.title,
          creator: submission.creator,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setSubmissionError(data?.error || "Submission failed.");
        return;
      }

      setSubmissionStatus("Submitted. It will appear after admin approval.");
      setSubmission(initialSubmission);
      setShowSubmitModal(false);
      await loadFeedBatch(0);
    } catch {
      setSubmissionError("Could not submit the edit right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async (edit: FanEditEntry) => {
    const shareData = {
      title: edit.title,
      text: edit.caption,
      url: edit.sourceUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(edit.sourceUrl);
  };

  return (
    <section id="fan-edits" className="relative isolate overflow-hidden border-t border-white/5 bg-[#030409] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.12),transparent_30%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_30%)]" />

      <div className="sticky top-0 z-30 border-b border-white/8 bg-black/55 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/45">Fan Edits</p>
            <h2 className="text-xl font-black text-white sm:text-2xl">Short-video feed</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/70 md:flex">
              <Filter className="h-4 w-4 text-lime-300" />
              <select
                aria-label="Filter fan edits by character"
                value={selectedCharacter}
                onChange={(event) => setSelectedCharacter(event.target.value)}
                className="bg-transparent outline-none"
              >
                {fanEditFilterOptions.characters.map((item) => (
                  <option key={item} value={item} className="bg-neutral-950 text-white">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/70 md:flex">
              <Tag className="h-4 w-4 text-lime-300" />
              <select
                aria-label="Filter fan edits by mood"
                value={selectedMood}
                onChange={(event) => setSelectedMood(event.target.value)}
                className="bg-transparent outline-none"
              >
                {fanEditFilterOptions.moods.map((item) => (
                  <option key={item} value={item} className="bg-neutral-950 text-white">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-4 py-2 text-xs font-black text-neutral-950 transition hover:bg-lime-400"
            >
              Submit edit
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-[calc(100svh-64px)] overflow-y-auto snap-y snap-mandatory scroll-smooth px-3 py-4 sm:px-5 lg:px-8">
        {filteredFeed.map((edit) => (
          <div key={edit.id} className="flex justify-center py-3">
            <FanEditCard
              edit={edit}
              isActive={activeVideoId === edit.id}
              isLiked={likedIds.includes(edit.id)}
              isSaved={savedIds.includes(edit.id)}
              isMuted={isMuted}
              onActivate={setActiveVideoId}
              onToggleLike={(id) => toggleLocalArray(id, "fan_edits_likes", setLikedIds)}
              onToggleSave={(id) => toggleLocalArray(id, "fan_edits_saves", setSavedIds)}
              onToggleMute={() => setIsMuted((prev) => !prev)}
              onShare={handleShare}
            />
          </div>
        ))}

        <div ref={sentinelRef} className="h-20" />

        {isLoading ? (
          <div className="flex h-24 items-center justify-center text-sm font-bold text-white/50">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more edits...
          </div>
        ) : null}

        {!hasMore ? (
          <div className="flex h-24 items-center justify-center text-xs font-black uppercase tracking-[0.24em] text-white/35">
            End of feed
          </div>
        ) : null}
      </div>

      {showSubmitModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#05060a] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/45">Submit</p>
                <h3 className="mt-1 text-2xl font-black text-white">Add your favorite edit</h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10"
                aria-label="Close submission form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submitFanEdit} className="mt-6 space-y-3">
              <input
                value={submission.videoUrl}
                onChange={(event) => setSubmission((prev) => ({ ...prev, videoUrl: event.target.value }))}
                placeholder="YouTube Shorts or TikTok URL"
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-lime-300/60"
              />
              <input
                value={submission.title}
                onChange={(event) => setSubmission((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Optional title"
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-lime-300/60"
              />
              <input
                value={submission.creator}
                onChange={(event) => setSubmission((prev) => ({ ...prev, creator: event.target.value }))}
                placeholder="Optional creator name"
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-lime-300/60"
              />

              {submissionError ? <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{submissionError}</p> : null}
              {submissionStatus ? <p className="rounded-2xl border border-lime-400/20 bg-lime-300/10 px-4 py-3 text-sm text-lime-100">{submissionStatus}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-lime-300 px-4 text-sm font-black text-neutral-950 transition hover:bg-lime-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Submit for review
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
