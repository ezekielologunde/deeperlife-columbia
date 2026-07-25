"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "@/components/Logo";

type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: undefined; children: { href: string; label: string }[] };

const NAV: NavItem[] = [
  {
    label: "About",
    children: [
      { href: "/about", label: "Our Story" },
      { href: "/beliefs", label: "Statement of Faith" },
    ],
  },
  {
    label: "Worship",
    children: [
      { href: "/services", label: "Service Times" },
      { href: "/join-online", label: "Join Online" },
      { href: "/events", label: "Events" },
    ],
  },
  { label: "Ministries", href: "/ministries" },
  {
    label: "Media",
    children: [
      { href: "/sermons", label: "Sermons" },
      { href: "/posts", label: "Posts" },
    ],
  },
  { label: "Give", href: "/give" },
];

const ALL_LINKS = NAV.flatMap((item) =>
  item.children ? item.children : [{ href: item.href, label: item.label }],
);

function isGroupActive(item: NavItem, pathname: string) {
  if (item.children) return item.children.some((c) => pathname === c.href);
  return pathname === item.href;
}

function NavDropdown({
  item,
  active,
  openMenu,
  setOpenMenu,
}: {
  item: Extract<NavItem, { children: unknown }>;
  active: boolean;
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
}) {
  const isOpen = openMenu === item.label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpenMenu(isOpen ? null : item.label)}
        className={`flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          active || isOpen
            ? "bg-white text-indigo-900 shadow-sm"
            : "text-slate-600 hover:text-indigo-900"
        }`}
      >
        {item.label}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M3 4.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-lg"
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpenMenu(null)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-900"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const navRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setOpen(false);
  }, [pathname]);

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

        <nav
          ref={navRef}
          className="hidden items-center gap-1 rounded-full bg-slate-100/80 p-1.5 lg:flex"
        >
          {NAV.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                item={item}
                active={isGroupActive(item, pathname)}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-white text-indigo-900 shadow-sm"
                    : "text-slate-600 hover:text-indigo-900"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-indigo-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800 lg:inline-block"
        >
          Plan a Visit
        </Link>

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
            <div className="flex flex-col gap-1 px-6 py-4">
              {ALL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-indigo-50 font-semibold text-indigo-900"
                      : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-indigo-900 px-5 py-2 text-center text-sm font-semibold text-white"
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
