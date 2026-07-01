"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight, Check, Lock, Loader2, LogOut, Shield, X } from "lucide-react";
import { FanEditEntry, fanEditTagSuggestions } from "../../data/fanEdits";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/locked-subs/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data?.error || "Login failed.");
        return;
      }

      window.location.reload();
    } catch {
      setError("Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05060a] px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
        <form onSubmit={handleLogin} className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-neutral-950">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-3xl font-black">Locked Subs</h1>
          <p className="mt-2 text-sm text-white/65">
            Admin access is restricted. Enter the route key to review pending fan edit submissions.
          </p>

          <div className="mt-6 space-y-3">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Admin key"
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-lime-300/60"
            />
            {error ? <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-lime-300 px-4 text-sm font-black text-neutral-950 transition hover:bg-lime-400 disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              Unlock admin
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

interface LockedSubsClientProps {
  authorized?: boolean;
  initialFeed?: FanEditEntry[];
  initialPending?: FanEditEntry[];
  initialSubmissionCount?: number;
}

export default function LockedSubsClient({ authorized = false, initialFeed = [], initialPending = [], initialSubmissionCount = 0 }: LockedSubsClientProps) {
  const [feed, setFeed] = useState(initialFeed);
  const [pending, setPending] = useState(initialPending);
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>(() => {
    const entries: Record<string, string[]> = {};
    initialPending.forEach((item) => {
      entries[item.id] = item.tags.length > 0 ? item.tags : ["Cinematic"];
    });
    return entries;
  });
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const visibleSubmissions = useMemo(() => {
    return pending.filter((item) => (filter === "all" ? true : item.status === filter));
  }, [filter, pending]);

  const moderate = async (id: string, action: "approve" | "reject") => {
    const response = await fetch("/api/fan-edits", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action, tags: selectedTags[id] || [] }),
    });

    if (!response.ok) return;

    const data = await response.json();
    setFeed(data.feed);
    setPending(data.pending);
  };

  const handleLogout = async () => {
    await fetch("/api/locked-subs/logout", { method: "POST" });
    window.location.reload();
  };

  if (!authorized) {
    return <LoginForm />;
  }

  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-300/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.22em] text-lime-100">
              <Shield className="h-3.5 w-3.5" />
              Locked Subs
            </div>
            <h1 className="mt-3 text-4xl font-black">Fan edit moderation console</h1>
            <p className="mt-2 text-sm text-white/65">Review pending submissions, tag them, and approve or reject before they hit the public feed.</p>
          </div>

          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:bg-white/10">
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Queue</p>
              <h2 className="mt-1 text-xl font-black">Submission status</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-black uppercase tracking-[0.18em] text-white/60">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-2xl text-white">{pending.length}</div>
                Pending
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-2xl text-white">{feed.length}</div>
                Feed
              </div>
            </div>

            <div className="space-y-2">
              {(["pending", "approved", "rejected", "all"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black capitalize transition ${filter === status ? "bg-lime-300 text-neutral-950" : "border border-white/10 bg-black/20 text-white/70 hover:bg-white/10"}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-4">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black">Pending submissions</h2>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Initial submissions: {initialSubmissionCount}</p>
              </div>

              <div className="space-y-3">
                {visibleSubmissions.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-sm text-white/55">No submissions match the current filter.</div>
                ) : (
                  visibleSubmissions.map((item) => (
                    <article key={item.id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1 space-y-3">
                          <div>
                            <p className="text-lg font-black text-white">{item.title}</p>
                            <p className="text-sm text-white/60">{item.creator}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">{item.sourceUrl}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {fanEditTagSuggestions.map((tag) => {
                              const isSelected = (selectedTags[item.id] || []).includes(tag);

                              return (
                                <button
                                  key={tag}
                                  onClick={() => {
                                    setSelectedTags((prev) => {
                                      const current = prev[item.id] || [];
                                      return {
                                        ...prev,
                                        [item.id]: current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag],
                                      };
                                    });
                                  }}
                                  className={`rounded-full px-3 py-1.5 text-[11px] font-black transition ${isSelected ? "bg-lime-300 text-neutral-950" : "border border-white/10 bg-white/5 text-white/65 hover:bg-white/10"}`}
                                >
                                  {tag}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button onClick={() => moderate(item.id, "approve")} className="inline-flex items-center gap-2 rounded-2xl bg-lime-300 px-4 py-3 text-sm font-black text-neutral-950 transition hover:bg-lime-400">
                            <Check className="h-4 w-4" />
                            Approve
                          </button>
                          <button onClick={() => moderate(item.id, "reject")} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10">
                            <X className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
