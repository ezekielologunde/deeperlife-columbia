import type { Metadata } from "next";
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
        eyebrow="Zoom"
        title="Join Us on Zoom"
        subtitle="Monday Bible Study, Friday Revival Hour, and other midweek meetings are held online."
      />

      <section className="bg-indigo-950 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Zoom Meeting Details
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-indigo-200">
                Use the link below to join us live. Everyone is welcome, no
                Zoom account required.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={CHURCH.zoom.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-amber-300"
                >
                  Join Zoom Meeting
                </a>
                <div className="text-sm text-indigo-200">
                  <p>
                    <span className="font-semibold text-white">
                      Meeting ID:
                    </span>{" "}
                    {CHURCH.zoom.meetingId}
                  </p>
                  <p>
                    <span className="font-semibold text-white">
                      Passcode:
                    </span>{" "}
                    {CHURCH.zoom.passcode}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 text-sm text-indigo-200">
                <p className="font-semibold text-white">
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
        </div>
      </section>
    </>
  );
}
