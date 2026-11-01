"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const photos = [
  "WhatsApp Image 2026-11-01 at 7.11.26 AM (2).jpeg",
  "WhatsApp Image 2026-11-01 at 7.08.11 AM.jpeg",
  "WhatsApp Image 2026-11-01 at 7.08.41 AM.jpeg",
  "WhatsApp Image 2026-11-01 at 7.08.49 AM (1).jpeg",
  "WhatsApp Image 2026-11-01 at 7.09.22 AM (2).jpeg",

  "WhatsApp Image 2026-11-01 at 7.09.46 AM.jpeg",
  "WhatsApp Image 2026-11-01 at 7.09.52 AM.jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.13 AM.jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.14 AM.jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.20 AM (1).jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.20 AM (2).jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.21 AM (3).jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.23 AM (1).jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.23 AM (2).jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.24 AM (1).jpeg",
  "WhatsApp Image 2026-11-01 at 7.11.24 AM (2).jpeg",
];

const messages = [
  {
    eyebrow: "POWERING EVERYDAY LIFE",
    title: "Reliable power starts with the details.",
    text: "Electrical work planned around the space, the people, and the way you use it.",
  },
  {
    eyebrow: "MADE FOR YOUR SPACE",
    title: "Bring every room to life.",
    text: "From practical installations to considered lighting, we help make spaces work better.",
  },
  {
    eyebrow: "BUILT ON GOOD WORK",
    title: "Careful work. Lasting confidence.",
    text: "Our team brings attention and care to electrical projects at every stage.",
  },
  {
    eyebrow: "POWERING WHAT COMES NEXT",
    title: "Solutions for a brighter tomorrow.",
    text: "Explore electrical and renewable energy work shaped around your needs.",
  },
];

export function ProjectPhotoSlideshow() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const message = messages[activePhoto % messages.length];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActivePhoto((index) => (index + 1) % photos.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const moveBy = (amount: number) => {
    setActivePhoto((index) => (index + amount + photos.length) % photos.length);
  };

  return (
    <section
      aria-label="Project photo slideshow"
      className="relative isolate min-h-[540px] overflow-hidden bg-[#101518] text-white sm:min-h-[610px]"
    >
      <div
        key={photos[activePhoto]}
        className="absolute inset-0 animate-[project-photo-zoom_7s_ease-out_forwards]"
      >
        <Image
          alt="Habitech Power Limited project site"
          className="object-cover object-center"
          fill
          sizes="100vw"
          src={`/${encodeURIComponent(photos[activePhoto])}`}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#081018]/90 via-[#081018]/65 to-[#081018]/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#081018]/55 via-transparent to-[#081018]/15"
      />
      <div className="relative z-10 mx-auto flex min-h-[540px] w-[min(1180px,calc(100%_-_2rem))] flex-col justify-center py-16 sm:min-h-[610px] sm:w-[min(1180px,calc(100%_-_4rem))]">
        <div
          key={message.title}
          className="max-w-[690px] animate-[project-copy-enter_.7s_ease-out_both]"
        >
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-habitech-green-bright">
            {message.eyebrow}
          </p>
          <h2 className="max-w-[650px] text-[clamp(38px,8vw,70px)] font-bold leading-[1.02] tracking-[-.055em]">
            {message.title}
          </h2>
          <p className="mt-5 max-w-[500px] text-sm leading-relaxed text-slate-200 sm:text-base">
            {message.text}
          </p>
        </div>
        <div className="mt-9 flex items-center gap-3">
          <button
            aria-label="Show previous project photo"
            className="grid h-10 w-10 place-items-center rounded-full border-[1px] border-white/40 bg-black/20 transition hover:border-habitech-green-bright hover:bg-habitech-green-bright hover:text-habitech-ink"
            onClick={() => moveBy(-1)}
            type="button"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            className="grid h-10 w-10 place-items-center rounded-full border-[1px] border-white/40 bg-black/20 transition hover:border-habitech-green-bright hover:bg-habitech-green-bright hover:text-habitech-ink"
            onClick={() => setIsPlaying((playing) => !playing)}
            type="button"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            aria-label="Show next project photo"
            className="grid h-10 w-10 place-items-center rounded-full border-[1px] border-white/40 bg-black/20 transition hover:border-habitech-green-bright hover:bg-habitech-green-bright hover:text-habitech-ink"
            onClick={() => moveBy(1)}
            type="button"
          >
            <ArrowRight size={17} />
          </button>
          <span
            aria-live="polite"
            className="ml-2 text-[10px] font-bold tracking-[.12em] text-white/80"
          >
            {String(activePhoto + 1).padStart(2, "0")} /{" "}
            {String(photos.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
