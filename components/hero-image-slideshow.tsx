"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImages = [
  "/electrician-hero.png",
  "/WhatsApp Image 2026-11-01 at 7.09.22 AM (1).jpeg",
  "/WhatsApp Image 2026-11-01 at 7.09.20 AM (1).jpeg",
];

export function HeroImageSlideshow() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((index) => (index + 1) % heroImages.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      {heroImages.map((src, index) => (
        <Image
          alt=""
          aria-hidden="true"
          className={`-z-20 object-cover object-[65%_50%] transition-[opacity,transform] duration-[1200ms] md:object-[64%_43%] ${
            activeImage === index
              ? "scale-[1.04] opacity-100"
              : "scale-100 opacity-0"
          }`}
          fill
          key={src}
          priority={index === 0}
          sizes="100vw"
          src={src}
        />
      ))}
    </>
  );
}
