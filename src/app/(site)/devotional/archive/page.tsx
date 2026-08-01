import type { Metadata } from "next";
import Link from "next/link";
import { getDevotionalArchive } from "@/lib/data";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Devotional Archive",
  description: "Browse past Daily Manna devotionals.",
};

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function monthLabel(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default async function DevotionalArchivePage() {
  const entries = await getDevotionalArchive();

  const groups = new Map<string, typeof entries>();
  for (const entry of entries) {
    const key = monthLabel(entry.date);
    const list = groups.get(key) ?? [];
    list.push(entry);
    groups.set(key, list);
  }

  return (
    <>
      <PageHero
        title="Devotional Archive"
        subtitle="Browse past Daily Manna devotionals."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          {entries.length > 0 ? (
            <div className="space-y-12">
              {[...groups.entries()].map(([month, list]) => (
                <div key={month}>
                  <h2 className="text-lg font-bold text-indigo-950">{month}</h2>
                  <StaggerGrid className="mt-4 grid gap-3 sm:grid-cols-2">
                    {list.map((entry) => (
                      <StaggerItem key={entry.date}>
                        <Link
                          href={`/devotional/${entry.date}`}
                          className="block rounded-xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                            {formatDate(entry.date)}
                          </p>
                          <p className="mt-1 font-semibold text-indigo-950">
                            {entry.title}
                          </p>
                        </Link>
                      </StaggerItem>
                    ))}
                  </StaggerGrid>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">
              No past devotionals yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
