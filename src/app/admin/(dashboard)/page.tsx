import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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
  { href: "/admin/messages", label: "Messages", desc: "Submissions from the Contact page" },
  { href: "/admin/testimonies", label: "Testimonies", desc: "Member stories, needs your approval to publish" },
  { href: "/admin/rsvps", label: "Event RSVPs", desc: "Who's coming to upcoming events" },
  { href: "/admin/subscribers", label: "Subscribers", desc: "Newsletter sign-ups" },
];

export default async function AdminHomePage() {
  const supabase = await createClient();
  const [
    services,
    ministries,
    leadership,
    faith,
    events,
    posts,
    gallery,
    messages,
    unreadMessages,
    testimonies,
    pendingTestimonies,
    rsvps,
    subscribers,
  ] = await Promise.all([
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("ministries").select("id", { count: "exact", head: true }),
    supabase.from("leadership").select("id", { count: "exact", head: true }),
    supabase.from("statement_of_faith").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("gallery_images").select("id", { count: "exact", head: true }),
    supabase.from("messages").select("id", { count: "exact", head: true }),
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
    supabase.from("testimonies").select("id", { count: "exact", head: true }),
    supabase
      .from("testimonies")
      .select("id", { count: "exact", head: true })
      .eq("published", false),
    supabase.from("event_rsvps").select("id", { count: "exact", head: true }),
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
  ]);

  const counts: Record<string, number | null> = {
    "/admin/services": services.count,
    "/admin/ministries": ministries.count,
    "/admin/leadership": leadership.count,
    "/admin/beliefs": faith.count,
    "/admin/events": events.count,
    "/admin/posts": posts.count,
    "/admin/gallery": gallery.count,
    "/admin/messages": messages.count,
    "/admin/testimonies": testimonies.count,
    "/admin/rsvps": rsvps.count,
    "/admin/subscribers": subscribers.count,
  };

  const needsAttention: Record<string, number | null> = {
    "/admin/messages": unreadMessages.count,
    "/admin/testimonies": pendingTestimonies.count,
  };

  const totalNeedsAttention =
    (unreadMessages.count ?? 0) + (pendingTestimonies.count ?? 0);

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
            {(unreadMessages.count ?? 0) > 0 && (
              <Link href="/admin/messages" className="font-semibold text-amber-800 underline">
                {unreadMessages.count} unread message{unreadMessages.count === 1 ? "" : "s"}
              </Link>
            )}
            {(pendingTestimonies.count ?? 0) > 0 && (
              <Link href="/admin/testimonies" className="font-semibold text-amber-800 underline">
                {pendingTestimonies.count} testimon{pendingTestimonies.count === 1 ? "y" : "ies"} awaiting review
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
