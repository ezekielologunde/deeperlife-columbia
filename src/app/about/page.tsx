import type { Metadata } from "next";
import Image from "next/image";
import { CHURCH } from "@/lib/church";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | Deeper Life Bible Church Columbia",
  description: CHURCH.description[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Our Church"
        subtitle="Get to know our story, our beliefs, and our pastor."
      />

      <section className="bg-indigo-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              {CHURCH.description.map((paragraph, i) => (
                <p
                  key={i}
                  className={`${i === 0 ? "" : "mt-4"} leading-7 text-slate-700`}
                >
                  {paragraph}
                </p>
              ))}
              <a
                href={CHURCH.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-indigo-700 hover:text-indigo-900"
              >
                More about us on YouTube →
              </a>

              <div className="mt-8 flex items-center gap-6 rounded-2xl bg-white p-5 shadow-sm">
                <Image
                  src={CHURCH.pastorPhoto}
                  alt={CHURCH.pastor}
                  width={180}
                  height={220}
                  className="h-[220px] w-[180px] shrink-0 rounded-2xl object-cover object-top"
                />
                <div>
                  <p className="text-lg font-bold text-indigo-950">
                    {CHURCH.pastor}
                  </p>
                  <p className="text-sm text-slate-500">Senior Pastor</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <div className="rounded-2xl bg-indigo-900 p-10 text-white shadow-lg">
              <h3 className="text-xl font-bold">What We Believe</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-indigo-100">
                <li>• The Bible is the inspired, infallible Word of God.</li>
                <li>• Salvation is by grace through faith in Jesus Christ.</li>
                <li>• A life of holiness and separation unto God.</li>
                <li>• The power of prayer and the Holy Spirit.</li>
                <li>
                  • The Great Commission — making disciples of all nations.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
