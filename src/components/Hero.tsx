"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden text-white lg:min-h-screen">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
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
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-28 text-center sm:py-36">
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
          <a
            href="/contact"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-indigo-900 transition-all hover:scale-105 hover:bg-indigo-100"
          >
            Plan a Visit
          </a>
          <a
            href="/services"
            className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
          >
            Service Times
          </a>
        </motion.div>

        <div className="mt-14 flex justify-center gap-1">
          {SLIDES.map((slide, i) => (
            <button
              key={slide}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
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
