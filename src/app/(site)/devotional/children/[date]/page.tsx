import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDevotionalByDate } from "@/lib/data";
import PageHero from "@/components/PageHero";
import DevotionalView from "@/components/DevotionalView";

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
  const devotional = await getDevotionalByDate(date, "Children");
  if (!devotional) notFound();
  return {
    title: `${devotional.title} — ${formatDate(devotional.date)}`,
    description: devotional.keyVerse.replace(/\n/g, " "),
  };
}

export default async function ChildrenDevotionalByDatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const devotional = await getDevotionalByDate(date, "Children");

  if (!devotional) notFound();

  return (
    <>
      <PageHero title={devotional.title} subtitle={formatDate(devotional.date)} />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <DevotionalView
            devotional={devotional}
            archiveHref="/devotional/children/archive"
          />
        </div>
      </section>
    </>
  );
}
