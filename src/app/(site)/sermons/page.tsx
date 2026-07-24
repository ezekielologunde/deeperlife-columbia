import type { Metadata } from "next";
import Image from "next/image";
import { getChurchData } from "@/lib/data";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Sermons | Deeper Life Bible Church Columbia",
  description: "Watch and follow our latest messages.",
};

export default async function SermonsPage() {
  const CHURCH = await getChurchData();

  return (
    <>
      <PageHero
        title="Recent Sermons"
        subtitle="Watch our latest messages, or catch up on our full sermon archive below."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <Reveal>
            <div className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="Deeper Life Bible Church Columbia sermon archive"
                src={`https://www.youtube.com/embed/videoseries?list=${CHURCH.youtubeUploadsPlaylistId}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500">
              New messages appear here automatically as soon as they&apos;re
              uploaded to our YouTube channel.
            </p>

            <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
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
              <a
                href={CHURCH.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-slate-50"
              >
                Follow on Instagram
              </a>
              <a
                href={CHURCH.app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-slate-50"
              >
                Get the {CHURCH.app.label}
              </a>
              <a
                href={CHURCH.webcast.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-indigo-950 transition-all hover:scale-105 hover:bg-slate-50"
              >
                {CHURCH.webcast.label}
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Listen to Deeper Christian Life Ministry radio anytime on the
              official DCLM app, or watch live and archived services on the
              DCLM Webcast.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
