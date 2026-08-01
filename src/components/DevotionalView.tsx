import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Devotional } from "@/lib/data";

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DevotionalView({
  devotional,
  isToday = true,
  archiveHref,
}: {
  devotional: Devotional;
  isToday?: boolean;
  archiveHref: string;
}) {
  return (
    <Reveal>
      {!isToday && (
        <p className="mb-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Today&apos;s devotional hasn&apos;t synced yet. Showing the most
          recent one below.
        </p>
      )}
      <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
        {formatDate(devotional.date)}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
        {devotional.title}
      </h1>
      {devotional.bibleReading && (
        <p className="mt-3 text-sm font-semibold text-indigo-500">
          Bible Reading: {devotional.bibleReading}
        </p>
      )}

      {devotional.audioUrl && (
        <audio
          controls
          preload="none"
          src={devotional.audioUrl}
          className="mt-6 w-full"
        >
          Your browser does not support the audio element.
        </audio>
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
          href={archiveHref}
          className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
        >
          {archiveHref.endsWith("/archive")
            ? "View past devotionals →"
            : "← Back to Archive"}
        </Link>
      </div>
    </Reveal>
  );
}
