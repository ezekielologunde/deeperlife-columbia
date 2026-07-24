import Link from "next/link";
import type { ReactNode } from "react";

type BentoCardProps = {
  href?: string;
  external?: boolean;
  variant?: "dark" | "light" | "amber";
  eyebrow?: string;
  title: string;
  desc?: string;
  className?: string;
  children?: ReactNode;
};

const VARIANTS = {
  dark: "bg-indigo-900/60 border-white/10 text-white hover:bg-indigo-900/80",
  light: "bg-white border-slate-200 text-indigo-950 hover:shadow-lg",
  amber:
    "bg-gradient-to-br from-amber-500/20 to-indigo-900/60 border-amber-400/20 text-white hover:from-amber-500/30",
};

export default function BentoCard({
  href,
  external,
  variant = "dark",
  eyebrow,
  title,
  desc,
  className = "",
  children,
}: BentoCardProps) {
  const content = (
    <>
      {href && (
        <span
          aria-hidden
          className={`absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
            variant === "light"
              ? "border-slate-200 text-indigo-950"
              : "border-white/20 text-white"
          }`}
        >
          ↗
        </span>
      )}
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            variant === "light" ? "text-indigo-500" : "text-amber-300"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h3 className="mt-2 max-w-[85%] text-xl font-bold leading-tight sm:text-2xl">
        {title}
      </h3>
      {desc && (
        <p
          className={`mt-2 max-w-sm text-sm leading-6 ${
            variant === "light" ? "text-slate-600" : "text-indigo-200"
          }`}
        >
          {desc}
        </p>
      )}
      {children}
    </>
  );

  const classes = `group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${VARIANTS[variant]} ${className}`;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
