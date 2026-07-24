import Image from "next/image";
import { CHURCH } from "@/lib/church";
import { MINISTRIES } from "@/lib/ministries";
import Reveal from "@/components/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import Hero from "@/components/Hero";
import SnapScrollToggle from "@/components/SnapScrollToggle";

export default function Home() {
  const nextEvent = CHURCH.upcomingEvents[0];

  return (
    <div>
      <SnapScrollToggle />
      <div className="snap-start">
        <Hero />
      </div>

      {/* Welcome */}
      <section className="snap-start scroll-mt-20 flex min-h-[90vh] items-center bg-gradient-to-br from-amber-50 via-white to-indigo-50 lg:min-h-screen">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                Welcome Home
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-indigo-950">
                {CHURCH.name}
              </h2>
              <p className="mt-5 leading-7 text-slate-700">
                {CHURCH.description[0]}
              </p>
              <a
                href="/about"
                className="mt-6 inline-block rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
              >
                Learn More About Us
              </a>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src={CHURCH.pastorAndWifePhoto}
                alt={CHURCH.pastor}
                width={900}
                height={700}
                className="h-auto w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service Times */}
      <section className="snap-start scroll-mt-20 flex min-h-[90vh] items-center bg-white lg:min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Join Us for Worship
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Everyone is welcome — come as you are.
            </p>
          </Reveal>
          <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-8 text-center">
            <a
              href="/join-online"
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Zoom-only meetings? Join online →
            </a>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="snap-start scroll-mt-20 flex min-h-[70vh] items-center bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-500 text-white lg:min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
              Part of a Global Family
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
              One Ministry, Reaching the Whole World
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
              {CHURCH.history}
            </p>
          </Reveal>
          <StaggerGrid className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            <StaggerItem>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <p className="text-3xl font-extrabold text-amber-300">1973</p>
                <p className="mt-2 text-sm text-indigo-100">
                  Founded in Lagos, Nigeria — starting with just 15 members
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <p className="text-3xl font-extrabold text-amber-300">90+</p>
                <p className="mt-2 text-sm text-indigo-100">
                  Branches across the United States, including here in
                  Columbia
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <p className="text-3xl font-extrabold text-amber-300">4</p>
                <p className="mt-2 text-sm text-indigo-100">
                  Continents reached — Africa, Europe, Asia, and the Americas
                </p>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* Upcoming Event */}
      {nextEvent && (
        <section className="snap-start scroll-mt-20 flex min-h-[90vh] items-center bg-gradient-to-br from-amber-50 via-white to-indigo-50 lg:min-h-screen">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                <Image
                  src={nextEvent.flyer}
                  alt={nextEvent.title}
                  width={900}
                  height={1200}
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.15}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                  {nextEvent.date} · {nextEvent.time}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-indigo-950">
                  {nextEvent.title}
                </h2>
                <p className="mt-3 text-slate-700">{nextEvent.subtitle}</p>
                <a
                  href="/events"
                  className="mt-6 inline-block rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
                >
                  See Upcoming Program
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Ministries */}
      <section className="snap-start scroll-mt-20 flex min-h-[90vh] items-center bg-white lg:min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Ministries
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              There&apos;s a place for everyone to grow and serve.
            </p>
          </Reveal>
          <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.slice(0, 3).map((m) => (
              <StaggerItem key={m.title}>
                <div className="h-full overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {m.image && (
                    <div className="relative h-36 w-full">
                      <Image
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-indigo-950">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <div className="mt-8 text-center">
            <a
              href="/ministries"
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              See all ministries →
            </a>
          </div>
        </div>
      </section>

      {/* Give */}
      <section className="snap-start scroll-mt-20 flex min-h-[70vh] items-center bg-gradient-to-br from-amber-50 to-white lg:min-h-screen">
        <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-indigo-950">
              Tithes &amp; Offerings
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              &ldquo;Bring ye all the tithes into the storehouse&rdquo; —
              Malachi 3:10. Thank you for sowing into the work of God through
              this ministry.
            </p>
            <a
              href="/give"
              className="mt-6 inline-block rounded-full bg-indigo-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
            >
              Give Now
            </a>
          </Reveal>
        </div>
      </section>

      {/* Visit */}
      <section className="snap-start scroll-mt-20 flex min-h-[90vh] items-center bg-white lg:min-h-screen">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                Plan Your Visit
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-indigo-950">
                We&apos;d Love to Meet You
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                {CHURCH.address.line1}, {CHURCH.address.line2}{" "}
                {CHURCH.address.line3}
              </p>
              <p className="mt-2 leading-7 text-slate-700">
                <a href={`tel:${CHURCH.phone}`}>{CHURCH.phoneDisplay}</a>
                {" · "}
                <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
              </p>
              <a
                href="/contact"
                className="mt-6 inline-block rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
              >
                Get Directions
              </a>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="Church location map"
                src="https://www.google.com/maps?q=6031+Tamar+Dr,+Columbia,+MD+21045&output=embed"
                className="h-[320px] w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
