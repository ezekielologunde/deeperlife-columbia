import type { Metadata } from "next";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "What to Expect",
  description: "New here? Here's what to expect on your first visit.",
};

const FAQS = [
  {
    q: "What should I wear?",
    a: "Come as you are. Many members dress in their Sunday best, but you're welcome regardless of what you're wearing — we care about you being there, not what you have on.",
  },
  {
    q: "Is there anything for children?",
    a: "Yes — families worship together, and our Children's Ministry team is on hand to help kids feel welcome. Ask any usher when you arrive and they'll point you in the right direction.",
  },
  {
    q: "Where do I park?",
    a: "There's parking available at Jeffers Hill Center. If you have any trouble finding a spot, an usher or member near the entrance will be glad to help.",
  },
  {
    q: "What happens during a service?",
    a: "Sunday begins with a time of prayer, followed by worship in song, and a Bible-based message. Expect a warm, participatory atmosphere — singing, prayer, and an open Bible.",
  },
  {
    q: "Do I need to bring anything?",
    a: "Just yourself. If you have a Bible, feel free to bring it, but it isn't required — Scripture is read aloud and referenced throughout the service.",
  },
  {
    q: "Who do I talk to if I have questions?",
    a: "Look for anyone near the entrance when you arrive — our members are glad to help. You can also reach out ahead of time using our contact page.",
  },
];

export default async function WhatToExpectPage() {
  const CHURCH = await getChurchData();

  return (
    <>
      <PageHero
        title="What to Expect"
        subtitle="New here? Here's everything you need to know before your first visit."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <Reveal>
            <p className="leading-7 text-slate-700">
              We know visiting a new church can feel unfamiliar. At{" "}
              {CHURCH.name}, we want your first visit to feel simple and
              welcoming. Here&apos;s a quick guide to help you know what to
              expect.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-indigo-950">
              Join Us
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
                When
              </p>
              <p className="mt-2 font-bold text-indigo-950">
                Sundays, {CHURCH.services[0]?.time ?? "9:30 AM"}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
                Where
              </p>
              <p className="mt-2 font-bold text-indigo-950">
                {CHURCH.address.line1}
                <br />
                {CHURCH.address.line3}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
                Dress
              </p>
              <p className="mt-2 font-bold text-indigo-950">Come as you are</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-2xl font-bold text-indigo-950">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <StaggerGrid className="mt-10 space-y-6">
            {FAQS.map((faq) => (
              <StaggerItem key={faq.q}>
                <div className="border-b border-slate-100 pb-6">
                  <h3 className="font-bold text-indigo-950">{faq.q}</h3>
                  <p className="mt-2 leading-6 text-slate-600">{faq.a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <Reveal>
            <div className="mt-12 text-center">
              <a
                href="/contact"
                className="inline-block rounded-full bg-indigo-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
              >
                Plan Your Visit
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
