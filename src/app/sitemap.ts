import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://deeperlifecolumbia.org";

const ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/beliefs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/join-online", priority: 0.7, changeFrequency: "weekly" },
  { path: "/ministries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/sermons", priority: 0.7, changeFrequency: "daily" },
  { path: "/posts", priority: 0.7, changeFrequency: "weekly" },
  { path: "/give", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/what-to-expect", priority: 0.7, changeFrequency: "monthly" },
  { path: "/serve", priority: 0.6, changeFrequency: "monthly" },
  { path: "/salvation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/testimonies", priority: 0.6, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
  { path: "/devotional", priority: 0.8, changeFrequency: "daily" },
  { path: "/devotional/archive", priority: 0.5, changeFrequency: "daily" },
];

const NINETY_DAYS_AGO = () => {
  const d = new Date();
  d.setDate(d.getDate() - 90);
  return d.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const [{ data: posts }, { data: ministries }, { data: devotionals }] =
    await Promise.all([
      supabase.from("posts").select("slug, updated_at").eq("published", true),
      supabase.from("ministries").select("slug"),
      supabase
        .from("devotionals")
        .select("date")
        .gte("date", NINETY_DAYS_AGO()),
    ]);

  const staticRoutes = ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postRoutes = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const ministryRoutes = (ministries ?? []).map((m) => ({
    url: `${BASE_URL}/ministries/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const devotionalRoutes = (devotionals ?? []).map((d) => ({
    url: `${BASE_URL}/devotional/${d.date}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [
    ...staticRoutes,
    ...postRoutes,
    ...ministryRoutes,
    ...devotionalRoutes,
  ];
}
