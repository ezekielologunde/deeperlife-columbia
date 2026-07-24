"use client";

import { motion } from "framer-motion";
import { CHURCH } from "@/lib/church";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_45%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-40">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300"
        >
          Welcome to
        </motion.p>

        <div className="mt-6 flex gap-6">
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-1 origin-top rounded-full bg-amber-400"
          />
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
            >
              {CHURCH.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg leading-8 text-indigo-100"
            >
              {CHURCH.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="/contact"
                className="rounded-full bg-amber-400 px-8 py-3 text-center text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-amber-300"
              >
                Plan Your Visit
              </a>
              <a
                href="/services"
                className="rounded-full border border-white/30 px-8 py-3 text-center text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
              >
                Service Times
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
