import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming programs, conventions, and events at Deeper Life Bible Church, a Bible church in Columbia, Maryland.",
};

const GLOBAL_PROGRAMS = [
  {
    title: "Global Crusade with Kumuyi (GCK)",
    desc: "Worldwide gospel crusades and revival meetings with Pastor W. F. Kumuyi.",
    href: "https://gckhq.org/",
    cta: "Visit GCK",
  },
  {
    title: "DCLM Events",
    desc: "Conventions, congresses, and special programs from DCLM headquarters.",
    href: "https://dclm.org/events/",
    cta: "See all events",
  },
  {
    title: "DCLM Webcast",
    desc: "Watch live services and global programs from anywhere in the world.",
    href: "https://webcast.dclm.org/",
    cta: "Watch live",
  },
];

// Re-render hourly so an event that has ended drops off by itself.
export const revalidate = 3600;

export default async function EventsPage() {
  const CHURCH = await getChurchData();

  return (
    <>
      <PageHero
        title="Upcoming Program"
        subtitle="Join us for these special citywide and global gatherings."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl divide-y divide-slate-100 px-6">
          {CHURCH.upcomingEvents.map((event) => (
            <div key={event.id} className="py-20">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <Reveal direction="left">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                    <Lightbox src={event.flyer} alt={event.title}>
                      <Image
                        src={event.flyer}
                        alt={event.title}
                        width={900}
                        height={1200}
                        className="h-auto w-full"
                      />
                    </Lightbox>
                  </div>
                </Reveal>

                <Reveal direction="right" delay={0.15}>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                      {[event.date, event.time].filter(Boolean).join(" · ")}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-indigo-950">
                      {event.title}
                    </h2>
                    {event.subtitle && (
                      <p className="mt-2 text-slate-700">{event.subtitle}</p>
                    )}
                    {event.venue && (
                      <p className="mt-2 text-sm font-medium text-slate-600">
                        {event.venue}
                      </p>
                    )}
                    {event.description && (
                      <p className="mt-4 leading-7 text-slate-700">
                        {event.description}
                      </p>
                    )}
                    {event.verse && (
                      <p className="mt-4 text-sm italic leading-6 text-slate-600">
                        {event.verse}
                      </p>
                    )}
                    {event.host && (
                      <p className="mt-4 text-sm text-slate-500">{event.host}</p>
                    )}

                    {event.link && (
                      <div className="mt-6 flex flex-wrap gap-4">
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
                        >
                          Learn More
                        </a>
                      </div>
                    )}

                    {event.video && (
                      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video
                          src={event.video}
                          controls
                          playsInline
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
          <div className="py-10 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <h2 className="text-center text-2xl font-bold tracking-tight text-indigo-950">
              Global DCLM Programs
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
              Join the wider Deeper Life family in worldwide gatherings led by
              Pastor W. F. Kumuyi.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {GLOBAL_PROGRAMS.map((p) => (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-bold text-indigo-950">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{p.desc}</p>
                <p className="mt-3 text-sm font-semibold text-indigo-700">
                  {p.cta} →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {CHURCH.pastEvents.length > 0 && (
        <section className="bg-indigo-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
              <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
                Past Events
              </h2>
            </Reveal>

            <div className="mt-10 space-y-6">
              {CHURCH.pastEvents.map((e) => (
                <Reveal key={e.title}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                      {e.date}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-indigo-950">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {e.venue}
                    </p>
                    <p className="mt-4 text-slate-700">{e.description}</p>
                    <p className="mt-4 text-sm italic leading-6 text-slate-600">
                      {e.verse}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                      <span>{e.phone}</span>
                      <a
                        href={`mailto:${e.email}`}
                        className="hover:text-indigo-700"
                      >
                        {e.email}
                      </a>
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-700 hover:text-indigo-900"
                      >
                        Event Details →
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
