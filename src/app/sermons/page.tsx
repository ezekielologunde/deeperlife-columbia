import type { Metadata } from "next";
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
        eyebrow="Watch & Follow"
        title="Recent Sermons"
        subtitle="Sermon recordings will be posted here soon. Follow us on social media for the latest messages."
      />

      <section className="bg-indigo-950 pb-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={CHURCH.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-amber-300"
              >
                Watch on YouTube
              </a>
              <a
                href={CHURCH.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
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
