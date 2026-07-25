import type { Metadata } from "next";
import { getMinistriesData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Serve",
  description: "Find your place to volunteer and serve at Deeper Life Bible Church Columbia.",
};

const WAYS_TO_SERVE = [
  {
    title: "Use Your Gifts",
    desc: "Whether it's music, teaching, hospitality, or administration, God has given every believer gifts to build up the church.",
  },
  {
    title: "Grow in Community",
    desc: "Serving alongside others is one of the fastest ways to build real friendships and grow in your walk with Christ.",
  },
  {
    title: "Make an Impact",
    desc: "Your time and talent directly shape someone else's experience of worship, welcome, and community here.",
  },
];

export default async function ServePage() {
  const MINISTRIES = await getMinistriesData();

  return (
    <>
      <PageHero
        title="Serve With Us"
        subtitle="There's a place for your gifts here. Find where you fit and get plugged in."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <StaggerGrid className="grid gap-6 sm:grid-cols-3">
            {WAYS_TO_SERVE.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-slate-200 p-6 text-center">
                  <h3 className="text-lg font-bold text-indigo-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Ministry Teams Looking for Help
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Every ministry could use another set of hands and a willing
              heart.
            </p>
          </Reveal>
          <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.map((m) => (
              <StaggerItem key={m.title}>
                <div className="rounded-xl border border-slate-200 bg-white px-5 py-4">
                  <p className="font-semibold text-indigo-950">{m.title}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Let Us Know You&apos;re Interested
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Tell us a bit about yourself and where you&apos;d like to
              serve — we&apos;ll connect you with the right team.
            </p>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
