import type { Metadata } from "next";
import { MINISTRIES } from "@/lib/ministries";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Ministries | Deeper Life Bible Church Columbia",
  description: "There's a place for everyone to grow and serve.",
};

export default function MinistriesPage() {
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
                <div className="h-full rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-lg font-bold text-indigo-950">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {m.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
