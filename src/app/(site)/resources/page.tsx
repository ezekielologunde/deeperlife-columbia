import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free Christian resources from Deeper Christian Life Ministry: Bible studies, devotionals, books, tracts, sermons, webcast, and radio.",
};

type Resource = { title: string; desc: string; href: string; external?: boolean };

const GROUPS: { heading: string; items: Resource[] }[] = [
  {
    heading: "Daily Devotionals",
    items: [
      {
        title: "Daily Manna",
        desc: "Daily devotional study with a key verse, Bible reading, and thought for the day. Read it here on our site.",
        href: "/devotional",
      },
      {
        title: "Higher Everyday",
        desc: "A devotional written for young people.",
        href: "/devotional/youth",
      },
      {
        title: "Children's Devotional",
        desc: "Short daily lessons for children and families.",
        href: "/devotional/children",
      },
    ],
  },
  {
    heading: "Bible Study & Sermons",
    items: [
      {
        title: "Bible Study",
        desc: "Weekly Bible study messages from DCLM headquarters.",
        href: "https://dclm.org/sermons/bible-studies",
        external: true,
      },
      {
        title: "Sunday & Revival Services",
        desc: "Recorded Sunday worship and Revival Hour services.",
        href: "https://dclm.org/sermons/sunday-services/",
        external: true,
      },
      {
        title: "GCK Crusades",
        desc: "Messages from the Global Crusade with Kumuyi.",
        href: "https://dclm.org/sermons/crusades/",
        external: true,
      },
      {
        title: "Workers' Training & Leadership",
        desc: "Teaching for church workers and leaders.",
        href: "https://dclm.org/sermons/workers-meetings/",
        external: true,
      },
    ],
  },
  {
    heading: "Books, Tracts & Study",
    items: [
      {
        title: "Books & Publications",
        desc: "Christian books and magazines from DCLM Life Press.",
        href: "https://dclm.org/books/",
        external: true,
      },
      {
        title: "Gospel Tracts",
        desc: "Share the gospel with printable tracts.",
        href: "https://dclm.org/tracts/",
        external: true,
      },
      {
        title: "Life Press",
        desc: "The publishing ministry of Deeper Christian Life Ministry.",
        href: "https://dclm.org/about/ministries/life-press/",
        external: true,
      },
      {
        title: "Deeper Life Bible School",
        desc: "Structured Bible training for believers and workers.",
        href: "https://dclm.org/about/bible-school/",
        external: true,
      },
    ],
  },
  {
    heading: "Watch & Listen",
    items: [
      {
        title: "DCLM Webcast",
        desc: "Live services and global programs.",
        href: "https://webcast.dclm.org/",
        external: true,
      },
      {
        title: "DCLM Radio",
        desc: "Listen to Deeper Life radio online.",
        href: "https://radio.dclm.org/",
        external: true,
      },
      {
        title: "Our Webcast Page",
        desc: "Watch recent services and programs on our own site.",
        href: "/webcast",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        title="Resources"
        subtitle="Free tools to help you grow in the Word, from Deeper Christian Life Ministry."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-16 px-6 py-20">
          {GROUPS.map((group) => (
            <div key={group.heading}>
              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight text-indigo-950">
                  {group.heading}
                </h2>
              </Reveal>
              <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((r) => {
                  const card = (
                    <div className="h-full rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <h3 className="font-bold text-indigo-950">{r.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {r.desc}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-indigo-700">
                        {r.external ? "Open ↗" : "Open →"}
                      </p>
                    </div>
                  );
                  return (
                    <StaggerItem key={r.title}>
                      {r.external ? (
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full"
                        >
                          {card}
                        </a>
                      ) : (
                        <Link href={r.href} className="block h-full">
                          {card}
                        </Link>
                      )}
                    </StaggerItem>
                  );
                })}
              </StaggerGrid>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-indigo-950">
            Need prayer or have a question?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/prayer"
              className="rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800"
            >
              Send a Prayer Request
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-indigo-900 px-6 py-3 text-sm font-semibold text-indigo-900 transition-all hover:bg-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
