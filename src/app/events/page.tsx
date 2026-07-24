import type { Metadata } from "next";
import Image from "next/image";
import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Upcoming Program | Deeper Life Bible Church Columbia",
  description: CHURCH.upcomingEvent.title,
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Coming Up"
        title="Upcoming Program"
        subtitle="Join us for this special citywide and global gathering."
      />

      <section className="bg-indigo-950 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={CHURCH.upcomingEvent.flyer}
                  alt={CHURCH.upcomingEvent.title}
                  width={900}
                  height={1200}
                  className="h-auto w-full"
                />
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">
                  {CHURCH.upcomingEvent.date} · {CHURCH.upcomingEvent.time}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {CHURCH.upcomingEvent.title}
                </h2>
                <p className="mt-2 text-indigo-100">
                  {CHURCH.upcomingEvent.subtitle}
                </p>
                <p className="mt-4 text-sm italic leading-6 text-indigo-300">
                  {CHURCH.upcomingEvent.verse}
                </p>
                <p className="mt-4 text-sm text-indigo-300">
                  {CHURCH.upcomingEvent.host}
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={CHURCH.upcomingEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-amber-300"
                  >
                    Learn More
                  </a>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <video
                    src={CHURCH.upcomingEvent.video}
                    controls
                    playsInline
                    className="w-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
