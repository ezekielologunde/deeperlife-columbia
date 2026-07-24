import { CHURCH } from "@/lib/church";
import { MINISTRIES } from "@/lib/ministries";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import BentoCard from "@/components/BentoCard";
import SectionLabel from "@/components/SectionLabel";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-indigo-950 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal direction="left">
              <BentoCard
                href="/join-online"
                variant="dark"
                eyebrow="Zoom"
                title="Join Us Online"
                desc="Monday Bible Study & Friday Revival Hour, 7:00 PM."
                className="min-h-[160px]"
              />
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <BentoCard
                href="/give"
                variant="amber"
                eyebrow="Tithes & Offerings"
                title="Give Online"
                desc="Support the work of God through Zelle."
                className="min-h-[160px]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-indigo-950 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Discover</SectionLabel>

          <div className="grid gap-4 lg:grid-cols-3">
            <Reveal direction="left">
              <BentoCard
                href="/about"
                variant="dark"
                eyebrow="Get to know us"
                title="New to Deeper Life?"
                desc="Learn our story, what we believe, and meet our pastor."
                className="h-full min-h-[280px]"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <BentoCard
                href="/services"
                variant="dark"
                eyebrow="Every Week"
                title="Locations & Service Times"
                desc="Jeffers Hill Center · 6031 Tamar Dr, Columbia, MD"
                className="h-full min-h-[280px]"
              >
                <div className="mt-5 flex flex-wrap gap-2">
                  {CHURCH.services.map((s) => (
                    <span
                      key={s.name}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-100"
                    >
                      {s.name.split(" ")[0]} · {s.time}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <BentoCard
                href="/ministries"
                variant="light"
                eyebrow="For Every Age"
                title="A Place for Everyone"
                desc="We believe in making space for the whole family."
                className="h-full min-h-[280px]"
              >
                <ul className="mt-5 space-y-2">
                  {MINISTRIES.slice(0, 4).map((m) => (
                    <li
                      key={m.title}
                      className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-indigo-950"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {m.title}
                    </li>
                  ))}
                </ul>
              </BentoCard>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-4">
              <BentoCard
                href="/contact"
                variant="dark"
                eyebrow="We'd Love to Meet You"
                title="Take Your Next Step"
                desc="Step into your personal journey of growth and relationship with God."
                className="min-h-[140px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-indigo-950 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>Coming Up</SectionLabel>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal direction="left">
              <BentoCard
                href="/events"
                variant="dark"
                eyebrow={CHURCH.upcomingEvent.date}
                title={CHURCH.upcomingEvent.title}
                desc={CHURCH.upcomingEvent.subtitle}
                className="h-full min-h-[200px]"
              />
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <BentoCard
                href="/sermons"
                variant="light"
                eyebrow="Watch & Follow"
                title="Recent Sermons"
                desc="Catch our latest messages on YouTube and Facebook."
                className="h-full min-h-[200px]"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
