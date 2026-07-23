"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Service Times" },
  { href: "/join-online", label: "Join Online" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/sermons", label: "Sermons" },
  { href: "/give", label: "Give" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Deeper Life Bible Church Columbia home">
          <Logo variant="dark" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-indigo-900"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-indigo-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
          >
            Plan a Visit
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 lg:hidden"
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-slate-800" />
            <span className="block h-0.5 w-5 bg-slate-800" />
            <span className="block h-0.5 w-5 bg-slate-800" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-indigo-900 px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Plan a Visit
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
