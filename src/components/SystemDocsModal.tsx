"use client";

import React from "react";
import { Download, Film, FolderOpen, Play, Route, X } from "lucide-react";

interface SystemDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemDocsModal({ isOpen, onClose }: SystemDocsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/30 p-4 backdrop-blur-md">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#eeeeee] px-5 py-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-3 py-1.5 text-xs font-black text-neutral-950">
              <FolderOpen className="h-3.5 w-3.5" />
              Fan Guide
            </span>
            <h2 className="mt-3 text-2xl font-black text-neutral-950">Avengers Timeline dashboard notes</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#e5e7eb] p-2 text-neutral-500 transition hover:border-neutral-950 hover:text-neutral-950"
            title="Close system docs"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Route,
                title: "Chronological MCU order",
                text: "The dashboard lists the existing archive entries by story chronology, with release-order sorting available from the filter controls.",
              },
              {
                icon: Film,
                title: "Trailer previews",
                text: "Each title keeps its YouTube trailer preview and can be played directly inside the movie card or the story recap overlay.",
              },
              {
                icon: Download,
                title: "Watch and download searches",
                text: "The existing Goojara and T4TSA search links stay attached to each title for fan discovery.",
              },
              {
                icon: Play,
                title: "Story recap mode",
                text: "The recap overlay cycles through the currently filtered timeline list and advances automatically every 30 seconds.",
              },
            ].map((item) => (
              <section key={item.title} className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-lime-300 text-neutral-950">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black text-neutral-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="border-t border-[#eeeeee] px-5 py-4 text-xs font-bold text-neutral-500">
          Built for MCU fans who want timeline order, trailers, quick filtering, and external watch/download searches in one place.
        </div>
      </div>
    </div>
  );
}
