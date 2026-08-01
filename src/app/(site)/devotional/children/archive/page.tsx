import type { Metadata } from "next";
import { getDevotionalArchive } from "@/lib/data";
import PageHero from "@/components/PageHero";
import DevotionalArchiveList from "@/components/DevotionalArchiveList";

export const metadata: Metadata = {
  title: "Children's Devotional Archive",
  description: "Browse past Sincere Milk children's devotionals.",
};

export default async function ChildrenDevotionalArchivePage() {
  const entries = await getDevotionalArchive("Children");

  return (
    <>
      <PageHero
        title="Children's Devotional Archive"
        subtitle="Browse past Sincere Milk devotionals."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <DevotionalArchiveList
            entries={entries}
            basePath="/devotional/children"
          />
        </div>
      </section>
    </>
  );
}
