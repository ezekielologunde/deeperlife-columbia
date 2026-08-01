import type { Metadata } from "next";
import { getDevotionalArchive } from "@/lib/data";
import PageHero from "@/components/PageHero";
import DevotionalArchiveList from "@/components/DevotionalArchiveList";

export const metadata: Metadata = {
  title: "Devotional Archive",
  description: "Browse past Daily Manna devotionals.",
};

export default async function DevotionalArchivePage() {
  const entries = await getDevotionalArchive("Adult");

  return (
    <>
      <PageHero
        title="Devotional Archive"
        subtitle="Browse past Daily Manna devotionals."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <DevotionalArchiveList entries={entries} basePath="/devotional" />
        </div>
      </section>
    </>
  );
}
