import type { Metadata } from "next";
import { getTodayDevotional } from "@/lib/data";
import PageHero from "@/components/PageHero";
import DevotionalView from "@/components/DevotionalView";
import DevotionalAudienceSwitch from "@/components/DevotionalAudienceSwitch";

export const metadata: Metadata = {
  title: "Children's Devotional",
  description:
    "Today's DCLM Sincere Milk devotional — Bible-based teaching for children.",
};

export default async function ChildrenDevotionalPage() {
  const result = await getTodayDevotional("Children");

  return (
    <>
      <PageHero
        title="Children's Devotional"
        subtitle="Sincere Milk — a daily word for our youngest disciples."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <DevotionalAudienceSwitch active="Children" />
          {result ? (
            <DevotionalView
              devotional={result.devotional}
              isToday={result.isToday}
              archiveHref="/devotional/children/archive"
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
