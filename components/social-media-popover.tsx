"use client";

import { useId, useState } from "react";

function SocialLogo({ platform }: { platform: "TikTok" | "WhatsApp" }) {
  if (platform === "TikTok") {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.92-.02.08 1.53.63 2.8 1.64 3.7 1.1.95 2.5 1.39 3.92 1.52v4.27c-1.55-.05-3.1-.44-4.5-1.18-.61-.34-1.18-.73-1.74-1.14-.01 3.64.01 7.28-.02 10.91-.08 1.74-.66 3.48-1.71 4.87-1.66 2.31-4.55 3.82-7.42 3.57-1.62-.09-3.23-.65-4.52-1.63-2.15-1.62-3.47-4.3-3.43-6.99-.02-1.55.41-3.1 1.2-4.43 1.34-2.31 3.8-3.91 6.45-4.15 1.03-.1 2.07-.03 3.08.2.01 1.55-.04 3.1-.04 4.65-.69-.23-1.41-.42-2.14-.39-1.67.06-3.18 1.27-3.47 2.92-.2 1.3.28 2.68 1.34 3.49 1.05.82 2.6 1.02 3.83.51 1.32-.55 2.25-1.89 2.25-3.34.02-5.59-.01-11.18.02-16.77z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2a9.92 9.92 0 0 0-8.53 15l-1.1 4.02 4.12-1.08A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-2.44.64.65-2.38-.19-.3A8 8 0 1 1 12 20Zm4.39-5.97c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.31.98 2.47c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.11.15 1.53.09.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

const socialLinks = [
  {
    platform: "TikTok" as const,
    description: "Follow Habitech Power",
    href: "https://www.tiktok.com/@habitechpower",
  },
  {
    platform: "WhatsApp" as const,
    description: "Chat with our team",
    href: "https://wa.me/2347037669919",
  },
];

export function SocialMediaPopover({
  variant = "hero",
}: {
  variant?: "hero" | "nav" | "mobile-nav";
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const isHero = variant === "hero";
  const isMobileNav = variant === "mobile-nav";

  return (
    <div
      className={
        isHero
          ? "absolute bottom-5 right-5 z-10 sm:bottom-[26px] sm:right-[max(32px,calc((100vw-1180px)/2))]"
          : "relative z-20"
      }
    >
      {open && (
        <div
          className={`absolute ${isHero ? "bottom-full mb-3" : "top-full mt-3"} right-0 w-64 rounded-[10px] border-[1px] border-black/30 bg-white p-2 text-habitech-ink shadow-xl`}
          id={menuId}
          role="menu"
        >
          <p className="px-3 pb-2 pt-1 text-[9px] font-extrabold uppercase tracking-[.14em] text-habitech-muted">
            Connect with Habitech
          </p>
          {socialLinks.map(({ platform, description, href }) => (
            <a
              className="flex items-center gap-3 rounded-md px-3 py-2.5 transition hover:bg-[#eff8e8]"
              href={href}
              key={platform}
              onClick={() => setOpen(false)}
              rel="noreferrer"
              role="menuitem"
              target="_blank"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-habitech-green/10 text-habitech-green-dark">
                <SocialLogo platform={platform} />
              </span>
              <span className="flex flex-col">
                <strong className="text-xs font-bold">{platform}</strong>
                <small className="text-[10px] text-habitech-muted">
                  {description}
                </small>
              </span>
            </a>
          ))}
        </div>
      )}
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        className={
          isHero
            ? "inline-flex min-h-10 items-center gap-2 rounded-full bg-habitech-green-bright px-4 text-[9px] font-extrabold uppercase tracking-[.12em] text-habitech-ink shadow-lg transition hover:-translate-y-0.5 hover:bg-[#75d53c] sm:min-h-11 sm:text-[10px]"
            : isMobileNav
              ? "flex w-full cursor-pointer items-center p-3 text-left text-xs text-slate-100 transition hover:bg-white/10 hover:text-habitech-green-bright"
              : "inline-flex items-center text-[10px] font-bold uppercase tracking-[.055em] text-slate-200 transition hover:text-habitech-green-bright"
        }
        onClick={() => setOpen((isOpen) => !isOpen)}
        type="button"
      >
        {isHero ? "Explore our social media" : "Socials"}
      </button>
    </div>
  );
}
