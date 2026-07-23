import Image from "next/image";
import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import Hero from "@/components/Hero";

const MINISTRIES = [
  {
    title: "Children's Ministry",
    desc: "A safe, fun environment where kids learn God's Word through age-appropriate lessons, songs, and activities.",
  },
  {
    title: "Youth Ministry",
    desc: "Helping teens build a real relationship with Christ through fellowship, mentorship, and Bible study.",
  },
  {
    title: "Women's Fellowship",
    desc: "Encouragement, prayer, and community for women at every stage of life.",
  },
  {
    title: "Men's Fellowship",
    desc: "Building godly men through accountability, discipleship, and fellowship.",
  },
  {
    title: "Choir & Worship",
    desc: "Leading the congregation into God's presence through music and praise.",
  },
  {
    title: "Outreach & Missions",
    desc: "Sharing the Gospel and serving our Columbia community through evangelism and acts of service.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Service Times */}
      <section id="services" className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Join Us for Worship
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Everyone is welcome — come as you are.
            </p>
          </Reveal>
          <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </section>

      {/* Join Online */}
      <section id="join-online" className="border-b border-slate-100 bg-indigo-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-indigo-950">
                Join Us on Zoom
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Monday Bible Study, Friday Revival Hour, and other midweek
                meetings are held online. Use the link below to join.
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-indigo-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-indigo-950">
                About Our Church
              </h2>
              {CHURCH.description.map((paragraph, i) => (
                <p
                  key={i}
                  className={`${i === 0 ? "mt-5" : "mt-4"} leading-7 text-slate-700`}
                >
                  {paragraph}
                </p>
              ))}
              <a
                href={CHURCH.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-indigo-700 hover:text-indigo-900"
              >
                More about us on YouTube →
              </a>

              <div className="mt-8 flex items-center gap-6 rounded-2xl bg-white p-5 shadow-sm">
                <Image
                  src={CHURCH.pastorPhoto}
                  alt={CHURCH.pastor}
                  width={180}
                  height={220}
                  className="h-[220px] w-[180px] shrink-0 rounded-2xl object-cover object-top"
                />
                <div>
                  <p className="text-lg font-bold text-indigo-950">
                    {CHURCH.pastor}
                  </p>
                  <p className="text-sm text-slate-500">Senior Pastor</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <div className="rounded-2xl bg-indigo-900 p-10 text-white shadow-lg">
              <h3 className="text-xl font-bold">What We Believe</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-indigo-100">
                <li>• The Bible is the inspired, infallible Word of God.</li>
                <li>• Salvation is by grace through faith in Jesus Christ.</li>
                <li>• A life of holiness and separation unto God.</li>
                <li>• The power of prayer and the Holy Spirit.</li>
                <li>
                  • The Great Commission — making disciples of all nations.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Upcoming Program */}
      <section id="events" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Upcoming Program
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Join us for this special citywide and global gathering.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
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
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                  {CHURCH.upcomingEvent.date} · {CHURCH.upcomingEvent.time}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-indigo-950">
                  {CHURCH.upcomingEvent.title}
                </h3>
                <p className="mt-2 text-slate-700">
                  {CHURCH.upcomingEvent.subtitle}
                </p>
                <p className="mt-4 text-sm italic leading-6 text-slate-600">
                  {CHURCH.upcomingEvent.verse}
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  {CHURCH.upcomingEvent.host}
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={CHURCH.upcomingEvent.link}
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

      {/* Ministries */}
      <section id="ministries" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Ministries
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              There&apos;s a place for everyone to grow and serve.
            </p>
          </Reveal>
          <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.map((m) => (
              <StaggerItem key={m.title}>
                <div className="h-full rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-lg font-bold text-indigo-950">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {m.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Sermons */}
      <section id="sermons" className="bg-indigo-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">
              Recent Sermons
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-indigo-200">
              Sermon recordings will be posted here soon. Follow us on social
              media for the latest messages.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={CHURCH.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-900 transition-all hover:scale-105 hover:bg-indigo-100"
              >
                Watch on YouTube
              </a>
              <a
                href={CHURCH.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold transition-all hover:scale-105 hover:bg-white/10"
              >
                Follow on Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Visit / Contact */}
      <section id="visit" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
          <Reveal direction="left">
            <div id="contact">
              <h2 className="text-3xl font-bold tracking-tight text-indigo-950">
                Plan Your Visit
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                We&apos;d love to meet you. Reach out with any questions or
                just stop by this Sunday.
              </p>

              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-indigo-950">Address</dt>
                  <dd className="mt-1 text-slate-600">
                    {CHURCH.address.line1}
                    <br />
                    {CHURCH.address.line2}
                    <br />
                    {CHURCH.address.line3}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-950">Phone</dt>
                  <dd className="mt-1 text-slate-600">
                    <a href={`tel:${CHURCH.phone}`}>{CHURCH.phoneDisplay}</a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-indigo-950">Email</dt>
                  <dd className="mt-1 text-slate-600">
                    <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="Church location map"
                src="https://www.google.com/maps?q=6031+Tamar+Dr,+Columbia,+MD+21045&output=embed"
                className="h-full min-h-[320px] w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Give */}
      <section id="give" className="bg-indigo-950 text-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">
              Tithes &amp; Offerings
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-indigo-200">
              &ldquo;Bring ye all the tithes into the storehouse&rdquo; —
              Malachi 3:10. Thank you for sowing into the work of God through
              this ministry.
            </p>
            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/15 bg-white/5 p-8">
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
