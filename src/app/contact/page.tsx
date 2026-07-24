import type { Metadata } from "next";
import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Plan Your Visit | Deeper Life Bible Church Columbia",
  description: "Address, phone, email, and directions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We'd Love to Meet You"
        title="Plan Your Visit"
        subtitle="Reach out with any questions or just stop by this Sunday."
      />

      <section className="bg-indigo-950 pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-amber-300">Address</dt>
                  <dd className="mt-1 text-indigo-100">
                    {CHURCH.address.line1}
                    <br />
                    {CHURCH.address.line2}
                    <br />
                    {CHURCH.address.line3}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-amber-300">Phone</dt>
                  <dd className="mt-1 text-indigo-100">
                    <a href={`tel:${CHURCH.phone}`}>{CHURCH.phoneDisplay}</a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-amber-300">Email</dt>
                  <dd className="mt-1 text-indigo-100">
                    <a href={`mailto:${CHURCH.email}`}>{CHURCH.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
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
    </>
  );
}
