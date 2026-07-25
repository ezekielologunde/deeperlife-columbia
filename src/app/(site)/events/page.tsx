import type { Metadata } from "next";
import Image from "next/image";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import RsvpForm from "@/components/RsvpForm";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming programs, conventions, and events at Deeper Life Bible Church, a Bible church in Columbia, Maryland.",
};

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
                    <Image
                      src={event.flyer}
                      alt={event.title}
                      width={900}
                      height={1200}
                      className="h-auto w-full"
                    />
                  </div>
                </Reveal>

                <Reveal direction="right" delay={0.15}>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                      {event.date} · {event.time}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-indigo-950">
                      {event.title}
                    </h2>
                    <p className="mt-2 text-slate-700">{event.subtitle}</p>
                    <p className="mt-4 text-sm italic leading-6 text-slate-600">
                      {event.verse}
                    </p>
                    <p className="mt-4 text-sm text-slate-500">{event.host}</p>

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

                    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <video
                        src={event.video}
                        controls
                        playsInline
                        className="w-full"
                      />
                    </div>

                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <h3 className="font-bold text-indigo-950">
                        Save Your Spot
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Let us know you&apos;re coming.
                      </p>
                      <div className="mt-4">
                        <RsvpForm eventId={event.id} eventTitle={event.title} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
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
