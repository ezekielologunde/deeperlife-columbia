import type { Metadata } from "next";
import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Give | Deeper Life Bible Church Columbia",
  description: "Give your tithes and offerings online via Zelle.",
};

export default function GivePage() {
  return (
    <>
      <PageHero title="Tithes & Offerings" />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <p className="mx-auto max-w-xl text-slate-600">
              &ldquo;Bring ye all the tithes into the storehouse&rdquo; —
              Malachi 3:10. Thank you for sowing into the work of God through
              this ministry.
            </p>
            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-slate-200 bg-indigo-950 p-8 text-white shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                Give via Zelle
              </p>
              <p className="mt-2 text-xl font-bold text-white">
                {CHURCH.giving.zelleId}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
