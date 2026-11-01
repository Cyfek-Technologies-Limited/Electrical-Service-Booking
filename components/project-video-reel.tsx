"use client";

import { useState } from "react";

const videos = [
  {
    src: "/WhatsApp Video 2026-11-01 at 7.09.49 AM.mp4",
    title: "Project highlight 2",
  },
  {
    src: "/WhatsApp Video 2026-11-01 at 7.09.48 AM.mp4",
    title: "Project highlight 1",
  },
  {
    src: "/WhatsApp Video 2026-11-01 at 7.09.50 AM.mp4",
    title: "Project highlight 3",
  },
  {
    src: "/WhatsApp Video 2026-11-01 at 7.10.57 AM.mp4",
    title: "Project highlight 4",
  },
];

export function ProjectVideoReel() {
  const [activeVideo, setActiveVideo] = useState(0);
  const video = videos[activeVideo];

  return (
    <section className="bg-[#f8f8f6] py-[64px] sm:py-[84px]">
      <div className="mx-auto w-[min(1000px,calc(100%_-_2rem))] sm:w-[min(1000px,calc(100%_-_4rem))]">
        <div className="mb-6 text-center sm:mb-8">
          <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-habitech-green-dark">
            PROJECT VIDEOS
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-[-.045em] sm:text-4xl">
            A closer look at our work
          </h2>
          <p className="mx-auto mt-3 max-w-[540px] text-xs leading-relaxed text-habitech-muted sm:text-[13px]">
            Watch highlights from Habitech Power Limited project sites. Videos
            play in sequence and start again after the final clip.
          </p>
        </div>
        <div className="overflow-hidden rounded-[10px] border-[1px] border-black/30 bg-black shadow-md">
          <div className="aspect-video w-full">
            <video
              key={video.src}
              aria-label={video.title}
              autoPlay
              className="block h-full w-full object-contain"
              controls
              muted
              onEnded={() =>
                setActiveVideo((index) => (index + 1) % videos.length)
              }
              playsInline
              preload="metadata"
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
        <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[.12em] text-habitech-green-dark">
          {video.title} · {String(activeVideo + 1).padStart(2, "0")} /{" "}
          {String(videos.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
