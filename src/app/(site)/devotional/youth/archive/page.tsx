import type { Metadata } from "next";
import { getDevotionalArchive } from "@/lib/data";
import PageHero from "@/components/PageHero";
import DevotionalArchiveList from "@/components/DevotionalArchiveList";

export const metadata: Metadata = {
  title: "Youth Devotional Archive",
  description: "Browse past Higher Everyday youth devotionals.",
};

export default async function YouthDevotionalArchivePage() {
  const entries = await getDevotionalArchive("Youth");

  return (
    <>
      <PageHero
        title="Youth Devotional Archive"
        subtitle="Browse past Higher Everyday devotionals."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <DevotionalArchiveList
            entries={entries}
            basePath="/devotional/youth"
          />
        </div>
      </section>
    </>
  );
}
