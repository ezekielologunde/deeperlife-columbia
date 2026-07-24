import type { Metadata } from "next";
import { CHURCH } from "@/lib/church";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Statement of Faith | Deeper Life Bible Church Columbia",
  description: "What we believe, as a Bible-based holiness church.",
};

export default function BeliefsPage() {
  return (
    <>
      <PageHero
        title="Statement of Faith"
        subtitle="What we believe, as members of Deeper Life Bible Church."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHURCH.statementOfFaith.map((belief, i) => (
              <StaggerItem key={belief.title}>
                <div className="h-full rounded-2xl border border-slate-200 p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-indigo-950">
                    {belief.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {belief.text}
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
