"use client";

import Image from "next/image";
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

      <div className="relative mx-auto max-w-6xl px-6 py-28 text-center sm:py-36">
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
          {CHURCH.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100"
        >
          {CHURCH.tagline}
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
            Plan Your Visit
          </a>
          <a
            href="/services"
            className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
          >
            Service Times
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-indigo-950/50"
        >
          <Image
            src="/images/gallery/congregation-wide.jpg"
            alt="Congregation gathered for worship at Deeper Life Bible Church Columbia"
            width={1200}
            height={700}
            priority
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
