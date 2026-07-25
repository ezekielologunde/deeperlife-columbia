import type { Metadata } from "next";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Statement of Faith",
  description: "What we believe, as a Bible-based holiness church.",
};

export default async function BeliefsPage() {
  const CHURCH = await getChurchData();

  return (
    <>
      <PageHero
        title="Statement of Faith"
        subtitle="What we believe, as members of Deeper Life Bible Church."
      />

      <section className="bg-indigo-50">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
              Bible Doctrines: Abridged Edition
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Acts 2:42; I Timothy 4:16; Titus 1:9
            </p>
            <p className="mt-6 italic leading-7 text-slate-700">
              &ldquo;Beloved, when I gave all diligence to write unto you of
              the common salvation, it was needful for me to write unto you,
              and exhort [you] that ye should earnestly contend for the faith
              which was once delivered unto the saints&rdquo;. &ldquo;Take
              heed unto thyself, and unto the doctrine; continue in them: for
              in doing this thou shalt both save thyself, and them that hear
              thee&rdquo;. &ldquo;Now I beseech you, brethren, mark them
              which cause divisions and offences contrary to the doctrine
              which ye have learned; and avoid them.&rdquo;
            </p>
            <p className="mt-3 text-sm font-medium text-slate-500">
              (Jude 3; Romans 16:17; I Timothy 4:16)
            </p>
            <p className="mt-8 text-lg font-bold text-indigo-950">
              God&apos;s infallible WORD teaches and we believe:
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <StaggerGrid className="space-y-8">
            {CHURCH.statementOfFaith.map((belief, i) => (
              <StaggerItem key={belief.title}>
                <div className="border-b border-slate-100 pb-8 last:border-0">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-indigo-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-bold text-indigo-950">
                      {belief.title}
                    </h2>
                  </div>
                  <p className="mt-3 leading-7 text-slate-700">
                    {belief.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
