import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getMinistryBySlug } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ministry = await getMinistryBySlug(slug);
  if (!ministry) return {};
  return {
    title: ministry.title,
    description: ministry.desc,
  };
}

export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ministry = await getMinistryBySlug(slug);

  if (!ministry) notFound();

  return (
    <>
      <PageHero title={ministry.title} subtitle={ministry.desc} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              {ministry.meetingTime && (
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                  {ministry.meetingTime}
                </p>
              )}
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {ministry.details ?? ministry.desc}
              </p>
              {ministry.ctaText && (
                <a
                  href="/contact"
                  className="mt-8 inline-block rounded-full bg-indigo-900 px-7 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
                >
                  {ministry.ctaText}
                </a>
              )}
            </div>
          </Reveal>
          {ministry.image && (
            <Reveal direction="right" delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                <Image
                  src={ministry.image}
                  alt={ministry.title}
                  width={900}
                  height={700}
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
