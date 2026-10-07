import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import {
  services,
  ministries,
  leadership,
  statementOfFaith,
  events,
  posts,
  galleryImages,
  devotionals,
  messages,
  testimonies,
  eventRsvps,
  subscribers,
} from "@/lib/db/schema";

const CONTENT_CARDS = [
  { href: "/admin/church-info", label: "Church Info", desc: "Name, address, contact, socials, giving, Zoom" },
  { href: "/admin/services", label: "Service Times", desc: "Weekly service schedule" },
  { href: "/admin/ministries", label: "Ministries", desc: "Ministry list with photos" },
  { href: "/admin/leadership", label: "Leadership", desc: "Pastors and leaders" },
  { href: "/admin/beliefs", label: "Statement of Faith", desc: "Doctrinal points" },
  { href: "/admin/events", label: "Events", desc: "Upcoming and past programs" },
  { href: "/admin/posts", label: "Posts", desc: "Blog / announcements" },
  { href: "/admin/gallery", label: "Gallery", desc: "Photos of church life" },
];

const ACTIVITY_CARDS = [
  { href: "/admin/devotional", label: "Daily Devotional", desc: "Auto-synced daily, editable as fallback" },
  { href: "/admin/messages", label: "Messages", desc: "Submissions from the Contact page" },
  { href: "/admin/testimonies", label: "Testimonies", desc: "Member stories, needs your approval to publish" },
  { href: "/admin/rsvps", label: "Event RSVPs", desc: "Who's coming to upcoming events" },
  { href: "/admin/subscribers", label: "Subscribers", desc: "Newsletter sign-ups" },
];

export default async function AdminHomePage() {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });

  const [
    servicesRows,
    ministriesRows,
    leadershipRows,
    faithRows,
    eventsRows,
    postsRows,
    galleryRows,
    devotionalsRows,
    todayDevotionalRows,
    messagesRows,
    unreadMessagesRows,
    testimoniesRows,
    pendingTestimoniesRows,
    rsvpsRows,
    subscribersRows,
  ] = await Promise.all([
    db.select({ id: services.id }).from(services),
    db.select({ id: ministries.id }).from(ministries),
    db.select({ id: leadership.id }).from(leadership),
    db.select({ id: statementOfFaith.id }).from(statementOfFaith),
    db.select({ id: events.id }).from(events),
    db.select({ id: posts.id }).from(posts),
    db.select({ id: galleryImages.id }).from(galleryImages),
    db.select({ id: devotionals.id }).from(devotionals),
    db.select({ id: devotionals.id }).from(devotionals).where(eq(devotionals.date, today)),
    db.select({ id: messages.id }).from(messages),
    db.select({ id: messages.id }).from(messages).where(eq(messages.is_read, false)),
    db.select({ id: testimonies.id }).from(testimonies),
    db.select({ id: testimonies.id }).from(testimonies).where(eq(testimonies.published, false)),
    db.select({ id: eventRsvps.id }).from(eventRsvps),
    db.select({ id: subscribers.id }).from(subscribers),
  ]);

  const missingTodayDevotional = todayDevotionalRows.length === 0 ? 1 : 0;

  const counts: Record<string, number | null> = {
    "/admin/services": servicesRows.length,
    "/admin/ministries": ministriesRows.length,
    "/admin/leadership": leadershipRows.length,
    "/admin/beliefs": faithRows.length,
    "/admin/events": eventsRows.length,
    "/admin/posts": postsRows.length,
    "/admin/gallery": galleryRows.length,
    "/admin/devotional": devotionalsRows.length,
    "/admin/messages": messagesRows.length,
    "/admin/testimonies": testimoniesRows.length,
    "/admin/rsvps": rsvpsRows.length,
    "/admin/subscribers": subscribersRows.length,
  };

  const needsAttention: Record<string, number | null> = {
    "/admin/messages": unreadMessagesRows.length,
    "/admin/testimonies": pendingTestimoniesRows.length,
    "/admin/devotional": missingTodayDevotional,
  };

  const totalNeedsAttention =
    unreadMessagesRows.length + pendingTestimoniesRows.length + missingTodayDevotional;

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-950">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edit anything about the church website below. Changes go live
        immediately — no need to wait or ask anyone to redeploy.
      </p>

      {totalNeedsAttention > 0 && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">
            {totalNeedsAttention} item{totalNeedsAttention === 1 ? "" : "s"}{" "}
            need{totalNeedsAttention === 1 ? "s" : ""} your attention
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            {unreadMessagesRows.length > 0 && (
              <Link href="/admin/messages" className="font-semibold text-amber-800 underline">
                {unreadMessagesRows.length} unread message{unreadMessagesRows.length === 1 ? "" : "s"}
              </Link>
            )}
            {pendingTestimoniesRows.length > 0 && (
              <Link href="/admin/testimonies" className="font-semibold text-amber-800 underline">
                {pendingTestimoniesRows.length} testimon{pendingTestimoniesRows.length === 1 ? "y" : "ies"} awaiting review
              </Link>
            )}
            {missingTodayDevotional > 0 && (
              <Link href="/admin/devotional" className="font-semibold text-amber-800 underline">
                Today&apos;s devotional hasn&apos;t synced yet — add it manually
              </Link>
            )}
          </div>
        </div>
      )}

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Website Content
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONTENT_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-indigo-950">{card.label}</h3>
              {counts[card.href] !== undefined && (
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  {counts[card.href]}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">{card.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Visitor Activity
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACTIVITY_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            {(needsAttention[card.href] ?? 0) > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-500 px-1.5 text-xs font-bold text-white">
                {needsAttention[card.href]}
              </span>
            )}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-indigo-950">{card.label}</h3>
              {counts[card.href] !== undefined && (
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  {counts[card.href]}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
