import type { Metadata } from "next";
import Image from "next/image";
import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import BentoCard from "@/components/BentoCard";

export const metadata: Metadata = {
  title: "About Us | Deeper Life Bible Church Columbia",
  description: CHURCH.description[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Get to know us"
        title="About Our Church"
        subtitle="Our story, our beliefs, and our pastor."
      />

      <section className="bg-indigo-950 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 lg:grid-cols-2 lg:items-start">
          <Reveal direction="left">
            <div>
              {CHURCH.description.map((paragraph, i) => (
                <p
                  key={i}
                  className={`${i === 0 ? "" : "mt-4"} leading-7 text-indigo-100`}
                >
                  {paragraph}
                </p>
              ))}
              <a
                href={CHURCH.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                More about us on YouTube →
              </a>

              <div className="mt-8 flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <Image
                  src={CHURCH.pastorPhoto}
                  alt={CHURCH.pastor}
                  width={180}
                  height={220}
                  className="h-[220px] w-[180px] shrink-0 rounded-2xl object-cover object-top"
                />
                <div>
                  <p className="text-lg font-bold text-white">
                    {CHURCH.pastor}
                  </p>
                  <p className="text-sm text-indigo-300">Senior Pastor</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <BentoCard
              variant="amber"
              eyebrow="Our Foundation"
              title="What We Believe"
              className="h-full"
            >
              <ul className="mt-5 space-y-3 text-sm leading-6 text-indigo-100">
                <li>• The Bible is the inspired, infallible Word of God.</li>
                <li>• Salvation is by grace through faith in Jesus Christ.</li>
                <li>• A life of holiness and separation unto God.</li>
                <li>• The power of prayer and the Holy Spirit.</li>
                <li>
                  • The Great Commission — making disciples of all nations.
                </li>
              </ul>
            </BentoCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
