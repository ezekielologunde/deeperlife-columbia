import type { Metadata } from "next";
import Link from "next/link";
import { getTodayDevotional } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Daily Devotional",
  description:
    "Today's DCLM Daily Manna devotional — Bible-based teaching for daily Christian living.",
};

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function DevotionalPage() {
  const result = await getTodayDevotional();

  return (
    <>
      <PageHero
        title="Daily Devotional"
        subtitle="DCLM Daily Manna — a daily portion of God's Word for your walk with Christ."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          {result ? (
            <Reveal>
              {!result.isToday && (
                <p className="mb-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  Today&apos;s devotional hasn&apos;t synced yet. Showing the
                  most recent one below.
                </p>
              )}
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                {formatDate(result.devotional.date)}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
                {result.devotional.title}
              </h1>
              {result.devotional.bibleReading && (
                <p className="mt-3 text-sm font-semibold text-indigo-500">
                  Bible Reading: {result.devotional.bibleReading}
                </p>
              )}
              <blockquote className="mt-6 border-l-4 border-indigo-200 pl-5 italic leading-7 text-slate-700">
                {result.devotional.keyVerse
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
              </blockquote>

              <div className="prose prose-slate mt-8 max-w-none">
                {result.devotional.body
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p key={i} className="mt-4 leading-7 text-slate-700 first:mt-0">
                      {paragraph}
                    </p>
                  ))}
              </div>

              {result.devotional.thoughtOfDay && (
                <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                    Thought for the Day
                  </p>
                  <p className="mt-2 leading-7 text-indigo-950">
                    {result.devotional.thoughtOfDay}
                  </p>
                </div>
              )}

              {result.devotional.bibleInOneYear && (
                <p className="mt-6 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Bible in One Year:
                  </span>{" "}
                  {result.devotional.bibleInOneYear}
                </p>
              )}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                <p className="text-xs text-slate-400">
                  Source: DCLM Daily Manna —{" "}
                  <a
                    href="https://www.dailymanna.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-slate-600"
                  >
                    dailymanna.app
                  </a>
                </p>
                <Link
                  href="/devotional/archive"
                  className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  View past devotionals →
                </Link>
              </div>
            </Reveal>
          ) : (
            <p className="text-center text-slate-500">
              No devotional available yet. Please check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
