"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";
import { CHURCH } from "@/lib/church";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Service Times" },
  { href: "/join-online", label: "Join Online" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/sermons", label: "Sermons" },
  { href: "/give", label: "Give" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-indigo-950/80 px-3 py-2 shadow-lg shadow-indigo-950/20 backdrop-blur-md sm:px-5">
        <Link
          href="/"
          aria-label="Deeper Life Bible Church Columbia home"
          className="shrink-0"
        >
          <Logo variant="light" compact />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-indigo-100 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            aria-label="Plan your visit / directions"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 sm:flex"
          >
            📍
          </Link>
          <Link
            href="/contact"
            className="hidden shrink-0 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-indigo-950 transition-colors hover:bg-amber-300 lg:inline-block"
          >
            Plan a Visit
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-indigo-950/95 px-6 py-4 shadow-lg backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-amber-400 px-4 py-2 text-center text-sm font-semibold text-indigo-950"
            >
              Plan a Visit
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
