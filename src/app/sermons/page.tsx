import type { Metadata } from "next";
import Image from "next/image";
import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Sermons | Deeper Life Bible Church Columbia",
  description: "Watch and follow our latest messages.",
};

export default function SermonsPage() {
  return (
    <>
      <PageHero
        title="Recent Sermons"
        subtitle="Sermon recordings will be posted here soon. Follow us on social media for the latest messages."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <Reveal>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src="/images/gallery/preaching.webp"
                alt="A message being preached at Deeper Life Bible Church Columbia"
                width={1024}
                height={683}
                className="h-auto w-full"
              />
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={CHURCH.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
              >
                Watch on YouTube
              </a>
              <a
                href={CHURCH.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-slate-50"
              >
                Follow on Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
