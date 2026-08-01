import type { Metadata } from "next";
import { getTodayDevotional } from "@/lib/data";
import PageHero from "@/components/PageHero";
import DevotionalView from "@/components/DevotionalView";

export const metadata: Metadata = {
  title: "Youth Devotional",
  description:
    "Today's DCLM Higher Everyday devotional — Bible-based teaching for young people.",
};

export default async function YouthDevotionalPage() {
  const result = await getTodayDevotional("Youth");

  return (
    <>
      <PageHero
        title="Youth Devotional"
        subtitle="Higher Everyday — a daily word for young people growing in Christ."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          {result ? (
            <DevotionalView
              devotional={result.devotional}
              isToday={result.isToday}
              archiveHref="/devotional/youth/archive"
            />
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
