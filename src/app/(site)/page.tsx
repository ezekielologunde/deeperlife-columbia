import Image from "next/image";
import Link from "next/link";
import {
  getChurchData,
  getMinistriesData,
  getTodayDevotional,
  getGalleryImages,
} from "@/lib/data";
import Reveal from "@/components/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import Hero from "@/components/Hero";
import CountUp from "@/components/CountUp";
import Lightbox from "@/components/Lightbox";

export default async function Home() {
  const CHURCH = await getChurchData();
  const MINISTRIES = await getMinistriesData();
  const nextEvent = CHURCH.upcomingEvents[0];
  const devotionalResult = await getTodayDevotional("Adult");
  const galleryImages = (await getGalleryImages()).slice(0, 6);

  return (
    <div>
      <Hero name={CHURCH.name} tagline={CHURCH.tagline} />

      {/* Welcome */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-indigo-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                Welcome Home
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
                {CHURCH.name}
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-700">
                {CHURCH.description[0]}
              </p>
              <a
                href="/about"
                className="mt-8 inline-block rounded-full bg-indigo-900 px-7 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
              >
                Learn More About Us
              </a>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
              <Lightbox src={CHURCH.pastorAndWifePhoto} alt={CHURCH.pastor}>
                <Image
                  src={CHURCH.pastorAndWifePhoto}
                  alt={CHURCH.pastor}
                  width={900}
                  height={700}
                  className="h-auto w-full object-cover"
                />
              </Lightbox>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service Times */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
              Join Us for Worship
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-slate-600">
              Everyone is welcome — come as you are.
            </p>
          </Reveal>
          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHURCH.services.map((s) => (
              <StaggerItem key={s.name}>
                <div className="h-full rounded-2xl border border-slate-200 p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                    {s.name}
                  </p>
                  <p className="mt-3 text-xl font-bold text-indigo-950">
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
          <div className="mt-10 text-center">
            <a
              href="/join-online"
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Zoom-only meetings? Join online →
            </a>
          </div>
        </div>
      </section>

      {/* Today's Devotional */}
      {devotionalResult && (
        <section className="bg-indigo-950 text-white">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
                Today&apos;s Word
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {devotionalResult.devotional.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl italic leading-7 text-indigo-100">
                {devotionalResult.devotional.keyVerse.split("\n")[0]}
              </p>
              <Link
                href="/devotional"
                className="mt-7 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-indigo-900 transition-all hover:scale-105 hover:bg-indigo-100"
              >
                Read Today&apos;s Devotional →
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Global Reach */}
      <section className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
              Part of a Global Family
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              One Ministry, Reaching the Whole World
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-indigo-100">
              {CHURCH.history}
            </p>
          </Reveal>
          <StaggerGrid className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
            <StaggerItem>
              <div className="rounded-2xl bg-white/10 p-7 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <CountUp
                  value={1973}
                  className="text-4xl font-extrabold text-amber-300"
                />
                <p className="mt-3 text-sm text-indigo-100">
                  Founded in Lagos, Nigeria — starting with just 15 members
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-2xl bg-white/10 p-7 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <CountUp
                  value={90}
                  suffix="+"
                  className="text-4xl font-extrabold text-amber-300"
                />
                <p className="mt-3 text-sm text-indigo-100">
                  Branches across the United States, including here in
                  Columbia
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-2xl bg-white/10 p-7 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <CountUp
                  value={4}
                  className="text-4xl font-extrabold text-amber-300"
                />
                <p className="mt-3 text-sm text-indigo-100">
                  Continents reached — Africa, Europe, Asia, and the Americas
                </p>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </div>
      </section>

      {/* Upcoming Event */}
      {nextEvent && (
        <section className="bg-gradient-to-br from-amber-50 via-white to-indigo-50">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:py-28 lg:grid-cols-2 lg:items-center">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                <Lightbox src={nextEvent.flyer} alt={nextEvent.title}>
                  <Image
                    src={nextEvent.flyer}
                    alt={nextEvent.title}
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
                  {nextEvent.date} · {nextEvent.time}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
                  {nextEvent.title}
                </h2>
                <p className="mt-4 text-lg text-slate-700">{nextEvent.subtitle}</p>
                <a
                  href="/events"
                  className="mt-8 inline-block rounded-full bg-indigo-900 px-7 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
                >
                  See Upcoming Program
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Ministries */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
              Ministries
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-slate-600">
              There&apos;s a place for everyone to grow and serve.
            </p>
          </Reveal>
          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.slice(0, 3).map((m) => (
              <StaggerItem key={m.title}>
                <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-40 w-full overflow-hidden">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-100 to-amber-50">
                        <span className="text-4xl font-bold text-indigo-200">
                          {m.title[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-indigo-950">
                      {m.title}
                    </h3>
                    <p className="mt-2 leading-6 text-slate-600">{m.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <div className="mt-10 text-center">
            <a
              href="/ministries"
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              See all ministries →
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="bg-indigo-50">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
            <Reveal>
              <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
                Life at Deeper Life
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-lg text-slate-600">
                Moments from worship, fellowship, and life together as a
                church family.
              </p>
            </Reveal>
            <StaggerGrid className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {galleryImages.map((img) => (
                <StaggerItem key={img.id}>
                  <div className="group overflow-hidden rounded-xl">
                    <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                      <Lightbox src={img.url} alt={img.caption ?? "Church gallery photo"}>
                        <Image
                          src={img.url}
                          alt={img.caption ?? "Church gallery photo"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </Lightbox>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
            <div className="mt-10 text-center">
              <Link
                href="/gallery"
                className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
              >
                See full gallery →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Give */}
      <section className="bg-gradient-to-br from-amber-50 to-white">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
              Tithes &amp; Offerings
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
              &ldquo;Bring ye all the tithes into the storehouse&rdquo; —
              Malachi 3:10. Thank you for sowing into the work of God through
              this ministry.
            </p>
            <a
              href="/give"
              className="mt-8 inline-block rounded-full bg-indigo-900 px-8 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
            >
              Give Now
            </a>
          </Reveal>
        </div>
      </section>

      {/* Visit */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                Plan Your Visit
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-indigo-950 sm:text-4xl">
                We&apos;d Love to Meet You
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                {CHURCH.address.line1}, {CHURCH.address.line2}{" "}
                {CHURCH.address.line3}
              </p>
              <p className="mt-2 text-lg leading-8 text-slate-700">
                <a href={`tel:${CHURCH.phone}`}>{CHURCH.phoneDisplay}</a>
                {" · "}
                <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${CHURCH.address.line1}, ${CHURCH.address.line2} ${CHURCH.address.line3}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-indigo-900 px-7 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
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
