import type { Metadata } from "next";
import Link from "next/link";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

const DCLM_UPLOADS_PLAYLIST_ID = "UU4zsqN5YdXfxkkdVvwNA3JA";

export const metadata: Metadata = {
  title: "DCLM Webcast",
  description:
    "Watch live and recorded programs from Deeper Christian Life Ministry headquarters — global crusades, conventions, and services.",
};

export default async function WebcastPage() {
  const CHURCH = await getChurchData();

  return (
    <>
      <PageHero
        title="DCLM Webcast"
        subtitle="Watch live and recent programs from Deeper Christian Life Ministry headquarters."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <Reveal>
            <div className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="DCLM Webcast — global programs"
                src={`https://www.youtube.com/embed/videoseries?list=${DCLM_UPLOADS_PLAYLIST_ID}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500">
              Global crusades, conventions, and services from DCLM
              headquarters — updated automatically as new programs go live.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={CHURCH.webcast.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
              >
                Open Full DCLM Webcast
              </a>
              <Link
                href="/sermons"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-slate-50"
              >
                Our Local Sermons
              </Link>
              <Link
                href="/devotional"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-slate-50"
              >
                Daily Devotional
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              For the live current program, translations, radio, and event
              schedules, visit the{" "}
              <a
                href={CHURCH.webcast.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-700"
              >
                official DCLM Webcast
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
