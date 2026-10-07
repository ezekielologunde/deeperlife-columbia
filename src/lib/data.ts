import { and, asc, desc, eq, lte } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { FEATURED_EVENTS } from "@/lib/featured-events";
import { eventStartMs, isEventOver } from "@/lib/event-dates";
import {
  churchSettings,
  services,
  leadership,
  statementOfFaith,
  events,
  ministries,
  testimonies,
  galleryImages,
  devotionals,
} from "@/lib/db/schema";

export async function getChurchData() {
  const [settingsRows, servicesRows, leadershipRows, faithRows, eventsRows] =
    await Promise.all([
      db.select().from(churchSettings).where(eq(churchSettings.id, 1)).limit(1),
      db.select().from(services).orderBy(asc(services.sort_order)),
      db.select().from(leadership).orderBy(asc(leadership.sort_order)),
      db.select().from(statementOfFaith).orderBy(asc(statementOfFaith.sort_order)),
      db.select().from(events).orderBy(asc(events.sort_order)),
    ]);

  const s = settingsRows[0];
  const allEvents = eventsRows;

  const dbUpcoming = allEvents
    .filter((e) => !e.is_past)
    .map((e) => ({
      id: e.id,
      title: e.title,
      subtitle: e.subtitle ?? "",
      date: e.event_date ?? "",
      time: e.event_time ?? "",
      verse: e.verse ?? "",
      host: e.host ?? "",
      description: e.description ?? "",
      venue: e.venue ?? "",
      flyer: e.flyer ?? "",
      video: e.video ?? "",
      link: e.link ?? "",
      startDatetime: e.start_datetime ?? "",
      endDatetime: e.end_datetime ?? "",
    }));

  // Featured (in-code) events lead the list unless the database already has
  // an event with the same title, in which case the database row wins.
  const knownTitles = new Set(allEvents.map((e) => e.title.trim().toLowerCase()));
  const now = Date.now();
  const upcomingEvents = [
    ...FEATURED_EVENTS.filter((f) => !knownTitles.has(f.title.trim().toLowerCase())),
    ...dbUpcoming,
  ]
    .filter((e) => !isEventOver(e, now))
    // Soonest first; events with no usable start time keep their order after
    // the dated ones. Array.sort is stable.
    .sort((a, b) => {
      const sa = eventStartMs(a);
      const sb = eventStartMs(b);
      if (sa === null && sb === null) return 0;
      if (sa === null) return 1;
      if (sb === null) return -1;
      return sa - sb;
    });

  const pastEvents = allEvents
    .filter((e) => e.is_past)
    .map((e) => ({
      title: e.title,
      date: e.event_date ?? "",
      venue: e.venue ?? "",
      verse: e.verse ?? "",
      description: e.description ?? "",
      phone: e.phone ?? "",
      email: e.email ?? "",
      link: e.link ?? "",
    }));

  return {
    name: s?.name ?? "Deeper Life Bible Church Columbia",
    tagline: s?.tagline ?? "",
    description: (s?.description as string[] | undefined) ?? [],
    history: s?.history ?? "",
    address: (s?.address as { line1: string; line2: string; line3: string } | undefined) ?? {
      line1: "",
      line2: "",
      line3: "",
    },
    phone: s?.phone ?? "",
    phoneDisplay: s?.phone_display ?? "",
    email: s?.email ?? "",
    pastor: s?.pastor ?? "",
    pastorPhoto: s?.pastor_photo ?? "",
    pastorAndWifePhoto: s?.pastor_and_wife_photo ?? "",
    leadership: leadershipRows.map((l) => ({
      name: l.name,
      title: l.title,
      photoUrl: l.photo_url ?? undefined,
    })),
    statementOfFaith: faithRows.map((f) => ({
      title: f.title,
      text: f.text,
    })),
    services: servicesRows.map((sv) => ({
      name: sv.name,
      time: sv.time,
      mode: sv.mode,
    })),
    zoom: (s?.zoom as { link: string; meetingId: string; passcode: string } | undefined) ?? {
      link: "",
      meetingId: "",
      passcode: "",
    },
    giving: (s?.giving as { zelleId: string } | undefined) ?? { zelleId: "" },
    upcomingEvents,
    pastEvents,
    social: (s?.social as { facebook: string; instagram: string; youtube: string } | undefined) ?? {
      facebook: "",
      instagram: "",
      youtube: "",
    },
    youtubeUploadsPlaylistId: s?.youtube_uploads_playlist_id ?? "",
    internationalSite: (s?.international_site as { label: string; url: string } | undefined) ?? {
      label: "",
      url: "",
    },
    regionalSite: (s?.regional_site as { label: string; url: string } | undefined) ?? {
      label: "",
      url: "",
    },
    app: (s?.app as { label: string; url: string } | undefined) ?? { label: "", url: "" },
    webcast: (s?.webcast as { label: string; url: string } | undefined) ?? {
      label: "",
      url: "",
    },
  };
}

export type ChurchData = Awaited<ReturnType<typeof getChurchData>>;

export async function getMinistriesData() {
  // A genuine DB/connection error throws (the postgres client rejects the
  // promise) rather than silently returning an empty list — callers like
  // getMinistryBySlug() treat "not found" as a real 404 (which Next.js
  // marks noindex), and a transient outage must never be mistaken for
  // "this ministry doesn't exist."
  const rows = await db.select().from(ministries).orderBy(asc(ministries.sort_order));

  return rows.map((m) => ({
    slug: m.slug,
    title: m.title,
    desc: m.description,
    details: m.details ?? undefined,
    image: m.image ?? undefined,
    meetingTime: m.meeting_time ?? undefined,
    ctaText: m.cta_text ?? undefined,
  }));
}

export async function getMinistryBySlug(slug: string) {
  const allMinistries = await getMinistriesData();
  return allMinistries.find((m) => m.slug === slug) ?? null;
}

export async function getTestimonies() {
  const rows = await db
    .select()
    .from(testimonies)
    .where(eq(testimonies.published, true))
    .orderBy(asc(testimonies.sort_order), desc(testimonies.created_at));

  return rows.map((t) => ({
    id: t.id,
    name: t.name,
    content: t.content,
  }));
}

export async function getGalleryImages() {
  const rows = await db.select().from(galleryImages).orderBy(asc(galleryImages.sort_order));

  return rows.map((g) => ({
    id: g.id,
    url: g.url,
    caption: g.caption ?? undefined,
  }));
}

export type DevotionalCategory = "Adult" | "Youth" | "Children";

function mapDevotional(d: typeof devotionals.$inferSelect) {
  return {
    date: d.date,
    category: d.category as DevotionalCategory,
    title: d.title,
    keyVerse: d.key_verse,
    bibleReading: d.bible_reading ?? undefined,
    body: d.body,
    thoughtOfDay: d.thought_of_day ?? undefined,
    bibleInOneYear: d.bible_in_one_year ?? undefined,
    audioUrl: d.audio_url ?? undefined,
    source: d.source,
  };
}

export type Devotional = ReturnType<typeof mapDevotional>;

export async function getTodayDevotional(category: DevotionalCategory = "Adult") {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });

  const [exact] = await db
    .select()
    .from(devotionals)
    .where(and(eq(devotionals.date, today), eq(devotionals.category, category)))
    .limit(1);

  if (exact) return { devotional: mapDevotional(exact), isToday: true };

  const [latest] = await db
    .select()
    .from(devotionals)
    .where(and(eq(devotionals.category, category), lte(devotionals.date, today)))
    .orderBy(desc(devotionals.date))
    .limit(1);

  return latest ? { devotional: mapDevotional(latest), isToday: false } : null;
}

export async function getDevotionalByDate(
  date: string,
  category: DevotionalCategory = "Adult",
) {
  const [row] = await db
    .select()
    .from(devotionals)
    .where(and(eq(devotionals.date, date), eq(devotionals.category, category)))
    .limit(1);

  return row ? mapDevotional(row) : null;
}

export async function getDevotionalArchive(
  category: DevotionalCategory = "Adult",
) {
  const rows = await db
    .select({
      date: devotionals.date,
      title: devotionals.title,
      key_verse: devotionals.key_verse,
    })
    .from(devotionals)
    .where(eq(devotionals.category, category))
    .orderBy(desc(devotionals.date));

  return rows.map((d) => ({
    date: d.date,
    title: d.title,
    keyVerse: d.key_verse,
  }));
}
