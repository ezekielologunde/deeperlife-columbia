import type { Metadata } from "next";
import { CHURCH } from "@/lib/church";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Service Times | Deeper Life Bible Church Columbia",
  description: "Join us for worship — everyone is welcome, come as you are.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Every Week"
        title="Join Us for Worship"
        subtitle="Everyone is welcome — come as you are."
      />

      <section className="bg-indigo-950 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHURCH.services.map((s) => (
              <StaggerItem key={s.name}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
                    {s.name}
                  </p>
                  <p className="mt-3 text-lg font-bold text-white">
                    {s.time}
                  </p>
                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      s.mode === "In Person"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-indigo-400/15 text-indigo-200"
                    }`}
                  >
                    {s.mode}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <div className="mt-10 text-center text-sm text-indigo-300">
            Zoom-only meetings? Find the link on our{" "}
            <a
              href="/join-online"
              className="font-semibold text-amber-300 hover:text-amber-200"
            >
              Join Online
            </a>{" "}
            page.
          </div>
        </div>
      </section>
    </>
  );
}
