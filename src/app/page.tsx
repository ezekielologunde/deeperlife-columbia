import { CHURCH } from "@/lib/church";

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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-28 text-center sm:py-36">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Welcome to
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            {CHURCH.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
            {CHURCH.tagline}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#visit"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-100"
            >
              Plan Your Visit
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Service Times
            </a>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section id="services" className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
            Join Us for Worship
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Everyone is welcome — come as you are.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CHURCH.services.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-slate-200 p-6 text-center shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                  {s.name}
                </p>
                <p className="mt-3 text-lg font-bold text-indigo-950">
                  {s.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-indigo-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-indigo-950">
              About Our Church
            </h2>
            <p className="mt-5 leading-7 text-slate-700">
              {CHURCH.name} is a Bible-believing, Christ-centered church
              committed to helping people grow deeper in their walk with
              God. We are part of the Deeper Life Bible Church family,
              rooted in the teaching of God&apos;s Word, prayer, and holy
              living.
            </p>
            <p className="mt-4 leading-7 text-slate-700">
              Whether you&apos;re new to faith or have walked with Christ
              for years, you&apos;ll find a warm community here in
              Columbia, Maryland ready to welcome you home.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Led by {CHURCH.pastor}
            </p>
          </div>
          <div className="rounded-2xl bg-indigo-900 p-10 text-white shadow-lg">
            <h3 className="text-xl font-bold">What We Believe</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-indigo-100">
              <li>• The Bible is the inspired, infallible Word of God.</li>
              <li>• Salvation is by grace through faith in Jesus Christ.</li>
              <li>• A life of holiness and separation unto God.</li>
              <li>• The power of prayer and the Holy Spirit.</li>
              <li>• The Great Commission — making disciples of all nations.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section id="ministries" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
            Ministries
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            There&apos;s a place for everyone to grow and serve.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-slate-200 p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-indigo-950">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons */}
      <section id="sermons" className="bg-indigo-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
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
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-900 hover:bg-indigo-100"
            >
              Watch on YouTube
            </a>
            <a
              href={CHURCH.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Follow on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Visit / Contact */}
      <section id="visit" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
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

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <iframe
              title="Church location map"
              src="https://www.google.com/maps?q=Columbia,MD&output=embed"
              className="h-full min-h-[320px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
