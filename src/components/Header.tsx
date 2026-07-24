"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/beliefs", label: "Beliefs" },
  { href: "/services", label: "Service Times" },
  { href: "/join-online", label: "Join Online" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/sermons", label: "Sermons" },
  { href: "/posts", label: "Posts" },
  { href: "/give", label: "Give" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-all duration-300 ${
        scrolled ? "border-slate-200 shadow-sm" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Link href="/" aria-label="Deeper Life Bible Church Columbia home">
          <Logo variant="dark" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-slate-700 transition-colors hover:text-indigo-900"
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-indigo-900"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-indigo-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
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
          <div className="relative h-4 w-5">
            <motion.span
              animate={open ? { rotate: 45, top: "50%" } : { rotate: 0, top: "0%" }}
              className="absolute left-0 block h-0.5 w-5 -translate-y-1/2 bg-slate-800"
              style={{ top: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-slate-800"
              transition={{ duration: 0.15 }}
            />
            <motion.span
              animate={open ? { rotate: -45, top: "50%" } : { rotate: 0, top: "100%" }}
              className="absolute left-0 block h-0.5 w-5 -translate-y-1/2 bg-slate-800"
              style={{ top: "100%" }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${
                    pathname === link.href
                      ? "font-semibold text-indigo-900"
                      : "text-slate-700"
                  }`}
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
