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
        title="Join Us for Worship"
        subtitle="Everyone is welcome — come as you are."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CHURCH.services.map((s) => (
              <StaggerItem key={s.name}>
                <div className="h-full rounded-2xl border border-slate-200 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                    {s.name}
                  </p>
                  <p className="mt-3 text-lg font-bold text-indigo-950">
                    {s.time}
                  </p>
                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      s.mode === "In Person"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {s.mode}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <div className="mt-10 text-center text-sm text-slate-500">
            Zoom-only meetings? Find the link on our{" "}
            <a
              href="/join-online"
              className="font-semibold text-indigo-700 hover:text-indigo-900"
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
