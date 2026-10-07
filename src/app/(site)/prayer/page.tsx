import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Prayer Request",
  description:
    "Share a prayer request with Deeper Life Bible Church in Columbia, Maryland. Our prayer team will stand with you in faith.",
};

export default function PrayerPage() {
  return (
    <>
      <PageHero
        title="Prayer Request"
        subtitle="You don't have to carry it alone. Tell us how we can pray with you."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
          <Reveal direction="left">
            <div>
              <h2 className="text-2xl font-bold text-indigo-950">
                We&apos;re praying with you
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Send us your need, whether it is healing, family, work,
                finances, or thanksgiving for what God has done. Your request
                goes to our pastoral team and is handled with care and
                confidentiality.
              </p>
              <blockquote className="mt-6 border-l-4 border-amber-400 pl-4 text-sm italic leading-6 text-slate-600">
                &ldquo;Be careful for nothing; but in every thing by prayer and
                supplication with thanksgiving let your requests be made known
                unto God.&rdquo; — Philippians 4:6
              </blockquote>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-bold text-indigo-950">
                  Prayer with the wider DCLM family
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  You can also submit a request to the Deeper Christian Life
                  Ministry global prayer hub.
                </p>
                <a
                  href="https://dclm.org/prayer-request-hub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  DCLM Prayer Request Hub →
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <ContactForm
              defaultCategory="prayer"
              messageLabel="Your prayer request"
              submitLabel="Send Prayer Request"
              successTitle="Request received"
              successBody="Thank you for trusting us with this. We are standing with you in prayer."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
