import type { Metadata } from "next";
import Image from "next/image";
import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Join Online | Deeper Life Bible Church Columbia",
  description: "Join our midweek meetings on Zoom.",
};

export default function JoinOnlinePage() {
  return (
    <>
      <PageHero
        title="Join Us on Zoom"
        subtitle="Monday Bible Study, Friday Revival Hour, and other midweek meetings are held online."
      />

      <section className="bg-indigo-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-indigo-950">
                Zoom Meeting Details
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Use the link below to join us live. Everyone is welcome, no
                Zoom account required.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={CHURCH.zoom.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
                >
                  Join Zoom Meeting
                </a>
                <div className="text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-indigo-950">
                      Meeting ID:
                    </span>{" "}
                    {CHURCH.zoom.meetingId}
                  </p>
                  <p>
                    <span className="font-semibold text-indigo-950">
                      Passcode:
                    </span>{" "}
                    {CHURCH.zoom.passcode}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-600">
                <p className="font-semibold text-indigo-950">
                  Online meeting schedule
                </p>
                <ul className="mt-2 space-y-1">
                  {CHURCH.services
                    .filter((s) => s.mode === "Zoom Only")
                    .map((s) => (
                      <li key={s.name}>
                        {s.name} — {s.time}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src="/images/gallery/prayer.jpg"
                alt="Members of Deeper Life Bible Church Columbia in prayer"
                width={800}
                height={1000}
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
