"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MagneticLink from "@/components/MagneticLink";

const SLIDES = [
  "/images/gallery/congregation-wide.jpg",
  "/images/gallery/choir-worship.jpg",
  "/images/gallery/fellowship.jpg",
  "/images/gallery/prayer.jpg",
  "/images/gallery/welcome.jpg",
];

export default function Hero({
  name,
  tagline,
}: {
  name: string;
  tagline: string;
}) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(!prefersReducedMotion);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 140],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] items-center overflow-hidden text-white lg:min-h-screen"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(!prefersReducedMotion)}
      onFocus={() => setPlaying(false)}
      onBlur={() => setPlaying(!prefersReducedMotion)}
    >
      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0 scale-110"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={SLIDES[index]}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/75 via-indigo-800/55 to-indigo-950/80" />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-6xl px-6 py-28 text-center sm:py-36"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300"
        >
          Welcome to
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100"
        >
          {tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticLink
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-100"
          >
            Plan a Visit
          </MagneticLink>
          <MagneticLink
            href="/services"
            className="inline-block rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Service Times
          </MagneticLink>
        </motion.div>

        <div className="mt-14 flex items-center justify-center gap-1">
          {SLIDES.map((slide, i) => (
            <button
              key={slide}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="ml-1 flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                <rect x="2" y="1" width="4" height="12" rx="1" />
                <rect x="8" y="1" width="4" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                <path d="M2.5 1.2c0-.9 1-1.5 1.8-1L12 6.2c.8.5.8 1.6 0 2.1l-7.7 5.5c-.8.5-1.8 0-1.8-1V1.2z" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: prefersReducedMotion ? 0 : [0, 8, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          y: prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
        aria-hidden
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
