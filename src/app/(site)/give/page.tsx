import type { Metadata } from "next";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CopyButton from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Give",
  description: "Give your tithes and offerings online via Zelle.",
};

const STEPS = [
  {
    title: "Open your bank's app",
    desc: "Zelle is already built into most banking apps — no separate download needed.",
  },
  {
    title: "Send to our Zelle ID",
    desc: "Enter the email address below as the recipient.",
  },
  {
    title: "Enter your amount & send",
    desc: "That's it — your gift goes directly to the church, with no fees.",
  },
];

export default async function GivePage() {
  const CHURCH = await getChurchData();

  return (
    <>
      <PageHero
        title="Tithes & Offerings"
        subtitle="Thank you for sowing into the work of God through this ministry."
      />

      <section className="bg-gradient-to-br from-amber-50 via-white to-indigo-50">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <p className="mx-auto max-w-xl text-center text-lg leading-8 text-slate-700">
              &ldquo;Bring ye all the tithes into the storehouse&rdquo; —
              Malachi 3:10. Every gift helps sustain worship, outreach, and
              ministry here in Columbia and beyond.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-3xl bg-indigo-950 shadow-2xl">
              <div className="p-10 text-center sm:p-14">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M4 6h16M4 6l4 6-4 6M20 6l-4 6 4 6M9 18h6"
                      stroke="#fcd34d"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
                  Give via Zelle
                </p>
                <p className="mt-3 break-words text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {CHURCH.giving.zelleId}
                </p>
                <p className="mt-2 text-sm text-indigo-300">
                  {CHURCH.name}
                </p>
                <CopyButton
                  value={CHURCH.giving.zelleId}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-sm font-bold text-indigo-950 transition-all hover:scale-105 hover:bg-amber-300"
                />
                <p className="mt-5 text-xs text-indigo-300">
                  No fees. 100% goes directly to the church.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-14 grid max-w-2xl gap-6 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="text-center">
                  <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-indigo-900 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-3 font-semibold text-indigo-950">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-sm text-slate-600">
                Questions about giving?{" "}
                <a
                  href="/contact"
                  className="font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  Contact us →
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
