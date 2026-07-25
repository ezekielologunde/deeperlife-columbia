import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMinistriesData } from "@/lib/data";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Ministries",
  description: "There's a place for everyone to grow and serve.",
};

export default async function MinistriesPage() {
  const MINISTRIES = await getMinistriesData();

  return (
    <>
      <PageHero
        title="Ministries"
        subtitle="There's a place for everyone to grow and serve."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.map((m) => (
              <StaggerItem key={m.title}>
                <Link
                  href={`/ministries/${m.slug}`}
                  className="group block h-full overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {m.image && (
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-indigo-950">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {m.desc}
                    </p>
                    {m.meetingTime && (
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-indigo-500">
                        {m.meetingTime}
                      </p>
                    )}
                    {m.ctaText && (
                      <p className="mt-2 text-sm font-semibold text-indigo-700">
                        {m.ctaText} →
                      </p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
