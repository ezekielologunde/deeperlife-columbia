import type { Metadata } from "next";
import Image from "next/image";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

function initials(name: string) {
  return name
    .replace(/^Pastor\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function generateMetadata(): Promise<Metadata> {
  const CHURCH = await getChurchData();
  return {
    title: "About Us",
    description: CHURCH.description[0],
  };
}

export default async function AboutPage() {
  const CHURCH = await getChurchData();

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
                  src={CHURCH.pastorAndWifePhoto}
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
              <a
                href="/beliefs"
                className="mt-6 inline-block text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                Read our full statement of faith →
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20">
          <Reveal>
            <h3 className="text-center text-2xl font-bold tracking-tight text-indigo-950">
              Our Roots
            </h3>
            <p className="mx-auto mt-5 max-w-3xl text-center leading-7 text-slate-700">
              {CHURCH.history}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20">
          <Reveal>
            <h3 className="text-center text-2xl font-bold tracking-tight text-indigo-950">
              Our Leadership
            </h3>
          </Reveal>
          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-3">
            {CHURCH.leadership.map((l) => (
              <StaggerItem key={l.name}>
                <div className="flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm">
                  {l.photoUrl ? (
                    <Image
                      src={l.photoUrl}
                      alt={l.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-900 text-lg font-bold text-white">
                      {initials(l.name)}
                    </span>
                  )}
                  <p className="mt-4 font-bold text-indigo-950">{l.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{l.title}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>

        <Reveal>
          <div className="mx-auto max-w-6xl px-6 pb-20">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src="/images/gallery/fellowship.jpg"
                alt="Fellowship at Deeper Life Bible Church Columbia"
                width={1600}
                height={900}
                className="h-auto w-full"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
