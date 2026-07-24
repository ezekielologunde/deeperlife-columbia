import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const CARDS = [
  { href: "/admin/church-info", label: "Church Info", desc: "Name, address, contact, socials, giving, Zoom" },
  { href: "/admin/services", label: "Service Times", desc: "Weekly service schedule" },
  { href: "/admin/ministries", label: "Ministries", desc: "Ministry list with photos" },
  { href: "/admin/leadership", label: "Leadership", desc: "Pastors and leaders" },
  { href: "/admin/beliefs", label: "Statement of Faith", desc: "Doctrinal points" },
  { href: "/admin/events", label: "Events", desc: "Upcoming and past programs" },
  { href: "/admin/posts", label: "Posts", desc: "Blog / announcements" },
];

export default async function AdminHomePage() {
  const supabase = await createClient();
  const [services, ministries, leadership, faith, events, posts] =
    await Promise.all([
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("ministries").select("id", { count: "exact", head: true }),
      supabase.from("leadership").select("id", { count: "exact", head: true }),
      supabase
        .from("statement_of_faith")
        .select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("posts").select("id", { count: "exact", head: true }),
    ]);

  const counts: Record<string, number | null> = {
    "/admin/services": services.count,
    "/admin/ministries": ministries.count,
    "/admin/leadership": leadership.count,
    "/admin/beliefs": faith.count,
    "/admin/events": events.count,
    "/admin/posts": posts.count,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-950">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edit anything about the church website below. Changes go live
        immediately.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-indigo-950">{card.label}</h2>
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
