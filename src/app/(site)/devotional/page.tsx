import type { Metadata } from "next";
import { getTodayDevotional } from "@/lib/data";
import PageHero from "@/components/PageHero";
import DevotionalView from "@/components/DevotionalView";
import DevotionalAudienceSwitch from "@/components/DevotionalAudienceSwitch";

export const metadata: Metadata = {
  title: "Daily Devotional",
  description:
    "Today's DCLM Daily Manna devotional — Bible-based teaching for daily Christian living.",
};

export default async function DevotionalPage() {
  const result = await getTodayDevotional("Adult");

  return (
    <>
      <PageHero
        title="Daily Devotional"
        subtitle="DCLM Daily Manna — a daily portion of God's Word for your walk with Christ."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <DevotionalAudienceSwitch active="Adult" />
          {result ? (
            <DevotionalView
              devotional={result.devotional}
              isToday={result.isToday}
              archiveHref="/devotional/archive"
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
