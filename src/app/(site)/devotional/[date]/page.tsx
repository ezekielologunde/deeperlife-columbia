import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDevotionalByDate } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const devotional = await getDevotionalByDate(date);
  if (!devotional) notFound();
  return {
    title: `${devotional.title} — ${formatDate(devotional.date)}`,
    description: devotional.keyVerse.replace(/\n/g, " "),
  };
}

export default async function DevotionalByDatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const devotional = await getDevotionalByDate(date);

  if (!devotional) notFound();

  return (
    <>
      <PageHero title={devotional.title} subtitle={formatDate(devotional.date)} />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            {devotional.bibleReading && (
              <p className="text-sm font-semibold text-indigo-500">
                Bible Reading: {devotional.bibleReading}
              </p>
            )}
            <blockquote className="mt-6 border-l-4 border-indigo-200 pl-5 italic leading-7 text-slate-700">
              {devotional.keyVerse
                .split("\n")
                .filter(Boolean)
                .map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
            </blockquote>

            <div className="prose prose-slate mt-8 max-w-none">
              {devotional.body
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p key={i} className="mt-4 leading-7 text-slate-700 first:mt-0">
                    {paragraph}
                  </p>
                ))}
            </div>

            {devotional.thoughtOfDay && (
              <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  Thought for the Day
                </p>
                <p className="mt-2 leading-7 text-indigo-950">
                  {devotional.thoughtOfDay}
                </p>
              </div>
            )}

            {devotional.bibleInOneYear && (
              <p className="mt-6 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">
                  Bible in One Year:
                </span>{" "}
                {devotional.bibleInOneYear}
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
                ← Back to Archive
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
