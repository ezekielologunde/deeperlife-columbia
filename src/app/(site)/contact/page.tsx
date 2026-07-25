import type { Metadata } from "next";
import Image from "next/image";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description: "Address, phone, email, and directions.",
};

export default async function ContactPage() {
  const CHURCH = await getChurchData();

  return (
    <>
      <PageHero
        title="Plan Your Visit"
        subtitle="We'd love to meet you. Reach out with any questions or just stop by this Sunday."
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
          <Reveal direction="left">
            <div>
              <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image
                  src="/images/gallery/welcome.jpg"
                  alt="A warm welcome awaits you at Deeper Life Bible Church Columbia"
                  width={800}
                  height={533}
                  className="h-auto w-full"
                />
              </div>
              <dl className="space-y-5 text-sm">
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

      <section className="bg-indigo-50">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-indigo-950">
              Send Us a Message
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
              Have a question, or need prayer? Fill out the form below and
              we&apos;ll get back to you.
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
